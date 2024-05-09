import { Drawer } from 'antd';
import React, { ReactNode } from 'react';

type PHUDrawerProps = {
	title: string;
	width?: number;
	onClose?: () => void;
	open: boolean;
	extra?: ReactNode;
	children: ReactNode;
};

function PHUDrawer({ title, width = 600, onClose, open, extra, children }: PHUDrawerProps) {
	return (
		<Drawer title={title} width={width} onClose={onClose} open={open} bodyStyle={{ paddingBottom: 80 }} extra={extra}>
			{children}
		</Drawer>
	);
}

export default PHUDrawer;
