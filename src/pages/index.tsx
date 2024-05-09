import { GetServerSideProps } from 'next';

const Home: React.FC = () => {
	// This component will not be rendered on the server side
	return null;
};

export const getServerSideProps: GetServerSideProps = async () => {
	return {
		redirect: {
			destination: '/login',
			permanent: false,
		},
	};
};

export default Home;
