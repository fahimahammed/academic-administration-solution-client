import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IError, IMyPayment, IOfferedCourse, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY, PaymentStatus, PaymentType } from '@/constants';
import { logger } from '@/services';
import { notifyError } from '@/ui/ToastNotification';
import { ColumnsType } from 'antd/es/table';
import { Button, Tag, Tooltip } from 'antd';
import Modal from '@/ui/Modal';
import Table from '@/ui/Table';
import { ReloadOutlined } from '@ant-design/icons';
import Button from '@/ui/Button';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useDispatch } from 'react-redux';
import { IOfferedCourseSection } from '@/types/offered-course-section';
import { setDefault, setSort } from '@/redux/slices/offeredCourseSectionSlice';
import { useInitialPaymentMutation, useMyPaymentsQuery } from '@/redux/apis/paymentApi';
import { useRouter } from 'next/router';
import { IAcademicCoreSemester } from '@/types/academic/semester';

const ViewMyPayment = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const [page, setPage] = useState<number>(1);
	const [size, setSize] = useState<number>(10);
	const [open, setOpen] = useState<boolean>(false);
	const [paymentType, setPaymentType] = useState<string>('');
	const [academicSemesterId, setAcademicSemesterId] = useState<string>('');
	const [searchTerm, setSearchTerm] = useState<string>('');
	const query: Record<string, QueryParamsType> = {};

	const showResetFilterOption = useMemo(() => {
		return !!searchTerm;
	}, [searchTerm]);

	query['limit'] = size;
	query['page'] = page;

	const debouncedSearchTerm = useDebounce({
		searchQuery: searchTerm,
		delay: DEBOUNCE_DELAY,
	});

	if (!!debouncedSearchTerm) {
		query['searchTerm'] = debouncedSearchTerm;
	}

	const { data, isLoading } = useMyPaymentsQuery({ ...query });
	const [initialPayment] = useInitialPaymentMutation();
	const myPayments = data?.myPayments;
	const meta = data?.meta;

	const handleInitialPayment = async (data: { academicSemesterId: string; paymentType: PaymentType }) => {
		try {
			const response = await initialPayment(data).unwrap();
			router.push(response.paymentUrl);
		} catch (error) {
			logger.error(error);
			const er = error as IError;
			notifyError(er.data);
		}
	};

	const columns: ColumnsType<IOfferedCourseSection> = [
		{
			title: 'Student info',
			dataIndex: 'student',
			render: function (data) {
				return (
					<table style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '10px' }}>
						<tr style={{ margin: '0px 0px' }}>
							<td
								style={{
									fontWeight: 700,
									marginRight: '10px',
									textTransform: 'capitalize',
									textAlign: 'left',
								}}
							>
								name
							</td>
							<td style={{ textAlign: 'left', padding: '5px 15px' }}>
								<span style={{ marginLeft: '10px', textAlign: 'right' }}>
									{data?.firstName} {data?.middleName} {data?.lastName}
								</span>
							</td>
						</tr>

						<tr style={{ margin: '0px 0px' }}>
							<td
								style={{
									fontWeight: 700,
									marginRight: '10px',
									textTransform: 'capitalize',
									textAlign: 'left',
								}}
							>
								Student id
							</td>
							<td style={{ textAlign: 'left', padding: '5px 15px' }}>
								<span style={{ marginLeft: '10px', textAlign: 'right' }}>{data?.studentId}</span>
							</td>
						</tr>
					</table>
				);
			},
		},
		{
			title: 'semeter',
			dataIndex: 'academicSemester',
			render: function (data: IAcademicCoreSemester) {
				return (
					<>
						{data?.title} - {data?.year}
					</>
				);
			},
		},
		{
			title: 'Full payment amount',
			render: function (data: IMyPayment) {
				return (
					<table style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '10px' }}>
						<tr style={{ margin: '0px 0px' }}>
							<td
								style={{
									fontWeight: 700,
									marginRight: '10px',
									textTransform: 'capitalize',
									textAlign: 'left',
								}}
							>
								full payment amount
							</td>
							<td style={{ textAlign: 'left', padding: '5px 15px' }}>
								<span style={{ marginLeft: '10px' }}>{data.fullPaymentAmount} Tk</span>
							</td>
						</tr>

						<tr style={{ margin: '0px 0px' }}>
							<td
								style={{
									fontWeight: 700,
									marginRight: '10px',
									textTransform: 'capitalize',
									textAlign: 'left',
								}}
							>
								partial payment amount
							</td>
							<td style={{ textAlign: 'left', padding: '5px 15px' }}>
								<span style={{ marginLeft: '10px' }}>{data.partialPaymentAmount} Tk</span>
							</td>
						</tr>

						<tr style={{ margin: '0px 0px' }}>
							<td
								style={{
									fontWeight: 700,
									marginRight: '10px',
									textTransform: 'capitalize',
									textAlign: 'left',
								}}
							>
								total due amount
							</td>
							<td style={{ textAlign: 'left', padding: '5px 15px' }}>
								<span style={{ marginLeft: '10px' }}>{data.totalDueAmount} Tk</span>
							</td>
						</tr>

						<tr style={{ margin: '0px 0px' }}>
							<td
								style={{
									fontWeight: 700,
									marginRight: '10px',
									textTransform: 'capitalize',
									textAlign: 'left',
								}}
							>
								total paid amount
							</td>
							<td style={{ textAlign: 'left', padding: '5px 15px' }}>
								<span style={{ marginLeft: '10px' }}>{data.totalPaidAmount} Tk</span>
							</td>
						</tr>
					</table>
				);
			},
		},
		{
			title: 'payment status',
			dataIndex: 'paymentStatus',
			render: function (data: string) {
				return (
					<div style={{ textAlign: 'center' }}>
						{data === PaymentStatus.PENDING.toString() && <Tag color="yellow">pending</Tag>}

						{data === PaymentStatus.FULL_PAID.toString() && <Tag color="green">paid</Tag>}

						{data === PaymentStatus.PARTIAL_PAID.toString() && <Tag color="orange">partial paid</Tag>}
					</div>
				);
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
			render: function (data: IMyPayment) {
				return (
					<>
						{data.paymentStatus === PaymentStatus.PENDING && (
							<>
								<Button
									type="primary"
									onClick={() => {
										setAcademicSemesterId(data?.academicSemesterId);
										setOpen(true);
										setPaymentType(PaymentType.PARTIAL);
									}}
									style={{ marginLeft: '3px' }}
								>
									pay partial
								</Button>
								<Button
									type="primary"
									onClick={() => {
										setAcademicSemesterId(data?.academicSemesterId);
										setOpen(true);
										setPaymentType(PaymentType.FULL);
									}}
									style={{ marginLeft: '3px' }}
								>
									pay full
								</Button>
							</>
						)}

						{data.paymentStatus === PaymentStatus.PARTIAL_PAID && (
							<>
								<Button
									type="primary"
									onClick={() => {
										setAcademicSemesterId(data?.academicSemesterId);
										setOpen(true);
										setPaymentType(PaymentType.FULL);
									}}
									style={{ marginLeft: '3px' }}
								>
									full payment
								</Button>
							</>
						)}
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
		dispatch(setDefault());
	};

	const onChange = (pagination: any, filters: any, sorter: SorterResult<IOfferedCourse>) => {
		const { order, field } = sorter;
		dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
	};

	return (
		<>
			<BreadCrumbsComp
				items={[
					{ label: 'admin', link: '/admin' },
					{ label: 'payment', link: '/admin/payment' },
				]}
			/>
			<ActionBar title="my payment list">
				<SearchInput
					placeholder="search"
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
					value={searchTerm}
				/>

				{showResetFilterOption ? (
					<Tooltip title="reset" placement="bottom">
						<Button onClick={resetAllFilter} size="large" style={{ marginLeft: '5px' }}>
							<ReloadOutlined />
						</Button>
					</Tooltip>
				) : null}
			</ActionBar>

			<Table
				loading={isLoading}
				columns={columns}
				dataSource={myPayments}
				pageSize={size}
				showSizeChanger
				totalPages={meta?.total}
				onPaginationChange={onPaginationChange}
				onChange={onChange}
			/>

			<Modal
				title="Online Payment"
				isOpen={open}
				closeModal={() => setOpen(false)}
				handleOk={() => {
					if (paymentType === PaymentType.PARTIAL) {
						handleInitialPayment({
							academicSemesterId: academicSemesterId,
							paymentType: PaymentType.PARTIAL,
						});
					} else if (paymentType === PaymentType.FULL) {
						handleInitialPayment({
							academicSemesterId: academicSemesterId,
							paymentType: PaymentType.FULL,
						});
					}
				}}
			>
				<>
					<p>Payment: {paymentType} </p>
					<p className="my-5">Click ok button to proceed payment</p>
				</>
			</Modal>
		</>
	);
};

export default ViewMyPayment;
