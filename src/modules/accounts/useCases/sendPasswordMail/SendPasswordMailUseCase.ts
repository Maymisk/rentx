import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { IUsersRepository } from '../../repositories/IUsersRespository';
import { IUserTokensRepository } from '../../repositories/IUserTokensRepository';
import { IMailProvider } from '../../../../shared/container/provider/MailProvider/IMailProvider';
import { IDateProvider } from '../../../../shared/container/provider/DateProvider/IDateProvider';

import { v4 as uuidV4 } from 'uuid';
import { resolve } from 'path';

@injectable()
class SendPasswordMailUseCase {
    constructor(
        @inject('PrismaUsersRepository')
        private usersRepository: IUsersRepository,
        @inject('PrismaUserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
        @inject('DayJsDateProvider')
        private dateProvider: IDateProvider,
        @inject('EtherealMailProvider')
        private mailProvider: IMailProvider
    ) {}

    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("This user doesn't exist!");
        }

        const token = uuidV4();

        const expiration_date = this.dateProvider.addHours(3);

        await this.userTokensRepository.create({
            user_id: user.id,
            refresh_token: token,
            expiration_date
        });

        const templatePath = resolve(
            __dirname,
            '..',
            '..',
            'views',
            'emails',
            'emailTextTemplate.hbs'
        );

        const variables = {
            name: user.name,
            link: `${process.env.FORGOT_PASSWORD_URL}${token}`
        };

        await this.mailProvider.sendMail(
            email,
            'Password redefinition',
            variables,
            templatePath
        );
    }
}

export { SendPasswordMailUseCase };
