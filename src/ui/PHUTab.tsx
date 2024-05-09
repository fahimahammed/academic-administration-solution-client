import { Tabs } from 'antd';
import React from 'react';
import type { TabsProps } from 'antd';
type PHUTabProps = {
	defaultActiveKey?: string;
	items: TabsProps['items'];
	onChange?: (el: string) => void;
};

export default function PHUTab({ defaultActiveKey = '1', items, onChange }: PHUTabProps) {
	return (
		<>
			<Tabs defaultActiveKey={defaultActiveKey} items={items} onChange={onChange} />
		</>
	);
}
