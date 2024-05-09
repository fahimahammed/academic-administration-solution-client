import { toast, Toaster, ToasterProps } from 'react-hot-toast';

export const notifySuccess = (message: string) =>
	toast.success(message, {
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	});

export const notifyError = (message: string) =>
	toast.error(message, {
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	});

export const notifyDefault = (message: string) =>
	toast(message, {
		icon: '👏',
		style: {
			borderRadius: '10px',
			background: '#333',
			color: '#fff',
		},
	});

export default function ToastNotification({ ...toastConfig }: ToasterProps) {
	return <Toaster {...toastConfig} />;
}
