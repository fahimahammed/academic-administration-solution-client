import { ActionBar, BreadCrumbsComp, PHUDrawer, SearchInput } from '@/ui';
import { IAdmin, IDepartment, IError, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { useAdminsQuery, useDeleteAdminMutation } from '@/redux/apis/base-admin/admin/adminApi';
import { ColumnsType } from 'antd/es/table';
import { Button, Tooltip } from 'antd';
import PHUModal from '@/ui/PHUModal';
import PHUTable from '@/ui/PHUTable';
import PHULinkButton from '@/ui/LinkButton';
import { DeleteOutlined, EditOutlined, FilterOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import PHUButton from '@/ui/PHUButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import FilterOptions from './fitler-options/FilterOptions';
import { setDefault, setSort } from '@/redux/slices/adminSlice';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';

const ViewAdmins = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [openFilterDrawer, setOpenFilterDrawer] = useState<boolean>(false);
	const adminState = useSelector((state: RootState) => state.admin);
	const [open, setOpen] = useState<boolean>(false);
	const [adminId, setAdminId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return (
			!!adminState.filterOptions.gender ||
			!!adminState.filterOptions.bloodGroup ||
			!!adminState.filterOptions.managementDepartment ||
			!!adminState.sortBy ||
			!!adminState.sortOrder ||
			!!searchTerm
		);
	}, [
		adminState.filterOptions.bloodGroup,
		adminState.filterOptions.gender,
		adminState.filterOptions.managementDepartment,
		adminState.sortBy,
		adminState.sortOrder,
		searchTerm,
	]);

	query['limit'] = size;
	query['page'] = page;
	query['gender'] = adminState.filterOptions.gender;
	query['bloodGroup'] = adminState.filterOptions.bloodGroup;
	query['managementDepartment'] = adminState.filterOptions.managementDepartment;
	query['sortOrder'] = adminState.sortOrder;
	query['sortBy'] = adminState.sortBy;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useAdminsQuery({ ...query });
	const [deleteAdmin] = useDeleteAdminMutation();

	const admins = data?.admins;
	const meta = data?.meta;

	const deleteAdminHandler = async (id: string) => {
		try {
			await deleteAdmin(id);
			notifySuccess('Admin deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IAdmin> = [
		{
			title: 'Id',
			dataIndex: 'id',
			sorter: true,
		},
		{
			title: 'Name',
			dataIndex: 'name',
			render: function (data: Record<string, string>) {
				const fullName = `${data?.firstName} ${data?.middleName} ${data?.lastName}`;
				return <>{fullName}</>;
			},
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Department',
			dataIndex: 'managementDepartment',
			render: function (data: IDepartment) {
				return <>{data?.title}</>;
			},
		},
		{
			title: 'Designation',
			dataIndex: 'designation',
		},
		{
			title: 'Created at',
			dataIndex: 'createdAt',
			render: function (data: string) {
				return <>{formatDateTime(data)}</>;
			},
			sorter: true,
		},
		{
			title: 'Contact no.',
			dataIndex: 'contactNo',
		},
		{
			title: 'Action',
			dataIndex: 'id',
			render: function (data: string) {
				return (
					<>
						<PHULinkButton
							link={`/super-admin/admin/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</PHULinkButton>

						<PHULinkButton
							link={`/super-admin/admin/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</PHULinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setAdminId(data);
							}}
							danger
							style={{ marginLeft: '3px' }}
						>
							<DeleteOutlined />
						</Button>
					</>
				);
			},
		},
	];

	const onPaginationChange = (page: number, size: number) => {
		setSize(size);
		setPage(page);
	};

	const resetAllFilter = () => {
		dispatch(setDefault());
		setSearchTerm('');
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IAdmin>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'super-admin', link: '/super-admin' },
					{ label: 'admin', link: '/super-admin/admin' },
				]}
			/>
			<ActionBar title="admin list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<PHULinkButton
					link="/super-admin/admin/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create admin</span>
				</PHULinkButton>

				<Tooltip title="filter" placement="bottom">
					<PHUButton onClick={() => setOpenFilterDrawer(true)} size="large" style={{ marginLeft: '5px' }}>
						<FilterOutlined />
					</PHUButton>
				</Tooltip>

				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<PHUButton onClick={resetAllFilter} size="large" style={{ marginLeft: '5px' }}>
							<ReloadOutlined />
						</PHUButton>
					</Tooltip>
				) : null}
			</ActionBar>

			<PHUTable
				loading={isLoading}
				columns={columns}
				dataSource={admins}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="remove admin"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteAdminHandler(adminId)}
			>
				<p className="my-5">Do you want to remove this admin?</p>
			</PHUModal>
			<PHUDrawer
				open={openFilterDrawer}
				title="Filtering options"
				width={450}
				onClose={() => {
					setOpenFilterDrawer(false);
				}}
			>
				<FilterOptions />
			</PHUDrawer>
		</>
	);
};

export default ViewAdmins;
