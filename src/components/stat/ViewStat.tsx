import React from 'react';
import {
    TeamOutlined,
    SolutionOutlined,
    TransactionOutlined,
    ReadOutlined
} from '@ant-design/icons';
import { Bar, Chart, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { Col, Row, Spin } from 'antd';
import { useMetaDataQuery } from '@/redux/apis/metaApi';
import { BreadCrumbsComp } from '@/ui';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);


export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderWidth: 1,
        },
    ],
};

const ViewStat = ({ base }: { base?: string }) => {
    const { data, isLoading } = useMetaDataQuery({});
    // console.log(mData)

    if (isLoading)
        return (
            <div style={{ marginLeft: 'auto', marginRight: '20px' }}>
                <div className="example">
                    <Spin />
                </div>
            </div>
        );

    const isBrowser = typeof window !== 'undefined';

    const labels = data && data?.paymentHistory?.map((history: any) => history.month);
    const paymentHistoryData = data && data?.paymentHistory?.map((history: any) => history.totalPaidAmount);
    const lectureCountData = data && data?.averageLecturesPerMonth?.map((lecture: any) => lecture.lectureCount);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Chart.js Line Chart',
            },
        },
    };

    const lineData = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: paymentHistoryData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    const barData = {
        labels: labels,
        datasets: [
            {
                label: 'Lecture',
                data: lectureCountData,
                borderColor: '#7134eb',
                backgroundColor: '#7134eb',
            }
        ],
    };

    return (
        <div>
            <BreadCrumbsComp
                items={[
                    { label: `${base}`, link: `/${base}` },
                    { label: 'dashboard', link: `/${base}/stat` },
                ]}
            />
            <h1 style={{ marginBottom: '20px' }}>Reports</h1>
            <div>
                <Row gutter={24}>
                    <Col span={6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <p style={{ fontSize: '15px', color: 'gray', marginBottom: '8px' }}>Students</p>
                                <p style={{ fontSize: '28px' }}>{data?.metaData?.studentCount}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#d4c4f5',
                                marginRight: '16px'
                            }}>
                                <TeamOutlined style={{ fontSize: '32px', color: '#7134eb' }} />
                            </div>
                        </div>
                    </Col>

                    <Col span={6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <p style={{ fontSize: '15px', color: 'gray', marginBottom: '8px' }}>Faculties</p>
                                <p style={{ fontSize: '28px' }}>{data?.metaData?.facultyCount}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#d4edda',
                                marginRight: '16px'
                            }}>
                                <SolutionOutlined style={{ fontSize: '32px', color: '#28a745' }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <p style={{ fontSize: '15px', color: 'gray', marginBottom: '8px' }}>Departments</p>
                                <p style={{ fontSize: '28px' }}>{data?.metaData?.departmentCount}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#f8d7da',
                                marginRight: '16px'
                            }}>
                                <ReadOutlined style={{ fontSize: '32px', color: '#dc3545' }} />
                            </div>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <div>
                                <p style={{ fontSize: '15px', color: 'gray', marginBottom: '8px' }}>Fees Collection</p>
                                <p style={{ fontSize: '28px' }}>{data?.metaData?.totalFees}</p>
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                backgroundColor: '#ffe5d1',
                                marginRight: '16px'
                            }}>
                                <TransactionOutlined style={{ fontSize: '32px', color: '#fd7e14' }} />
                            </div>
                        </div>
                    </Col>



                </Row>

                <div style={{ marginTop: '25px' }}>
                    <Row gutter={24}>
                        <Col span={12}>
                            <p style={{ fontSize: '20px' }}>Fees Collection</p>
                            <Line options={options} data={lineData} />

                        </Col>
                        <Col span={12}>
                            <p style={{ fontSize: '20px' }}>Average Lecture Per Month</p>

                        </Col>
                    </Row>
                </div>
            </div>
            {/* <Row gutter={24}>
                <Col span={8}>
                    <Doughnut data={data} />
                </Col>
                <Col span={8}>
                    <Pie data={data} />
                </Col>
                <Col span={8}>
                    <Line options={options} data={data} />
                </Col>
            </Row> */}
        </div>
    );
};

export default ViewStat;