interface ICreateUserDTO {
	name: string;

	email: string;

	password: string;

	driver_license: string;

	id?: string;
}

export { ICreateUserDTO };
