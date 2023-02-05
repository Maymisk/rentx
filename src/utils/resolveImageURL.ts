export function resolveImageURL(image: string, folder: string) {
	switch (process.env.disk) {
		case 'local':
			return `http://localhost:3333/${folder}/${image}`;
		case 'S3':
			return `${process.env.AWS_URL}/${folder}/${image}`;
		default:
			return null;
	}
}
