import { useInvoiceStore } from "@/store/invoiceStore";
import PreviewFooter from "../components/previewPane/PreviewFooter";
import PreviewDeliverables from "../components/previewPane/PreviewDeliverables";
import PreviewBilledBy from "../components/previewPane/PreviewBilledBy";
import PreviewBilledTo from "../components/previewPane/PreviewBilledTo";
import PreviewDates from "../components/previewPane/PreviewDates";

export default function PreviewPane() {
	const { invoice } = useInvoiceStore();

	return (
		<div className='bg-[#C4D9FF] '>
			<div className='bg-[#FBFBFB] rounded-b-4xl p-4 mb-4'>
				<h2 className='text-2xl text-center font-bold'>Invoice Preview</h2>
			</div>
			<div className='px-4 pt-4'>
				<div className='flex space-y-4 flex-row space-x-4 justify-between items-start w-full '>
					{/*  Invoice details */}
					<PreviewDates invoice={invoice} />
					{/* Logo */}
					<div className='flex relative" rounded-sm w-41 h-41'>
						<img
							className='object-cover h-full w-full"'
							src='Invoza_Logo_Design-removebg-preview.png'
							alt='logo'
						/>
					</div>
				</div>
				<div className='flex flex-col space-y-4 my-3 md:flex-row md:space-x-4 items-start w-full'>
					{/* Billed To */}
					<PreviewBilledTo invoice={invoice} />

					{/* Billed By */}
					<PreviewBilledBy invoice={invoice} />
				</div>
			</div>

			<div className='bg-[#FBFBFB] rounded-t-4xl flex flex-col min-h-screen'>
				<PreviewDeliverables invoice={invoice} />

				<PreviewFooter invoice={invoice} />
			</div>
		</div>
	);
}
