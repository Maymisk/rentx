import { container } from 'tsyringe';
import { IDateProvider } from './DateProvider/IDateProvider';
import { DayJsDateProvider } from './DateProvider/implementations/DayJsDateProvider';
import { IMailProvider } from './MailProvider/IMailProvider';
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider';
import { SESMailProvider } from './MailProvider/implementations/SESMailProvider';
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider';
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider';

const disk = {
	local: LocalStorageProvider,
	S3: S3StorageProvider,
};

const mailProvider = {
	ethereal: container.resolve(EtherealMailProvider),
	ses: container.resolve(SESMailProvider),
};

container.registerInstance<IMailProvider>(
	'MailProvider',
	mailProvider[process.env.MAIL_PROVIDER]
);
container.registerSingleton<IDateProvider>(
	'DayJsDateProvider',
	DayJsDateProvider
);
container.registerSingleton<IStorageProvider>(
	'StorageProvider',
	disk[process.env.disk]
);
