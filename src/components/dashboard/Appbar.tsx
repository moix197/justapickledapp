import { useEffect, useState } from "react";
import { LogoBg } from "components/brand/Logo";
import { useRouter } from "next/router";
import SigninUsers from "components/auth/SignInUsers";
import Link from "next/link";
import {
	Bars4Icon,
	ChartBarIcon,
	ChevronRightIcon,
	HomeIcon,
	PresentationChartLineIcon,
	UsersIcon,
} from "@heroicons/react/24/outline";
import { WalletIcon } from "@solana/wallet-adapter-react-ui";

function AppBar({ shareValue = (item) => {} }) {
	const router = useRouter();
	const [isOpen, setIsOpen] = useState(false);

	const menuItems = [
		{
			name: "dashboard Home",
			link: "/dashboard/home",
			icon: <HomeIcon />,
		},
		{
			name: "Vaults",
			link: "/dashboard/vaults",
			icon: (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-8 h-8"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
					/>
				</svg>
			),
		},
		{
			name: "Token Sales",
			link: "/dashboard/sales",
			icon: <PresentationChartLineIcon />,
		},
		/*{
			name: "Airdrops",
			link: "/dashboard/airdrops",
			icon: <ChartBarIcon />,
		},

		{
			name: "Teams",
			link: "/dashboard/teams",
			icon: <UsersIcon></UsersIcon>,
		},*/
	];

	return (
		<div
			className={`w-full md:w-auto fixed top-0 left-0 z-10 ${
				!isOpen && "-left-full md:-left-[21rem]"
			} transition-all`}
		>
			<SigninUsers></SigninUsers>
			<div
				className={`md:w-[400px] bg-primary border-right border-fourth z-20 h-[100vh] border-r`}
			>
				<div
					onClick={() => {
						setIsOpen(!isOpen);
						shareValue(!isOpen);
					}}
					className={`absolute right-3 md:-right-4 bottom-3 bg-fourth border border-primary p-2 rounded-full transition-transform rotate-180 cursor-pointer ${
						!isOpen && "rotate-0 md:-right-[3.5rem] -right-[3.5rem]"
					}`}
				>
					<div>
						{isOpen ? (
							<ChevronRightIcon className="w-6 h-6"></ChevronRightIcon>
						) : (
							<Bars4Icon className="w-6 h-6"></Bars4Icon>
						)}
					</div>
				</div>
				<div className={`p-4 transition-all ${!isOpen && "pr-0"}`}>
					<div className="flex items-center mb-4">
						<LogoBg
							className={`transition-transform ${
								!isOpen && "transition-transform md:translate-x-[330px]"
							}`}
							alt="dashboard_logo"
							width={40}
							height={40}
						></LogoBg>
						<div
							className={`ml-2 text-lg uppercase font-bold text-yellow-600 hidden md:block ${
								!isOpen && "opacity-0"
							}`}
						>
							<div>Welcome to your dashboard</div>
						</div>
					</div>
					<div className="w-full">
						<ul className="w-full">
							{menuItems.map((item) => (
								<li
									key={`${item.name.split(" ").join("_")}_menu`}
									className="w-full"
								>
									<Link href={item.link}>
										{
											<div
												className={`p-4 border-b border-gray-800 hover:bg-gray-700 flex justify-between items-center uppercase ${
													router.route.split("/")[2] ==
														item.link.split("/")[2] &&
													`bg-third hover:bg-third text-primary font-bold`
												}`}
											>
												<div>{item.name}</div>
												<div className="w-8 h-8">{item.icon}</div>
											</div>
										}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default AppBar;
