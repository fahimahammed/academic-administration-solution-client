import Link from 'next/link';
import React, { CSSProperties, ReactNode } from 'react';
import { purple } from '@ant-design/colors';

function PHULinkButton({
	link,
	customStyle,
	children,
}: {
	link: string;
	customStyle?: CSSProperties;
	children: string | ReactNode;
}) {
	return (
		<>
			<Link
				href={link}
				style={{
					background: purple.primary,
					color: '#fff',
					borderRadius: '5px',
					textDecoration: 'none',
					...customStyle,
				}}
			>
				{children}
			</Link>
		</>
	);
}

export default PHULinkButton;
