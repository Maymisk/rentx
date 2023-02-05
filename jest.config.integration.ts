export default {
	bail: true,
	clearMocks: true,
	moduleNameMapper: {
		'^@dataSource/(.*)$': '<rootDir>/src/shared/infra/typeorm/$1',
		'^@prismaClient/(.*)$': '<rootDir>/src/shared/infra/prisma/$1',
	},
	preset: 'ts-jest',
	testMatch: ['**/*.test.ts'],
};
