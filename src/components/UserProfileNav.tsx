/* eslint-disable @next/next/no-img-element */
import { useUserProfileQuery } from '@/redux/apis/userProfileApi';
import { Avatar, Dropdown, Spin } from 'antd';
import React from 'react';
import type { MenuProps } from 'antd';
import { removeFromLocalStorage } from '@/utils/local-storage';
import { COMMON_ROUTES, authKey } from '@/constants';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { defaultState } from '@/redux/slices/authSlice';

function UserProfileNav() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { data, isLoading } = useUserProfileQuery({});
	const signout = () => {
		removeFromLocalStorage(authKey);
		router.push(COMMON_ROUTES.LOGIN);
		dispatch(defaultState());
	};
	if (isLoading)
		return (
			<div style={{ marginLeft: 'auto', marginRight: '20px' }}>
				<div className="example">
					<Spin />
				</div>
			</div>
		);

	const items: MenuProps['items'] = [
		{
			key: '1',
			label: (
				<div onClick={signout} style={{ marginLeft: 'auto' }}>
					logout
				</div>
			),
		},
	];

	const image =
		!data?.profileImage.startsWith('https') || !data?.profileImage.startsWith('http') ? (
			<img src="/default-avatar.png" width="150" height="150" alt={''} />
		) : (
			<img src={`${data?.profileImage}`} width="150" height="150" alt={''} />
		);

	return (
		<div style={{ marginLeft: 'auto', marginRight: '20px' }}>
			<Dropdown menu={{ items }} placement="bottom">
				<span onClick={e => e.preventDefault()}>
					<span style={{ height: 30, display: 'flex' }}>
						<Avatar src={image} alt="avatar" />
						<div style={{ display: 'block', marginTop: '2px' }}>
							<p style={{ padding: 0, lineHeight: 1, marginLeft: '5px' }}>
								<span>
									{data?.firstName} {data?.lastName}
									{!data && 'super admin'}
								</span>
								<br></br>
								<small style={{ marginBottom: '-10px' }}>{data ? data?.userId : '-'}</small>
							</p>
						</div>
					</span>
				</span>
			</Dropdown>
		</div>
	);
}

export default UserProfileNav;
