import { omit } from 'lodash';
import UserRepo from '../../database/repositories/UserRepo';
import { LoginDto, ProfileUpdateDto, RegisterDto, VerifyEmailDto } from './auth.dto';
import { bcryptCompare, bcryptHash, generateJWTToken, generateRandomCode } from '../../lib/utils';
import { ErrorMessages, NotFoundError, ServiceError } from '../../lib/errors';
import { createSession } from '../../lib/utils/auth';
import { TokenFlag } from '../../database/enum';
import redis from '../../database/redis';
import config from '../../config';
import { UserIdDto } from '../../lib/validators/global';

export default class AuthService {
  static async login(dto: LoginDto) {
    const user = await UserRepo.getUserByEmail(dto.email);

    if (!user) {
      throw new ServiceError(ErrorMessages.LOGIN_CREDENTIALS_INVALID);
    }

    const passwordsMatch = await bcryptCompare(dto.password, user.password);

    if (!passwordsMatch) {
      throw new ServiceError(ErrorMessages.LOGIN_CREDENTIALS_INVALID);
    }

    const { token, expires } = await createSession(user);

    return {
      user: omit(user, UserRepo.sensitiveData),
      token,
      tokenExpiresOn: new Date(expires).toISOString(),
    };
  }

  static async register(dto: RegisterDto) {
    const existingUserWithEmail = await UserRepo.getUserByEmail(dto.email);
    if (existingUserWithEmail) {
      throw new ServiceError(ErrorMessages.ITEM_EXISTS.replace('%k', 'a user with this email'));
    }

    const user = await UserRepo.createUser({
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await bcryptHash(dto.password),
    });

    const token = await generateJWTToken({ userId: user.id, flag: TokenFlag.EMAIL_VERIFICATION });

    const code = config.env.isProduction ? generateRandomCode(64) : '12345';

    const hash = await bcryptHash(code);

    await redis.setex(`verification:email:${user.id}`, 30 * 60, hash);

    // TODO: send verification mail

    return {
      user: omit(user, UserRepo.sensitiveData),
      token,
    };
  }

  static async verifyEmail(dto: VerifyEmailDto) {
    const user = await UserRepo.getUserByEmail(dto.email);
    if (!user) {
      throw new ServiceError(ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'user'));
    }

    const verificationKey = `verification:email:${user.id}`;
    const existingToken = await redis.get(verificationKey);

    if (!existingToken) {
      throw new ServiceError(ErrorMessages.EMAIL_VERIFICATION_LINK_EXPIRED);
    }

    await Promise.all([
      UserRepo.updateUserById(user.id, {
        emailVerifiedAt: new Date(),
      }),
      redis.del(verificationKey),
    ]);

    const { token, expires } = await createSession(user);

    return {
      user: omit(user, UserRepo.sensitiveData),
      token,
      tokenExpiresOn: new Date(expires).toISOString(),
    };
  }

  static async updateProfile(dto: ProfileUpdateDto) {
    let user = await UserRepo.getUserById(dto.userId);

    if (!user) {
      throw new NotFoundError(ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'user'));
    }

    user = await UserRepo.updateUserById(dto.userId, {
      firstName: dto.firstName,
      lastName: dto.lastName,
    });

    return omit(user, UserRepo.sensitiveData);
  }

  static async getUser(dto: UserIdDto) {
    const user = await UserRepo.getUserById(dto.userId);

    if (!user) throw new NotFoundError(ErrorMessages.ITEM_NOT_FOUND.replace('%k', 'user'));

    return { user: omit(user, UserRepo.sensitiveData) };
  }
}
