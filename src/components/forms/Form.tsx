import React, { ReactElement, ReactNode, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';

type FormConfig = {
	resolver?: any;
	defaultValues?: Record<string, any>;
};

type APFormProps = {
	children?: ReactElement | ReactNode;
	onSubmit: SubmitHandler<any>;
} & FormConfig;

export default function Form({ children, onSubmit, defaultValues, resolver }: APFormProps) {
	const formConfig: FormConfig = {};
	if (!!defaultValues) formConfig['defaultValues'] = defaultValues;
	if (!!resolver) formConfig['resolver'] = resolver;

	const methods = useForm<APFormProps>(formConfig);
	/**
	 *
	 * this comment is only for debugging the errors to find out the schema validation
	 *
	 * */
	// console.log(methods.formState.errors)
	const { handleSubmit } = methods;

	const submit = (value: any) => {
		onSubmit(value);
		methods.reset();
	};

	/**
	 *
	 * add this fix for losing data after refresh
	 * link: https://github.com/orgs/react-hook-form/discussions/2282
	 *
	 */
	useEffect(() => methods.reset(defaultValues), [defaultValues, methods, methods.reset]);

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(submit)} className="mx-auto">
				{children}
			</form>
		</FormProvider>
	);
}
