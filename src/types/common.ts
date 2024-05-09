import { RcFile } from 'antd/es/upload';
import { ReactElement, ReactNode } from 'react';

export interface Name {
	firstName: string;
	lastName: string;
	middleName: string;
}

export interface IBaseUser {
	name: Name;
	dateOfBirth: string;
	gender: string;
	bloodGroup: string;
	email: string;
	contactNo: string;
	emergencyContactNo: string;
	presentAddress: string;
	permanentAddress: string;
	department: string;
}

export type ResponseSccessType = {
	meta?: IMeta;
	data: any;
};

export type ResponseErrorType = {
	statusCode: number;
	message: string;
	errorMessages: IErrorMessage[];
};

export interface IMeta {
	limit: number;
	page: number;
	total: number;
}

export interface IErrorMessage {
	path: string;
	message: string;
}

export type QueryParamsType = string | string[] | undefined | number | boolean | object;

export type SelectOption = {
	value: string;
	label: string;
	disabled?: boolean;
};

export type CreateEntityPayload = {
	file: RcFile;
	data: string;
};

export type CreateEntityWithFormData = { file: RcFile | string | Blob | undefined; data: string };

export interface IError {
	data: string;
	status: string | undefined;
}

export type ItemProps = {
	key: string;
	label: string;
	isTaken?: boolean;
	children: ReactNode | ReactElement;
};
