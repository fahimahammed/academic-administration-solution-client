import Head from 'next/head';

export default function Helmet({ children }: { children: React.ReactNode | null }) {
	return (
		<>
			<Head>
				<title>Academic Administration Solution {children ? `- ${children}` : null}</title>
			</Head>
		</>
	);
}
