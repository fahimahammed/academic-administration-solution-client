import Head from 'next/head';

export default function Helmet({ children }: { children: React.ReactNode | null }) {
	return (
		<>
			<Head>
				<title>PH University {children ? `- ${children}` : null}</title>
			</Head>
		</>
	);
}
