import { usePaymentQuery } from '@/redux/apis/paymentApi';
import { ActionBar, BreadCrumbsComp, Spinner } from '@/ui';
import { formatDateTime } from '@/utils/datetime-converter';
import { Table, TableProps, Tag } from 'antd';

type EditStudentProps = {
    id: string | string[] | undefined;
    base?: string;
};

interface DataType {
    key: string;
    transactionId: string;
    paidAmount: number;
    isPaid: boolean;
    paymentMethod: string;
    createdAt: string;
    updatedAt: string;
}

const columns: TableProps<DataType>['columns'] = [
    {
        title: 'Transaction Id',
        dataIndex: 'transactionId',
        key: 'paidAmount'
    },
    {
        title: 'Amount',
        dataIndex: 'paidAmount',
        key: 'paidAmount',
    },
    {
        title: 'Payment Method',
        dataIndex: 'paymentMethod',
        key: 'paymentMethod',
    },
    {
        title: 'Status',
        key: 'isPaid',
        dataIndex: 'isPaid',
        render: (_, { isPaid }) => (
            <>
                <Tag color={isPaid ? 'green' : 'red'}>
                    {isPaid ? "Paid" : "Unpaid"}
                </Tag>
            </>
        ),
    },
    {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (_, { createdAt }) => (
            <>
                {formatDateTime(createdAt)}
            </>
        ),
    },
    {
        title: 'Updated At',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render: (_, { updatedAt }) => (
            <>
                {formatDateTime(updatedAt)}
            </>
        ),
    },
];


const ViewPaymentDetails = ({ id, base }: EditStudentProps) => {
    const { data, isLoading } = usePaymentQuery(id as string);

    if (isLoading) return <Spinner />;

    return (
        <>
            <BreadCrumbsComp
                items={[
                    { label: `${base}`, link: `/${base}` },
                    { label: 'payment', link: `/${base}/payment` },
                    { label: 'details', link: `/${base}/payment/details/${data?.id}` },
                ]}
            />
            <ActionBar title={`view Payment Details - ${data?.student?.userId}`}></ActionBar>
            <div style={{ border: '1px solid #d9d9d9', borderRadius: '5px', padding: '15px', marginBottom: '10px' }}>
                <table style={{ width: '100%' }}>
                    <tr>
                        <td colSpan={2}>
                            <h2 style={{ marginBottom: '5px', color: '#000000A6' }}>Student Information</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
                        </td>
                    </tr>
                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Name
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>
                            {data?.student?.firstName} {data?.student?.middleName} {data?.student?.lastName}
                        </td>
                    </tr>

                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Department
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>
                            {data?.student?.academicDepartment?.title}
                        </td>
                    </tr>

                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Faculty
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>
                            {data?.student?.academicFaculty?.title}
                        </td>
                    </tr>

                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Semester
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>
                            {data?.academicSemester?.title} ({data?.academicSemester?.year})
                        </td>
                    </tr>


                    <tr>
                        <td colSpan={2}>
                            <h2 style={{ marginBottom: '5px', marginTop: '20px', color: '#000000A6' }}>Payment Information</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
                        </td>
                    </tr>

                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Total Amount
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.fullPaymentAmount}</td>
                    </tr>

                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Due Amount
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.totalDueAmount}</td>
                    </tr>

                    <tr style={{ margin: '0px 0px' }}>
                        <td
                            style={{
                                fontWeight: 700,
                                marginRight: '10px',
                                textTransform: 'capitalize',
                                // textAlign: 'right',
                            }}
                        >
                            Total Paid Amount
                        </td>
                        <td style={{ textAlign: 'left', padding: '5px 15px' }}>{data?.totalPaidAmount}</td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <h2 style={{ marginBottom: '5px', marginTop: '20px', color: '#000000A6' }}>Payment History</h2> <hr style={{ background: 'gray', marginBottom: '10px' }} />
                        </td>
                    </tr>

                </table>
                <Table columns={columns} dataSource={data?.paymentHistories} />
            </div>
        </>
    );
};

export default ViewPaymentDetails;
