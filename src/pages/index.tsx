import { Helmet } from '@/components';
import LinkButton from '@/ui/LinkButton';

export default function Home() {
	return (
		<main>
			<Helmet>home</Helmet>
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ margin: '50px 0px' }}>Academic Administration Solution</h1>
				<LinkButton link="/login">Click Here to Login</LinkButton>
			</div>
		</main>
	);
}
