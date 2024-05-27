import React from 'react';
import {
    TeamOutlined,
    SolutionOutlined,
    NumberOutlined,
    ReadOutlined
} from '@ant-design/icons';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    ArcElement,
    Tooltip,
    Filler,
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
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ArcElement
);

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

    const paymentLabels = data && data?.paymentHistory?.map((history: any) => history.month);
    const paymentHistoryData = data && data?.paymentHistory?.map((history: any) => history.totalPaidAmount);

    const userLabels = data && data?.averageLecturesPerMonth?.map((lecture: any) => lecture.month);

    const newStudentsCount = data && data?.newStudentsCount?.map((student: any) => student.count);
    const newAdminsCount = data && data?.newAdminsCount?.map((admin: any) => admin.count);
    const newFacultyCount = data && data?.newFacultyCount?.map((faculty: any) => faculty.count);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top' as const,
            },
            title: {
                display: false
            },
        },
        scales: {
            x: {
                display: true,
                grid: {
                    display: false, // Hide x-axis grid lines
                },
            },
            y: {
                display: true,
                grid: {
                    display: false, // Hide y-axis grid lines
                },
            },
        },
    };

    const circleChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            }
        }
    };

    const paymentChart = {
        labels: paymentLabels,
        datasets: [
            {
                fill: true,
                data: paymentHistoryData,
                borderColor: '#7134eb',
                backgroundColor: '#7134eb',
            },
        ],
    };

    const usersChart = {
        labels: userLabels,
        datasets: [
            {
                fill: false,
                label: "Student",
                data: newStudentsCount,
                borderColor: '#7134eb',
                backgroundColor: '#d4c4f5',
            },
            {
                fill: false,
                label: "Faculty",
                data: newFacultyCount,
                borderColor: '#FFA500',
                backgroundColor: '#FFDAB9',
            },
            {
                fill: false,
                label: "Admin",
                data: newAdminsCount,
                borderColor: '#FF0000',
                backgroundColor: '#FFA07A',
            },
        ],
    };

    const paymentDoghnut = {
        labels: ["Total Paid Amount", "Total Due Amount"],
        datasets: [
            {
                label: 'Amount',
                data: [data?.metaData?.totalFees, data?.metaData?.totalDue],
                backgroundColor: [
                    '#7134eb',
                    '#f95d6a',
                ],
                borderColor: [
                    '#7134eb',
                    '#f95d6a',
                ],
                borderWidth: 1,
            },
        ],
    };

    const usersPie = {
        labels: ["Student", "Teacher", "Admin"],
        datasets: [
            {
                label: 'Count',
                data: [data?.metaData?.studentCount, data?.metaData?.facultyCount, data?.metaData?.adminCount],
                backgroundColor: [
                    '#7134eb', '#FFA500', '#FF0000'
                ],
                borderColor: [
                    '#7134eb', '#FFA500', '#FF0000'
                ],
                borderWidth: 1,
            },
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
            <h1 style={{ marginBottom: '20px', marginTop: '10px' }}>Reports</h1>
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
                                <p style={{ fontSize: '15px', color: 'gray', marginBottom: '8px' }}>Teachers</p>
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
                                <p style={{ fontSize: '15px', color: 'gray', marginBottom: '8px' }}>Administration</p>
                                <p style={{ fontSize: '28px' }}>{data?.metaData?.adminCount}</p>
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
                                <NumberOutlined style={{ fontSize: '32px', color: '#fd7e14' }} />
                            </div>
                        </div>
                    </Col>



                </Row>

                <div style={{ marginTop: '20px' }}>
                    <Row gutter={24}>
                        <Col span={15} >
                            <div style={{
                                backgroundColor: 'white',
                                padding: '20px',
                                margin: '0 0 20px 0px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                                <p style={{ fontSize: '22px', marginBottom: '22px', fontWeight: '500' }}>Fees Collection</p>
                                <Bar options={options} data={paymentChart} />
                            </div>

                            <div style={{
                                backgroundColor: 'white',
                                padding: '20px',
                                margin: '0 0 20px 0px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                                <p style={{ fontSize: '22px', marginBottom: '22px', fontWeight: '500' }}>New Users Per Month</p>
                                <Line options={options} data={usersChart} />
                            </div>

                        </Col>
                        <Col span={9}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: '22px 35px',
                                margin: '0 0 20px 13px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                                <p style={{ fontSize: '22px', marginBottom: '22px', fontWeight: '500' }}>Total Paid vs Total Due</p>
                                <Doughnut data={paymentDoghnut} />
                            </div>

                            <div style={{
                                backgroundColor: 'white',
                                padding: '18px 35px',
                                margin: '0 0 20px 13px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                            }}>
                                <p style={{ fontSize: '22px', marginBottom: '5px', fontWeight: '500' }}>Users</p>
                                <p style={{ marginBottom: '10px', color: 'gray' }}>Total active users {data?.metaData?.activeUserCount} of {data?.metaData?.totalUserCount} users.</p>
                                <Pie data={usersPie} options={circleChartOptions} />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    );
};

export default ViewStat;