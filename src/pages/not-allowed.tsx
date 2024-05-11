import React from 'react';
import notFound from '../assets/images/404-not-found.png';
import Link from 'next/link';
import Image from 'next/image';
import PHUButton from '@/ui/PHUButton';

export default function NotFound() {
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<div style={{ textAlign: 'center' }}>
				<Image
					src={notFound}
					width={450}
					height={450}
					alt="Not found"
				/>
				<h1 style={{ marginBottom: '10px' }}>Page Not Found</h1>
				<PHUButton size='large'>
					<Link href="/">
						Back to Home
					</Link>
				</PHUButton>
			</div>
		</div>
	);
}
