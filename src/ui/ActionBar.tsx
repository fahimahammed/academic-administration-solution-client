type ActionBarProps = {
	title: string;
	children?: React.ReactNode;
};
export default function ActionBar({ title, children }: ActionBarProps) {
	return (
		<div style={{ width: '100%', margin: '10px 0' }}>
			<h1 style={{ fontSize: '28px', margin: '5px 0', textTransform: 'capitalize' }}>{title}</h1>
			<div style={{ display: 'flex' }}>{children}</div>
		</div>
	);
}
