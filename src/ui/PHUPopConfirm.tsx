import { Popconfirm } from 'antd';
import type { TooltipPlacement } from 'antd/es/tooltip';
import React, { ReactNode } from 'react';

type PHUPopConfirmProps = {
	title: string;
	description?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	onText: string;
	cancelText: string;
	children?: ReactNode;
	placement: TooltipPlacement;
};
export default function PHUPopConfirm({
	title,
	description,
	onCancel,
	onConfirm,
	onText,
	cancelText,
	children,
	placement,
}: PHUPopConfirmProps) {
	return (
		<>
			<Popconfirm
				placement={placement}
				title={title}
				description={description}
				onConfirm={onConfirm}
				onCancel={onCancel}
				okText={onText}
				cancelText={cancelText}
			>
				{children}
			</Popconfirm>
		</>
	);
}
