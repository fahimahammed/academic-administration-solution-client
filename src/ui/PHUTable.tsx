import { defaultTablePageSize } from '@/constants';
import { Table } from 'antd';

type PHUTableProps = {
	loading?: boolean;
	columns: any;
	dataSource: any;
	pageSize?: number;
	totalPages?: number;
	showSizeChanger?: boolean;
	onPaginationChange?: (page: number, pageSize: number) => void;
	onChange?: (pagination: any, filter: any, sorter: any) => void;
	showPagination?: boolean;
};
export default function PHUTable({
	loading,
	columns,
	dataSource,
	pageSize,
	totalPages,
	showSizeChanger = false,
	onPaginationChange,
	onChange,
	showPagination = true,
}: PHUTableProps) {
	const paginationConfig = showPagination
		? {
			pageSize: pageSize,
			total: totalPages,
			showSizeChanger: showSizeChanger,
			onChange: onPaginationChange,
			pageSizeOptions: defaultTablePageSize,
		}
		: false;
	return (
		<>
			<Table
				rowKey={record => record.id}
				loading={loading}
				columns={columns}
				dataSource={dataSource}
				pagination={paginationConfig}
				onChange={onChange}
			/>
		</>
	);
}
