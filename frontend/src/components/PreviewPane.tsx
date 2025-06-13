import { useInvoiceStore } from "@/store/invoiceStore";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PrintablePreview from "./PrintablePreview";

export default function PreviewPane() {
	const { invoice } = useInvoiceStore();

	return (
		<div className='bg-[#C4D9FF] '>
			<PDFDownloadLink
				document={<PrintablePreview />}
				fileName='invoice.pdf'
				className='bg-blue-500 text-white px-4 py-2 rounded'
			>
				{({ loading }) => (loading ? "Preparing..." : "Download PDF")}
			</PDFDownloadLink>
			<div className='bg-[#FBFBFB] rounded-b-4xl p-4 mb-4'>
				<h2 className='text-2xl text-center font-bold'>Invoice Preview</h2>
			</div>
			<div className='px-4 pt-4'>
				<div className='flex space-y-4 flex-row space-x-4 justify-between items-start w-full '>
					{/*  Invoice details */}
					<div className='flex bg-[#FBFBFB] w-90 space-y-2 md:w-120 rounded-lg px-4 py-6 flex-col'>
						<h1 className='md:text-xl font-semibold text-violet-600'>
							Invoice Details
						</h1>
						<div className='flex flex-row space-x-4 items-center justify-between'>
							<h2 className='text-sm font-semibold text-gray-700'>
								Invoice Number
							</h2>
							<p className='text-md font-semibold'>{invoice.invoiceNumber}</p>
						</div>
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-sm font-semibold text-gray-700'>
								Issue Date
							</h2>
							<p className='text-md font-semibold'>
								{invoice.issueDate.substring(0, 10)}
							</p>
						</div>
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-sm font-semibold text-gray-700'>Due Date</h2>
							<p className='text-md font-semibold'>
								{invoice.dueDate.substring(0, 10)}
							</p>
						</div>
					</div>

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
					<div className='bg-[#FBFBFB] space-y-1 rounded-lg px-4 py-6 flex flex-col w-full'>
						<h2 className='md:text-xl font-semibold text-violet-600'>
							Billed To
						</h2>
						{invoice.clientAddress?.country?.trim() && (
							<p className='text-md font-semibold'>
								{invoice.clientAddress?.country}
							</p>
						)}
						{invoice.clientName?.trim() && (
							<p className='text-md font-semibold'>{invoice.clientName}</p>
						)}
						{invoice.clientAddress?.street?.trim() && (
							<p className='text-md font-semibold'>
								{invoice.clientAddress?.street}
							</p>
						)}
						<div className='flex space-x-2'>
							{invoice.clientAddress?.city?.trim() && (
								<p className='text-md font-semibold'>
									{invoice.clientAddress?.city}
								</p>
							)}
							{invoice.clientAddress?.postalCode?.trim() && (
								<p className='text-md font-semibold'>
									{invoice.clientAddress?.postalCode}
								</p>
							)}
						</div>
						{invoice.clientAddress?.state?.trim() && (
							<p className='text-md font-semibold'>
								{invoice.clientAddress?.state}
							</p>
						)}
						{invoice.clientMobile?.trim() && (
							<p className='text-md font-semibold'>{invoice.clientMobile}</p>
						)}
						{invoice.clientEmail?.trim() && (
							<p className='text-md font-semibold'>{invoice.clientEmail}</p>
						)}
					</div>

					{/* Billed By */}
					<div className='bg-[#FBFBFB] space-y-1 rounded-lg px-4 py-6 flex flex-col w-full'>
						<h2 className='md:text-xl font-semibold text-violet-600'>
							Billed By
						</h2>
						{invoice.billerAddress?.country?.trim() && (
							<p className='text-md font-semibold'>
								{invoice.billerAddress?.country}
							</p>
						)}
						{invoice.billerName?.trim() && (
							<p className='text-md font-semibold'>{invoice.billerName}</p>
						)}
						{invoice.billerAddress?.street?.trim() && (
							<p className='text-md font-semibold'>
								{invoice.billerAddress?.street}
							</p>
						)}

						<div className='flex space-x-2'>
							{invoice.billerAddress?.city?.trim() && (
								<p className='text-md font-semibold'>
									{invoice.billerAddress?.city}
								</p>
							)}
							{invoice.billerAddress?.postalCode?.trim() && (
								<p className='text-md font-semibold'>
									{invoice.billerAddress?.postalCode}
								</p>
							)}
						</div>
						{invoice.billerAddress?.state?.trim() && (
							<p className='text-md font-semibold'>
								{invoice.billerAddress?.state}
							</p>
						)}
						{invoice.billerMobile?.trim() && (
							<p className='text-md font-semibold'>{invoice.billerMobile}</p>
						)}
						{invoice.billerEmail?.trim() && (
							<p className='text-md font-semibold'>{invoice.billerEmail}</p>
						)}
					</div>
				</div>
			</div>

			<div className='bg-[#FBFBFB] rounded-t-4xl flex flex-col min-h-screen'>
				<div className='flex-1 px-8 pt-4'>
					<h2 className='text-xl text-violet-600 font-semibold mb-4'>
						Deliverables
					</h2>
					<div className='flex items-center border-b-2 text-gray-500 border-b-gray-500 bg-gray-100 mb-2 font-semibold p-2 rounded-t'>
						<div className='flex-2/3 min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'>
							Name
						</div>
						<div className='flex-1/3 text-center'>Quantity</div>
						<div className='flex-1/3 text-end'>Price</div>
					</div>
					<div>
						{invoice.items?.map((item, idx) => (
							<div
								key={item.id}
								className='mb-2 flex font-semibold bg-[#E8F9FF] items-center rounded-sm'
							>
								<p className='flex-2/3 p-2 py-3'>{item.name}</p>
								<p className='flex-1/3 p-2 py-3 text-center'>{item.quantity}</p>
								<p className='flex-1/3 p-2 py-3 text-end'>{item.price}</p>
							</div>
						))}
					</div>
					<div className='flex flex-col items-end justify-end mt-6'>
						{invoice.discount !== 0 && (
							<div className='flex gap-4 p-2 font-semibold'>
								<h2>Discount</h2>
								<h2>- {invoice.discount}</h2>
							</div>
						)}
						{invoice.advancePaid !== 0 && (
							<div className='flex gap-4 p-2 font-semibold'>
								<h2>Advance</h2>
								<h2>- {invoice.advancePaid}</h2>
							</div>
						)}
					</div>
					<hr className=' my-2 border-gray-900 border-1' />
					<div className='p-2 flex flex-col items-end justify-end bg-green-300 rounded'>
						{invoice.total && (
							<div className='flex gap-4 font-bold '>
								<h2>TOTAL</h2>
								<h2>{invoice.total}</h2>
							</div>
						)}
					</div>
				</div>

				<div className='flex flex-row justify-between items-center px-6 p-3 bg-gray-200 w-full rounded-t-4xl'>
					<img
						className='object-cover w-32 h-32"'
						src='Invoza_Logo_Design-removebg-preview.png'
						alt='logo'
					/>
					<div>
						<h1>Contact Details</h1>
						<p>{invoice.billerName}</p>
						<p>{invoice.billerMobile}</p>
						{invoice.billerEmail && <p>{invoice.billerEmail}</p>}
					</div>
					<div>
						<h1>Wiring Details</h1>
						<p>{invoice.billerName}</p>
						<p>Bank Name: HDFC bank</p>
						<p>Acc No: 0987654321</p>
					</div>
				</div>
			</div>
		</div>
	);
}
