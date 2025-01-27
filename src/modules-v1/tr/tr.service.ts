import { CreateTrDto } from './tr.dto';
import { ValidateDto } from '../../lib/core/httpSetup';

export default class TrService {
  @ValidateDto(CreateTrDto)
  static async createTr(dto: CreateTrDto) {
    return {name: 'hello world'}
  }
}
