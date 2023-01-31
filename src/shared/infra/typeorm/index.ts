import { DataSource } from 'typeorm';

const dataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	database: process.env.NODE_ENV === 'test' ? 'rentx_test' : 'rentx',
	username: 'docker',
	password: 'ignite',
	migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
	entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
});

dataSource.initialize();

export default dataSource;
