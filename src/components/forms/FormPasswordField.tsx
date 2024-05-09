import { Controller, useFormContext } from 'react-hook-form';
import APLabel from './FormLabel';
import { getErrorMessageByProperty } from '@/utils/schema-validation';
import { red } from '@ant-design/colors';
import { Input } from 'antd';

interface IInput {
	size?: 'large' | 'small';
	name: string;
	label?: string;
	value?: string | string[] | undefined;
	validation?: object;
	id?: string;
	placeholder?: string;
}

export default function FormInputPasswordField({ size, name, label = '', id = '', placeholder = '' }: IInput) {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	const errorMessages = getErrorMessageByProperty(errors, name);

	return (
		<div>
			{label ? (
				<APLabel noMargin={false} htmlFor={id || name}>
					{label}
				</APLabel>
			) : null}

			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => (
					<Input.Password
						size={size}
						type="password"
						placeholder={placeholder}
						value={value}
						onChange={onChange}
					/>
				)}
			/>
			<small style={{ color: red.primary }}>{errorMessages}</small>
		</div>
	);
}

FormInputPasswordField.defaultProps = {
	value: null,
};
