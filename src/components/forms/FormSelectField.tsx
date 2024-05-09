import SelectField from '@/ui/SelectField';
import { Controller, useFormContext } from 'react-hook-form';
import { FormLabel } from '.';
import { getErrorMessageByProperty } from '@/utils/schema-validation';
import { red } from '@ant-design/colors';

type SelectOption = {
	value: string;
	label: string;
};
type APSelectProps = {
	options: SelectOption[];
	name: string;
	label?: string;
	defaultValue?: SelectOption;
	placeholder?: string;
};

export default function FormSelectField({ options, name, label = '', placeholder }: APSelectProps) {
	const {
		control,
		formState: { errors },
	} = useFormContext();
	const errorMessages = getErrorMessageByProperty(errors, name);
	return (
		<>
			<FormLabel noMargin={false}>{label || name}</FormLabel>
			<Controller
				name={name}
				control={control}
				render={({ field: { onChange, value } }) => {
					return <SelectField value={value} handleChange={onChange} placeholder={placeholder} options={options} />;
				}}
			/>
			<small style={{ color: red.primary }}>{errorMessages}</small>
		</>
	);
}
