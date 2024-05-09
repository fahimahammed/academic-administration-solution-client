import { Controller, useFormContext } from 'react-hook-form';
import APLabel from './FormLabel';
import TextArea from '@/ui/PHUTextArea';

type APTextAreaProps = {
	name: string;
	label?: string;
	rows?: number;
	value?: string;
};

export default function APTextArea({ name, label, rows, value }: APTextAreaProps) {
	const { control } = useFormContext();
	return (
		<div className={`flex flex-col  w-full`}>
			<APLabel noMargin={false}>{label || name}</APLabel>
			<Controller
				name={name}
				control={control}
				render={({ field }) => <TextArea rows={rows} field={field} value={value as string} />}
			/>
		</div>
	);
}

APTextArea.defaultProps = {
	rows: 4,
	label: '',
};
