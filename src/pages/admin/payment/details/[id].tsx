import { Helmet } from '@/components';
import withLayout from '@/components/layouts/withLayout';
import ViewPaymentDetails from '@/components/payment/ViewPaymentDetails';
import { useRouter } from 'next/router';
import React from 'react';

function ViewPaymentDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    return (
        <>
            <Helmet>View Payment Details</Helmet>
            <ViewPaymentDetails id={id} base='admin'></ViewPaymentDetails>
        </>
    );
}

export default withLayout(ViewPaymentDetailsPage);
