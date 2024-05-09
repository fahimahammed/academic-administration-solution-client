import { FormInput } from '@/components/forms';
import StepperComponent, { IStep } from '@/components/stepperform';
import { logger } from '@/services';
import React from 'react';

function StepOne() {
	return (
		<>
			<FormInput name="firstOne" placeholder="first one" />
		</>
	);
}

function StepTwo() {
	return (
		<>
			<FormInput name="firstTwo" placeholder="first two" />
		</>
	);
}

export default function TestPage() {
	const steps: IStep[] = [
		{
			title: 'step one',
			content: <StepOne />,
		},
		{
			title: 'step two',
			content: <StepTwo />,
		},
	];
	return (
		<div>
			<StepperComponent
				steps={steps}
				persistKeyName="hi"
				onSubmitHandler={value => {
					logger.log(value);
				}}
			/>
		</div>
	);
}
