import React from 'react';
import notFound from '../assets/images/not-found.png';
import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
	return (
		<div className="h-screen bg-secondary p-10">
			<div className="bg-primary h-full w-full flex flex-col justify-center items-center gap-10">
				<Image src={notFound} alt="Not found" />
				<h1 className="text-3xl font-bold">Page Not Found</h1>
				<Link href="/" className="btn btn-primary font-bold">
					Back to home
				</Link>
			</div>
		</div>
	);
}
