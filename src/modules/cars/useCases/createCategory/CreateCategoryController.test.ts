import { hash } from 'bcryptjs';
import request from 'supertest';
import { v4 as uuidV4 } from 'uuid';

import { app } from '../../../../shared/infra/http/app';
import dataSource from '@prismaClient/index';

describe('Create category controller', () => {
	beforeAll(async () => {
		const id = uuidV4();
		const password = await hash('admin', 8);

		await dataSource.$executeRaw`INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license) values(${id}, 'admin', 'admin@admin.com', ${password}, true, 'now()', 'XXXXXX' )`;
	});

	afterAll(async () => {
		await dataSource.$executeRaw`DELETE FROM users`;
		await dataSource.$executeRaw`DELETE FROM categories`;
		await dataSource.$executeRaw`DELETE FROM users_tokens`;
		await dataSource.$disconnect();
	});

	it('should be able to create a new category', async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@admin.com',
			password: 'admin',
		});

		const { token } = responseToken.body;

		const response = await request(app)
			.post('/categories')
			.send({
				name: 'Category supertest',
				description: 'Category description supertest',
			})
			.set({
				authorization: `Bearer ${token}`,
			});

		const object = response.body;

		expect(response.status).toBe(201);
		expect(object).toMatchObject({
			id: object.id,
			name: object.name,
			description: object.description,
			created_at: object.created_at,
		});
	});

	it("Shouldn't be able to create a new category with an already existing name", async () => {
		const responseToken = await request(app).post('/session').send({
			email: 'admin@admin.com',
			password: 'admin',
		});

		const { token } = responseToken.body;

		const response = await request(app)
			.post('/categories')
			.send({
				name: 'Category supertest',
				description: 'another category description supertest',
			})
			.set({
				authorization: `Bearer ${token}`,
			});

		expect(response.status).toBe(400);
	});
});
