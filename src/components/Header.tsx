import Logo from "@/components/Logo";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { topup } from "@/lib/utils";
import { House } from "lucide-react";

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();

	const navigateTopup = () => {
		navigate("/topup");
	};

	const navigateHome = () => {
		navigate("/");
	};

	const currentPath = location.pathname;
	const homePath = "/";

	return (
		<header className="w-full mx-auto py-5 bg-white shadow-sm flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
			<Link to="/" className="flex items-center gap-2">
				<Logo />
			</Link>

			{currentPath === homePath ? (
				<Button
					type="button"
					className="py-3 px-4 text-lg bg-gray-500 hover:bg-gray-500/90 transition-all duration-300 hover:shadow-lg"
					onClick={navigateTopup}
				>
					{topup}
				</Button>
			) : (
				<button
					type="button"
					className="rounded-full shadow-l bg-none"
					onClick={navigateHome}
				>
					<House className="h-8 w-8 text-blue-900 " />
				</button>

				// <House onClick={navigateHome} />
			)}
		</header>
	);
}
