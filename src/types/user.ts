import { IAdmin } from './admin';
import { IBaseUser } from './common';
import { LocalGuardian } from './student';
import { Guardian } from './student';

export interface IUserProfile extends IBaseUser {
	id: string;
	guardian?: Guardian;
	localGuardian?: LocalGuardian;
	subject?: string;
}

export interface IUser {
	userId: string;
	role: string;
	needsPasswordChange: boolean;
	admin: IAdmin;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
