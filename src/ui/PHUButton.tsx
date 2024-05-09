import { Button } from 'antd';
import React, { CSSProperties, ReactNode } from 'react';

type PHUButtonProps = {
	htmlType?: 'submit' | 'button';
	children: string | ReactNode;
	onClick?: () => void;
	style?: CSSProperties;
	size?: 'large' | 'small';
	isDisabled?: boolean;
};

function PHUButton({ htmlType = 'button', children, onClick, style, size, isDisabled = false }: PHUButtonProps) {
	return (
		<>
			<Button size={size} type="primary" htmlType={htmlType} onClick={onClick} style={style} disabled={isDisabled}>
				{children}
			</Button>
		</>
	);
}

export default PHUButton;
