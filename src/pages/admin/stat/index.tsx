import { NextPage } from 'next';
import withLayout from '@/components/layouts/withLayout';
import { Helmet } from '@/components';
import ViewStat from '@/components/stat/ViewStat';

const Statistics: NextPage = () => {
    return (
        <>
            <Helmet>Stat</Helmet>
            <h1>Hello</h1>
            <ViewStat base='admin' />
        </>
    );
};

export default withLayout(Statistics);