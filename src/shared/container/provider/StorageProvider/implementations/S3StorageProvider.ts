import upload from '../../../../../config/upload';
import { S3 } from 'aws-sdk';
import mime from 'mime';

import { resolve } from 'path';
import fs from 'fs';

class S3StorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION
        });
    }

    async save(file: string, folder: string): Promise<string> {
        const fileDir = resolve(upload.tmpFolder, file);
        const fileContent = await fs.promises.readFile(fileDir);

        const ContentType = mime.getType(fileDir);

        await this.client
            .putObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType
            })
            .promise();

        return file;
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: `${process.env.AWS_BUCKET}/${folder}`,
                Key: file
            })
            .promise();
    }
}

export { S3StorageProvider };
