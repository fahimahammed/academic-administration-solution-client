import { Breadcrumb } from 'antd';
import React from 'react';
import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';

const BreadcrumbComp = ({
	items,
}: {
	items: {
		link: string;
		label: string;
	}[];
}) => {
	const breadcrumbItems = [
		{
			title: (
				<Link href="/">
					<HomeOutlined />
				</Link>
			),
		},
		...items.map(item => {
			return {
				title: item.link ? <Link href={item.link}>{item.label}</Link> : <span>{item.label}</span>,
			};
		}),
	];

	return (
		<div>
			<Breadcrumb items={breadcrumbItems} />
		</div>
	);
};

export default BreadcrumbComp;
