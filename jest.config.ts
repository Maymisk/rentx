export default {
	bail: true,
	clearMocks: true,
	// collectCoverage: true,
	// collectCoverageFrom: ['<rootDir>/src/modules/**/useCases/**/*.ts'],
	// coverageDirectory: '<rootDir>/coverage',
	// coverageProvider: 'v8',
	// coverageReporters: ['text-summary', 'lcov'],
	moduleNameMapper: {
		'^@dataSource/(.*)$': '<rootDir>/src/shared/infra/typeorm/$1',
		'^@prismaClient/(.*)$': '<rootDir>/src/shared/infra/prisma/$1',
	},
	preset: 'ts-jest',
	testMatch: ['**/*.+(spec|test).ts'],
};
