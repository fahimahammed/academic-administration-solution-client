import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IError, IRoom, QueryParamsType } from '@/types';
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
import { IBuilding } from '@/types/building';
import { useDeleteRoomMutation, useRoomsQuery } from '@/redux/apis/roomApi';
import BuildingFilter from './filter-options/BuildingFilter';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { setDefault, setSort } from '@/redux/slices/roomSlice';

const ViewRoom = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const roomState = useSelector((state: RootState) => state.room);
	const [open, setOpen] = useState<boolean>(false);
	const [roomId, setRoomId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!roomState.filterOptions.buildingId || !!roomState.sortBy || !!roomState.sortOrder || !!searchTerm;
	}, [roomState.filterOptions.buildingId, roomState.sortBy, roomState.sortOrder, searchTerm]);

	query['limit'] = size;
	query['page'] = page;
	query['buildingId'] = roomState.filterOptions.buildingId;
	query['sortBy'] = roomState.sortBy;
	query['sortOrder'] = roomState.sortOrder;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useRoomsQuery({ ...query });
	const [deleteRoom] = useDeleteRoomMutation();

	const rooms = data?.rooms;
	const meta = data?.meta;

	const deleteRoomHandler = async (id: string) => {
		try {
			await deleteRoom(id).unwrap();
			notifySuccess('room deleted successfully');
			setOpen(false);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IRoom> = [
		{
			title: 'Room no',
			dataIndex: 'roomNumber',
			sorter: true,
		},
		{
			title: 'Floor',
			dataIndex: 'floor',
			sorter: true,
		},
		{
			title: 'Buillding',
			dataIndex: 'building',
			render: function (data: IBuilding) {
				return <>{data?.title}</>;
			},
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
							link={`/admin/room/details/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EyeOutlined />
						</LinkButton>
						<LinkButton
							link={`/admin/room/edit/${data}`}
							customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
						>
							<EditOutlined />
						</LinkButton>

						<Button
							type="primary"
							onClick={() => {
								setOpen(true);
								setRoomId(data);
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

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IRoom>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'room', link: '/admin/room' },
				]}
			/>
			<ActionBar title="room list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>
				<BuildingFilter />
				<LinkButton
					link="/admin/room/create"
					customStyle={{
						// marginLeft: 'auto',
						padding: '10px 20px',
						marginLeft: '5px',
					}}
				>
					<span>create room</span>
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
				dataSource={rooms}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<PHUModal
				title="remove room"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => deleteRoomHandler(roomId)}
			>
				<p className="my-5">Do you want to remove this room?</p>
			</PHUModal>
		</>
	);
};

export default ViewRoom;
