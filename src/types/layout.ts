import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<P = '' | undefined, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode | ReactElement;
};

export type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};
