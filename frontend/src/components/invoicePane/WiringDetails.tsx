import React from "react";

type Props = {};

function WiringDetails({ invoice, handleChange }: Props) {
	return (
		<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
			<h2 className='md:text-xl font-semibold text-violet-600'>
				WiringDetails
			</h2>
			<div className='flex flex-row space-x-4 items-center justify-between'>
				<h2 className='text-sm font-semibold'>Account Holder Name</h2>
				<input
					type='text'
					className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
					name='holderName'
					value={invoice.holderName}
					onChange={handleChange}
					placeholder='Account Holder Name'
				/>
			</div>
			<div className='flex flex-row space-x-4 items-center justify-between'>
				<h2 className='text-sm font-semibold'>Bank Name</h2>
				<input
					type='text'
					className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
					name='bankName'
					value={invoice.bankName}
					onChange={handleChange}
					placeholder='Bank Name'
				/>
			</div>

			<div className='flex flex-row space-x-4 items-center justify-between'>
				<h2 className='text-sm font-semibold'>Account Number</h2>
				<input
					type='text'
					className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
					name='accountNumber'
					value={invoice.accountNumber}
					onChange={handleChange}
					placeholder='Account number'
				/>
			</div>
		</div>
	);
}

export default WiringDetails;
