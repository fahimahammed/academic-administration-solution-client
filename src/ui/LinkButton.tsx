import Link from 'next/link';
import React, { CSSProperties, ReactNode } from 'react';
import { purple } from '@ant-design/colors';

function LinkButton({
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
					padding: '1rem',
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

export default LinkButton;
