type APLabelProps = {
	children: string;
	noMargin: boolean;
	htmlFor?: string;
};

export default function FormLabel({ children, noMargin, htmlFor = '' }: APLabelProps) {
	const labelText = children
		// insert a space before all caps
		.replace(/([A-Z])/g, ' $1')
		// uppercase the first character
		.replace(/^./, str => str.toUpperCase());

	return (
		<label className={` font-semibold ${noMargin ? null : 'mb-2'}`} htmlFor={htmlFor}>
			{labelText}
		</label>
	);
}
