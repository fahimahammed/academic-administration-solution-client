import { ActionBar, BreadCrumbsComp, SearchInput } from '@/ui';
import { IStudent, QueryParamsType } from '@/types';
import { useMemo, useState } from 'react';
import { useDebounce } from '@/hooks';
import { DEBOUNCE_DELAY } from '@/constants';
import PHUTable from '@/ui/PHUTable';
import type { ColumnsType } from 'antd/es/table';
import LinkButton from '@/ui/LinkButton';
import { Tooltip } from 'antd';
import { ReloadOutlined, EyeOutlined } from '@ant-design/icons';
import PHUButton from '@/ui/PHUButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux';
import { setDefault, setSort } from '@/redux/slices/studentSlice';
import { formatDateTime } from '@/utils/datetime-converter';
import { SorterResult } from 'antd/es/table/interface';
import { useAllPaymentsQuery } from '@/redux/apis/paymentApi';

const ViewAllPayment = ({ base }: { base?: string }) => {
    const dispatch = useDispatch();
    const paymentState = useSelector((state: RootState) => state.student);
    const [page, setPage] = useState<number>(1);
    const [size, setSize] = useState<number>(10);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const query: Record<string, QueryParamsType> = {};

    const showResetFilterOption = useMemo(() => {
        return (
            !!paymentState.sortBy ||
            !!paymentState.sortOrder ||
            !!searchTerm
        );
    }, [
        paymentState.sortBy,
        paymentState.sortOrder,
        searchTerm,
    ]);

    query['limit'] = size;
    query['page'] = page;
    query['academicSemesterId'] = paymentState.filterOptions.academicSemester;
    query['sortBy'] = paymentState.sortBy;
    query['sortOrder'] = paymentState.sortOrder;

    const debouncedSearchTerm = useDebounce({
        searchQuery: searchTerm,
        delay: DEBOUNCE_DELAY,
    });

    if (!!debouncedSearchTerm) {
        query['searchTerm'] = debouncedSearchTerm;
    }

    // const { data, isLoading } = useStudentsQuery({ ...query });
    const { data, isLoading } = useAllPaymentsQuery({ ...query });

    const payments = data?.payments;
    const meta = data?.meta;


    const columns: ColumnsType<IStudent> = [
        {
            title: 'Id',
            dataIndex: ['student', 'userId'],
            sorter: true
            //sorter: (a, b) => a.student.userId.localeCompare(b.student.userId),
        },
        {
            title: 'Name',
            render: function (data: Record<string, any>) {
                const fullName = `${data?.student?.firstName} ${data?.student?.middleName} ${data?.student?.lastName}`;
                return <>{fullName}</>;
            },
        },
        {
            title: 'Semester',
            render: function (data: Record<string, any>) {
                return <>{data?.academicSemester?.title} ({data?.academicSemester?.year})</>
            }
        },
        {
            title: 'Total Amount',
            dataIndex: 'fullPaymentAmount',
        },
        {
            title: 'Due',
            dataIndex: 'totalDueAmount',
            sorter: true,
        },
        {
            title: 'Paid',
            dataIndex: 'totalPaidAmount',
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
                            link={`/${base}/payment/details/${data}`}
                            customStyle={{ margin: '0px 3px', padding: '7.5px 16px' }}
                        >
                            <EyeOutlined />
                        </LinkButton>
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

    const onChange = (pagination: any, filters: any, sorter: SorterResult<IStudent>) => {
        const { order, field } = sorter;
        dispatch(setSort({ sortBy: field as string, sortOrder: order === 'ascend' ? 'asc' : 'desc' }));
    };

    return (
        <>
            <BreadCrumbsComp
                items={[
                    { label: `${base}`, link: `/${base}` },
                    { label: 'payment', link: `/${base}/payment` },
                ]}
            />

            <ActionBar title="Payment List">
                <SearchInput
                    placeholder="search"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    value={searchTerm}
                />

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
                dataSource={payments}
                pageSize={size}
                totalPages={meta?.total}
                showSizeChanger
                onPaginationChange={onPaginationChange}
                onChange={onChange}
            />
        </>
    );
};

export default ViewAllPayment;
