import { setFromLocalStorage } from '@/utils/local-storage';
import { getFromLocalStorage } from '@/utils/local-storage';
import { Button, Steps, Typography } from 'antd';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

export interface IStep {
	title: string;
	content: ReactElement | ReactNode;
}

interface IStepperComponent {
	steps: IStep[];
	finishedMessage?: string;
	validationSchema?: any;
	initialFormValue?: any;
	onSubmitHandler: (el: any) => void;
	persistKeyName: string;
	navigateLink?: string;
}

export default function StepperComponent({
	steps,
	finishedMessage,
	initialFormValue,
	onSubmitHandler,
	persistKeyName,
	validationSchema,
	navigateLink,
}: IStepperComponent) {
	const router = useRouter();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [savedValues, setSavedValues] = useState(
		!!getFromLocalStorage(persistKeyName as string)
			? JSON.parse(getFromLocalStorage(persistKeyName) as string)
			: initialFormValue
	);

	const [current, setCurrent] = useState<number>(
		!!getFromLocalStorage('step') ? Number(JSON.parse(getFromLocalStorage('step') as string).step) : 0
	);

	const methods = useForm({
		defaultValues: savedValues,
		resolver: yupResolver(validationSchema),
	});
	const watch = methods.watch();

	useEffect(() => {
		setFromLocalStorage(persistKeyName, JSON.stringify(methods.watch()));
	}, [methods, watch, persistKeyName]);

	const handleNext = () => {
		setCurrent(prev => prev + 1);
	};

	const handleBack = () => {
		setCurrent(prev => prev - 1);
	};

	const { handleSubmit } = methods;

	useEffect(() => {
		setFromLocalStorage('step', JSON.stringify({ step: current }));
	}, [current]);

	const handleSubmitStepperForm = async (values: any) => {
		onSubmitHandler(values);
		methods.reset();
		/** reset the step to 0  */
		setFromLocalStorage('step', JSON.stringify({ step: 0 }));
		if (navigateLink) {
			router.push(navigateLink);
		}
	};

	const items = steps.map(item => ({ key: item.title, title: item.title }));
	return (
		<div style={{ margin: '20px 0px' }}>
			<Steps current={current} items={items} />
			{current === steps.length ? (
				<Typography>{finishedMessage}</Typography>
			) : (
				<>
					<FormProvider {...methods}>
						<form onSubmit={handleSubmit(handleSubmitStepperForm)} className="">
							<div style={{ margin: '20px 0px' }}>{steps[current].content}</div>
							<div>
								{current < steps.length - 1 && (
									<Button type="primary" onClick={() => handleNext()}>
										Next
									</Button>
								)}
								{current === steps.length - 1 && (
									<Button htmlType="submit" type="primary">
										Done
									</Button>
								)}
								{current > 0 && (
									<Button style={{ margin: '0 8px' }} onClick={() => handleBack()}>
										Previous
									</Button>
								)}
							</div>
						</form>
					</FormProvider>
				</>
			)}
		</div>
	);
}
