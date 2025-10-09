import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import { Fragment, useState } from "react";
import ScanMeModal from "@/components/ScanMe";
import { Analytics } from "@vercel/analytics/react";
import FeedbackForm from "@/components/FeedbackForm";
import FloatButton from "@/components/FloatingButton";
import LightningBackground from "@/components/WaveBackground";

const Root = () => {
	const [isModalOpen, setIsModalOpen] = useState({
		qrScan: false,
		feedback: false,
	});

	return (
		<Fragment>
			<LightningBackground />
			<Header
				modalState={{
					setQrScan: null,
					setFeedback: (open: boolean) =>
						setIsModalOpen((prev) => ({ ...prev, feedback: open })),
				}}
			/>
			<Analytics />
			<Outlet />
			<Footer />
			<FeedbackForm
				modalState={isModalOpen}
				feedback={(open: boolean) =>
					setIsModalOpen((prev) => ({ ...prev, feedback: open }))
				}
			/>
			<ScanMeModal
				modalState={isModalOpen}
				setQrScan={(open: boolean) =>
					setIsModalOpen((prev) => ({ ...prev, qrScan: open }))
				}
			/>

			<FloatButton
				modalState={{
					setQrScan: (open: boolean) =>
						setIsModalOpen((prev) => ({ ...prev, qrScan: open })),
					setFeedback: (open: boolean) =>
						setIsModalOpen((prev) => ({ ...prev, feedback: open })),
				}}
			/>
		
		</Fragment>
	);
};

export default Root;
