import React from "react";

type Props = { invoice: invoice };

function PreviewDates({ invoice }: Props) {
	return (
		<div className='flex bg-[#FBFBFB] w-90 space-y-2 md:w-120 rounded-lg px-4 py-6 flex-col'>
			<h1 className='md:text-xl font-semibold text-violet-600'>
				Invoice Details
			</h1>
			<div className='flex flex-row space-x-4 items-center justify-between'>
				<h2 className='text-sm font-semibold text-gray-700'>Invoice Number</h2>
				<p className='text-md font-semibold'>{invoice.invoiceNumber}</p>
			</div>
			<div className='flex flex-row items-center justify-between'>
				<h2 className='text-sm font-semibold text-gray-700'>Issue Date</h2>
				<p className='text-md font-semibold'>
					{invoice.issueDate.substring(0, 10)}
				</p>
			</div>
			<div className='flex flex-row items-center justify-between'>
				<h2 className='text-sm font-semibold text-gray-700'>Due Date</h2>
				<p className='text-md font-semibold'>{invoice.dueDate}</p>
			</div>
		</div>
	);
}

export default PreviewDates;
