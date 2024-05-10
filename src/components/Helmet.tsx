import Head from 'next/head';

export default function Helmet({ children }: { children: React.ReactNode | null }) {
	return (
		<>
			<Head>
				<title>{children ? `${children} - ` : null} Academic Administration Solution</title>
			</Head>
		</>
	);
}
