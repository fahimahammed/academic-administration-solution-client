import React from 'react';

type BaseRowProps = {
	title: string;
	children: React.ReactNode;
};
export default function BaseRow({ title, children }: BaseRowProps) {
	return (
		<>
			<tr>
				<td
					style={{
						fontWeight: 700,
						marginRight: '10px',
						textTransform: 'capitalize',
						textAlign: 'left',
					}}
				>
					{title}
				</td>
				<td style={{ textAlign: 'left', padding: '5px 15px' }}>
					<span style={{ marginLeft: '10px', textAlign: 'right' }}>{children}</span>
				</td>
			</tr>
		</>
	);
}
