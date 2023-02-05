import { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';
import { IMailProvider } from '../IMailProvider';
import nodemailer from 'nodemailer';

import Handlebars from 'handlebars';
import fs from 'fs';

@injectable()
class EtherealMailProvider implements IMailProvider {
	private client: Transporter;

	constructor() {
		nodemailer
			.createTestAccount()
			.then(account => {
				const transporter = nodemailer.createTransport({
					host: account.smtp.host,
					port: account.smtp.port,
					secure: account.smtp.secure,
					auth: {
						user: account.user,
						pass: account.pass,
					},
				});
				this.client = transporter;
			})
			.catch(err => console.error(err));
	}

	async sendMail(
		to: string,
		subject: string,
		variables: any,
		path: string
	): Promise<void> {
		const templateFileData = fs.readFileSync(path).toString('utf-8');
		const templateParse = Handlebars.compile(templateFileData);
		const templateHTML = templateParse(variables);

		const message = await this.client.sendMail({
			to,
			from: '<noreply@rentx.com>',
			html: templateHTML,
			subject,
		});

		console.log('message sent: %s', message.messageId);
		console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
	}
}

export { EtherealMailProvider };
