import React from 'react';
import { Collapse } from 'antd';
import { ItemProps } from '@/types';
const { Panel } = Collapse;

type PHUCollapseProps = {
	items: ItemProps[];
	onChange?: (el: string | string[]) => void;
	defaultActiveKey?: string[];
};
export default function PHUCollapse({ items, onChange, defaultActiveKey = ['1'] }: PHUCollapseProps) {
	return (
		<>
			<Collapse defaultActiveKey={defaultActiveKey} onChange={onChange}>
				{items.map((item: ItemProps) => {
					return (
						<Panel header={item.label} key={item.key}>
							{item.children}
						</Panel>
					);
				})}
			</Collapse>
		</>
	);
}
