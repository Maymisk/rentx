import { SES } from 'aws-sdk';
import nodemailer from 'nodemailer';
import fs from 'fs';
import Handlebars from 'handlebars';

import { IMailProvider } from '../IMailProvider';

class SESMailProvider implements IMailProvider {
	private client: nodemailer.Transporter;

	constructor() {
		this.client = nodemailer.createTransport({
			SES: new SES({
				apiVersion: '2010-12-01',
				region: process.env.AWS_REGION,
			}),
		});
	}

	async sendMail(
		to: string,
		subject: string,
		variables: any,
		path: string
	): Promise<void> {
		const templateFileContent = fs.readFileSync(path).toString('utf-8');

		const templateParse = Handlebars.compile(templateFileContent);

		const templateHTML = templateParse(variables);

		const message = await this.client.sendMail({
			to,
			from: 'Rentx <some@email.com>',
			subject,
			html: templateHTML,
		});

		return message;
	}
}

export { SESMailProvider };
