/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { ReactNode, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import type { MenuProps } from 'antd';
import UserProfileNav from '../UserProfileNav';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logoSecondary from '../../assets/images/logo-secondary 2.png'

const { Header, Sider, Content } = Layout;

type BaseLayoutProps = {
	children: ReactNode;
	sidebarData: MenuProps['items'];
};

const BaseLayout = ({ sidebarData, children }: BaseLayoutProps) => {
	const router = useRouter();
	const [current, setCurrent] = useState(router.pathname);
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const onClick: MenuProps['onClick'] = e => {
		setCurrent(e.key);
	};

	return (
		<Layout>
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				width={250}
				style={{
					overflow: 'auto',
					height: '100vh',
					position: 'fixed',
					left: 0,
					top: 0,
					bottom: 0,
				}}
				theme="dark"
			>
				<div
					style={{
						color: '#fff',
						display: 'flex',
						justifyContent: 'center',
						margin: '20px auto',
						fontWeight: 'bold',
						fontSize: '1.5rem',
					}}
				>
					{/* AAS logo */}
					<Image
						src={logoSecondary}
						alt="Logo"
						height={34}
						width={80}
					/>
				</div>

				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={[current]}
					style={{
						padding: '0px 10px',
					}}
					items={sidebarData}
					onClick={onClick}
					selectedKeys={[current]}
				/>
			</Sider>
			<Layout className="site-layout" style={{ marginLeft: !collapsed ? 250 : 80 }}>
				<Header
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 1,
						padding: 0,
						display: 'flex',
						alignItems: 'center',
						background: colorBgContainer,
					}}
				>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64,
						}}
					/>

					<UserProfileNav />
				</Header>
				<Content
					style={{
						padding: 24,
						minHeight: 280,
						background: '#fafafa',
						overflow: 'initial',
					}}
				>
					{children}
				</Content>
			</Layout>
		</Layout>
	);
};

export default BaseLayout;
