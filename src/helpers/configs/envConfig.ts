export const getEnvironmentName = (): string => {
	return process.env.NEXT_PUBLIC_APP_ENVIRONMENT_TYPE || 'development';
};

export const getBaseUrl = (): string => {
	return process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';
};
