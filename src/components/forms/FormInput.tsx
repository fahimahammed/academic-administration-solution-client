import { Controller, useFormContext } from 'react-hook-form';
import FormLabel from './FormLabel';
import { getErrorMessageByProperty } from '@/utils/schema-validation';
import { red } from '@ant-design/colors';
import Input from '@/ui/Input';

interface IInput {
	size?: 'large' | 'small';
	type?: string;
	name: string;
	label?: string;
	value?: string | string[] | undefined;
	validation?: object;
	id?: string;
	placeholder?: string;
}

export default function FormInput({ size, type = 'text', name, label = '', value, id = '', placeholder = '' }: IInput) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const errorMessages = getErrorMessageByProperty(errors, name);

	return (
		<>
			{label ? (
				<FormLabel noMargin={type === 'checkbox' || type === 'radio'} htmlFor={id || name}>
					{label}
				</FormLabel>
			) : null}

			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<Input
						type={type}
						size={size}
						placeholder={placeholder}
						field={field}
						value={value ? value : field.value}
					/>
				)}
			/>
			<small style={{ color: red.primary }}>{errorMessages}</small>
		</>
	);
}

FormInput.defaultProps = {
	value: null,
};
