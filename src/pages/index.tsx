import { Helmet } from '@/components';
import PHULinkButton from '@/ui/LinkButton';

export default function Home() {
	return (
		<main>
			<Helmet>home</Helmet>
			<div style={{ textAlign: 'center' }}>
				<h1 style={{ margin: '50px 0px' }}>PH university</h1>
				<PHULinkButton link="/login">go to login page</PHULinkButton>
			</div>
		</main>
	);
}
