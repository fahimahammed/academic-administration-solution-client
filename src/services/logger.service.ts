/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEnvironmentName } from '../helpers/configs/envConfig';

const environmentName = getEnvironmentName();

export interface LogFn {
	(message?: any, ...optionalParams: any[]): void;
}

/** Basic logger interface */
export interface Logger {
	log: LogFn;
	warn: LogFn;
	error: LogFn;
	table: LogFn;
}

/** Log levels */
export type LogLevel = 'log' | 'warn' | 'error';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NO_OP: LogFn = (message?: any, ...optionalParams: any[]) => { };

/** Logger which outputs to the browser console */
export class ConsoleLogger implements Logger {
	readonly log: LogFn;
	readonly warn: LogFn;
	readonly error: LogFn;
	readonly table: LogFn;

	constructor(options?: { environment?: string }) {
		const { environment } = options || {};

		if (environment === 'development') {
			this.warn = NO_OP;
			this.log = NO_OP;
			this.error = NO_OP;
			this.table = NO_OP;
			return;
		}

		this.error = console.error.bind(console);
		this.warn = console.warn.bind(console);
		// eslint-disable-next-line no-console
		this.table = console.table.bind(console);
		// eslint-disable-next-line no-console
		this.log = console.log.bind(console);
	}
}

export const logger = new ConsoleLogger({ environment: environmentName });
