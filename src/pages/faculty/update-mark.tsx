import { Helmet } from '@/components';
import UpdateMark from '@/components/base/faculty/UpdateMark';
import withLayout from '@/components/layouts/withLayout';
import { NextPage } from 'next';

const UpdateStudentMarkPage: NextPage = () => {
	return (
		<>
			<Helmet>student update mark</Helmet>
			<UpdateMark />
		</>
	);
};

export default withLayout(UpdateStudentMarkPage);
