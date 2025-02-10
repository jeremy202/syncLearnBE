import { PrismaClient } from '@prisma/client';
import { generalLogger } from '../lib/logger';
import config from '../config';

const prisma = new PrismaClient(config.env.isTest ? { datasourceUrl: process.env.TEST_DATABASE_URL } : undefined);

export async function connectDB() {
  await prisma.$connect();
  generalLogger.info('🔥 connected to db');
}

export async function disconnectDB() {
  await prisma.$disconnect();
  generalLogger.info('🧊 disconnected from db');
}

export default prisma;
