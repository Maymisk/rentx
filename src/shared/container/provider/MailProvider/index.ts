import { container } from 'tsyringe'
import { EtherealMailProvider } from './implementations/EtherealMailProvider'
import { SESMailProvider } from './implementations/SESMailProvider'

const mailProvider = {
    ethereal: container.resolve(EtherealMailProvider),
    ses: container.resolve(SESMailProvider)
}

container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER])

// In a different file because if it's loaded, it'll affect the jest tests