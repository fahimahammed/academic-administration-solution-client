import jwtDecode from 'jwt-decode';

export const decodeToken = (token: string) => {
	const decodedData = jwtDecode(token);
	return decodedData;
};
