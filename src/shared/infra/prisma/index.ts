import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient({
	datasources: {
		db: {
			url:
				process.env.NODE_ENV === 'test'
					? process.env.TEST_DATABASE_URL
					: process.env.DATABASE_URL,
		},
	},
});

export default prismaClient;
