import { Spin } from 'antd';
import React from 'react';

export default function Spinner() {
	return (
		<div style={{ display: 'flex', height: '90vh' }}>
			<div style={{ margin: 'auto' }}>
				<Spin size="large" />
			</div>
		</div>
	);
}
