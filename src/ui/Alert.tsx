// import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
interface IAlertProps {
	title: string;
	className?: string;
	variant: 'success' | 'info' | 'error' | 'warning';
	dismissTimeout?: number;
}

export default function Alert({ title, variant, className, dismissTimeout }: IAlertProps) {
	const [visible, setVisible] = useState(true);

	useEffect(() => {
		if (dismissTimeout) {
			const timeoutId = setTimeout(() => {
				setVisible(false);
			}, dismissTimeout);
			return () => clearTimeout(timeoutId);
		}
	}, [dismissTimeout]);

	const alertClassName = {
		success: {
			wrapper: 'bg-green-50',
			icon: 'text-green-400',
			title: 'text-green-800',
			dismissButtonTitle: 'text-green-500',
			dismissButtonbg: 'bg-green-50',
			focus: 'ring-green-600',
			offsetFocus: 'ring-offset-green-50',
			hover: 'bg-green-100',
		},
		info: {
			wrapper: 'bg-blue-50',
			icon: 'text-blue-400',
			title: 'text-blue-800',
			dismissButtonTitle: 'text-blue-500',
			dismissButtonbg: 'bg-blue-50',
			focus: 'ring-blue-600',
			offsetFocus: 'ring-offset-blue-50',
			hover: 'bg-blue-100',
		},
		error: {
			wrapper: 'bg-red-50',
			icon: 'text-red-400',
			title: 'text-red-800',
			dismissButtonTitle: 'text-red-500',
			dismissButtonbg: 'bg-red-50',
			focus: 'ring-red-600',
			offsetFocus: 'ring-offset-red-50',
			hover: 'bg-red-100',
		},
		warning: {
			wrapper: 'bg-orange-50',
			icon: 'text-orange-400',
			title: 'text-orange-800',
			dismissButtonTitle: 'text-orange-500',
			dismissButtonbg: 'text-orange-500',
			focus: 'ring-orange-600',
			offsetFocus: 'ring-offset-orange-50',
			hover: 'bg-orange-100',
		},
	};

	const dismissAlert = () => {
		setVisible(false);
	};

	return (
		<>
			{visible && (
				<div className={classNames('rounded-md p-4', alertClassName[variant].wrapper, className)}>
					<div className="flex">
						<div className="flex-shrink-0">
							{/* <CheckCircleIcon
								className={classNames('h-5 w-5', alertClassName[variant].icon)}
								aria-hidden="true"
							/> */}
						</div>
						<div className="ml-3">
							<p className={classNames('text-sm font-medium', alertClassName[variant].title)}>{title}</p>
						</div>
						<div className="ml-auto pl-3">
							<div className="-mx-1.5 -my-1.5">
								<button
									type="button"
									className={classNames(
										`inline-flex rounded-md p-1.5 hover:${alertClassName[variant].hover} focus:outline-none focus:ring-2 focus:${alertClassName[variant].focus} focus:ring-offset-2 focus:${alertClassName[variant].offsetFocus}`,
										alertClassName[variant].dismissButtonTitle,
										alertClassName[variant].dismissButtonbg
									)}
									onClick={dismissAlert}
								>
									<span className="sr-only">Dismiss</span>
									{/* <XMarkIcon className="h-5 w-5" aria-hidden="true" /> */}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
