import React from 'react'

type Props = {invoice:invoice}

function PreviewBilledTo({invoice}: Props) {
  return (
		<div className='bg-[#FBFBFB] space-y-1 rounded-lg px-4 py-6 flex flex-col w-full'>
			<h2 className='md:text-xl font-semibold text-violet-600'>Billed To</h2>
			{invoice.clientAddress?.country?.name.trim() && (
				<p className='text-md font-semibold'>
					{invoice.clientAddress?.country.name}
				</p>
			)}
			{invoice.clientName?.trim() && (
				<p className='text-md font-semibold'>{invoice.clientName}</p>
			)}
			{invoice.clientAddress?.street?.trim() && (
				<p className='text-md font-semibold'>{invoice.clientAddress?.street}</p>
			)}
			<div className='flex space-x-2'>
				{invoice.clientAddress?.city?.trim() && (
					<p className='text-md font-semibold'>{invoice.clientAddress?.city}</p>
				)}
				{invoice.clientAddress?.postalCode?.trim() && (
					<p className='text-md font-semibold'>
						{invoice.clientAddress?.postalCode}
					</p>
				)}
			</div>
			{invoice.clientAddress?.state?.trim() && (
				<p className='text-md font-semibold'>{invoice.clientAddress?.state}</p>
			)}
			{invoice.clientMobile?.trim() && (
				<p className='text-md font-semibold'>{invoice.clientMobile}</p>
			)}
			{invoice.clientEmail?.trim() && (
				<p className='text-md font-semibold'>{invoice.clientEmail}</p>
			)}
		</div>
	);
}

export default PreviewBilledTo