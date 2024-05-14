import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IBuilding, IDepartment, IError, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import { logger } from '@/services';
import { notifyError, notifySuccess } from '@/ui/ToastNotification';
import { ColumnsType } from 'antd/es/table';
import { Button, Tooltip } from 'antd';
import PHUModal from '@/ui/PHUModal';
import PHUTable from '@/ui/PHUTable';
import LinkButton from '@/ui/LinkButton';
import { DeleteOutlined, EditOutlined, ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import PHUButton from '@/ui/PHUButton';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useBuildingsQuery, useDeleteBuildingMutation } from '@/redux/apis/buildingApi';

const ViewBuilding = () => {
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [sortBy, setSortBy] = useState<string>('');
	const [sortOrder, setSortOrder] = useState<string>('');
	const [buildingId, setBuildingId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm || !!sortBy || !!sortOrder;
	}, [searchTerm, sortBy, sortOrder]);

	query['limit'] = size;
	query['page'] = page;
	query['sortBy'] = sortBy;
	query['sortOrder'] = sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useBuildingsQuery({ ...query });
	const [deleteBuilding] = useDeleteBuildingMutation();

	const buildings = data?.buildings;
	const meta = data?.meta;

	const deleteBuildingHandler = async (id: string) => {
		try {
			await deleteBuilding(id).unwrap();
			notifySuccess('Building deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IBuilding> = [
		{
			title: 'Title',
			dataIndex: 'title',
			sorter: true,
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
			title: 'Action',
			dataIndex: 'id',
			render: function (data: string) {
				return (
					<>
						<LinkButton
							link={`/admin/building/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/building/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setBuildingId(data);
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
		setSearchTerm('');
		setSortBy('');
		setSortOrder('');
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IDepartment>) => {
		const { order, field } = sorter;
		setSortBy(field as string);
		setSortOrder(order === 'ascend' ? 'asc' : 'desc');
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'building', link: '/admin/building' },
				]}
			/>
			<ActionBar title="builsing list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<LinkButton
					link="/admin/building/create"
					customStyle={{
						marginLeft: 'auto',
						padding: '10px 20px',
					}}
				>
					<span>create building</span>
				</LinkButton>

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
				dataSource={buildings}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="Remove Building"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteBuildingHandler(buildingId)}
			>
				<p className="my-5">Do you want to remove this building?</p>
			</PHUModal>
		</>
	);
};

export default ViewBuilding;
