import { Connection } from 'typeorm';
import dataSource from '../../../../shared/infra/typeorm';

import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcryptjs';

import request from 'supertest';
import { app } from '../../../../shared/infra/http/app';

describe('List Categories Controller', () => {
    beforeAll(async () => {
        await dataSource.initialize();
        await dataSource.runMigrations();

        const id = uuidV4();
        const password = await hash('admin', 8);

        await dataSource.query(
            `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license) values('${id}', 'admin', 'admin@admin.com.br', '${password}', true, 'now()', 'XXXXXX' )`
        );
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
    });

    it('Should be able to list all categories', async () => {
        const responseToken = await request(app).post('/session').send({
            email: 'admin@admin.com.br',
            password: 'admin'
        });

        const { token } = responseToken.body;

        const fodase = await request(app)
            .post('/categories')
            .send({
                name: 'categories supertest',
                description: 'categories supertest description'
            })
            .set({
                Authorization: `Bearer ${token}`
            });

        const response = await request(app)
            .get('/categories')
            .set({ Authorization: `Bearer ${token}` });

        const object = response.body[0];

        expect(response.status).toBe(200);
        expect(object).toMatchObject({
            id: object.id,
            name: object.name,
            description: object.description,
            created_at: object.created_at
        });
    });
});
