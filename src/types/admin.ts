import { RcFile } from 'antd/es/upload';
import { IBaseUser, Name } from './common';

export interface IAdmin extends IBaseUser {
	id: string;
	name: Name & { id: string };
	designation: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface IAdminRequestPayload {
	password: string;
	admin: AdminPayload;
}
export interface AdminPayload extends IBaseUser {
	designation: string;
	file?: RcFile;
}
