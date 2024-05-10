
import React, {
	useState,
} from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
	const [nav, setNav] = useState(false);
	const router = useRouter();

	const goToGenerateCode = () => {
		router.push('/generate-qr-code');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};

	const goToHome = () => {
		router.push('/');
		setTimeout(() => {
			setNav(!nav);
		}, 1500);
	};


	// Function to hide nav on resize
	const handleResize = () => {
		if (window.innerWidth >= 768) {
			// Assuming 768px is your md breakpoint
			setNav(false);
		}
	};

	// Set up event listener for window resize
	useEffect(() => {
		window.addEventListener('resize', handleResize);

		// Clean up the event listener
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const activeStyle =
		'bg-[#fff] rounded-md text-[#525151] font-bold text-lg mr-4 hover:bg-[#fff] underline underline-offset-2 hover:text-[#02533C]';
	const inactiveStyle =
		'bg-[#fff] rounded-md text-[#525151] font-normal hover:font-bold text-lg mr-4 hover:bg-[#fff] hover:underline hover:underline-offset-2 hover:text-[#02533C]';

	return (
		<div
			className="flex w-full pl-4 items-center py-2 lg:justify-start shadow-md fixed top-0 z-50 bg-white"
			nav="true"
		>
			<div className="flex w-full max-w-7xl mx-auto items-center justify-between px-0">
				<ul className="hidden md:flex items-center gap-4">
					<li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-105 hover:text-white duration-200 link-underline">
						<Link href="/">
							<Image
								src={'/.jpg'}
								width={120}
								height={200}
								alt="Morfi"
							/>
						</Link>
					</li>
					<div>
						<button
							onClick={() => router.push('/')}
							className={
								router.pathname === '/'
									? activeStyle
									: inactiveStyle
							}
						>
							HOME
						</button>
					</div>
					<div>
						<button
							onClick={() => router.push('/generate-qr-code')}
							className={
								router.pathname === '/generate-qr-code'
									? activeStyle
									: inactiveStyle
							}
						>
							GENERATE QRCODE
						</button>
					</div>
				</ul>
				<div className="flex flex-row">
					<div
						onClick={() => setNav(!nav)}
						className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
					>
						{nav ? (
							<div className="z-20">
								<FaTimes className="z-20" size={30} />
							</div>
						) : (
							<div className="flex flex-col items-center">
								<FaBars size={30} />
								<p>Menu</p>
							</div>
						)}
					</div>
					{nav && (
						<div className="justify-start items-start flex flex-col gap-4">
							<ul className="flex divide-y flex-col justify-start pt-7 z-10 items-start px-5 bg-white absolute top-0 left-0 shadow-lg min-h-screen w-56 text-gray-500">
								<div
									className="z-20 flex items-start mb-7"
									onClick={() => setNav(!nav)}
								>
									<FaTimes className="z-20" size={30} />
								</div>
								<div>
									<button
										onClick={goToHome}
										className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
									>
										HOME
									</button>
								</div>

								<div>
									<button
										onClick={goToGenerateCode}
										className="bg-[#fff] m-2 w-30 px-2 py-2 rounded-md text-[#02533C] font-bold text-md hover:underline hover:text-[#02533C] margin-top: 1em"
									>
										GENERATE QRCODE
									</button>
								</div>
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
