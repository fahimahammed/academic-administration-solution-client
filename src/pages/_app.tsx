import Providers from '@/components/Provider';
import { Source_Serif_Pro } from 'next/font/google';
import '@/styles/globals.css';
import { AppPropsWithLayout } from '@/types';
import { ToastNotification } from '@/ui';
import { ConfigProvider } from 'antd';

const sourceSerifPro = Source_Serif_Pro({
	weight: '400',
	subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? (page => page);
	return (
		<main className={sourceSerifPro.className}>
			<ConfigProvider
				theme={{
					token: {
						colorPrimary: "#7134eb",
					},
				}}
			>
				<Providers>
					{getLayout(<Component {...pageProps} />)}
					<ToastNotification position="top-center" reverseOrder={false} />
				</Providers>
			</ConfigProvider>
		</main>
	);
}
