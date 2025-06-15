import React from 'react'

type Props = {
    invoice:invoice
}

function PreviewBilledBy({invoice}: Props) {
  return (
		<div className='bg-[#FBFBFB] space-y-1 rounded-lg px-4 py-6 flex flex-col w-full'>
			<h2 className='md:text-xl font-semibold text-violet-600'>Billed By</h2>
			{invoice.billerAddress?.country?.name.trim() && (
				<p className='text-md font-semibold'>
					{invoice.billerAddress?.country.name}
				</p>
			)}
			{invoice.billerName?.trim() && (
				<p className='text-md font-semibold'>{invoice.billerName}</p>
			)}
			{invoice.billerAddress?.street?.trim() && (
				<p className='text-md font-semibold'>{invoice.billerAddress?.street}</p>
			)}

			<div className='flex space-x-2'>
				{invoice.billerAddress?.city?.trim() && (
					<p className='text-md font-semibold'>{invoice.billerAddress?.city}</p>
				)}
				{invoice.billerAddress?.postalCode?.trim() && (
					<p className='text-md font-semibold'>
						{invoice.billerAddress?.postalCode}
					</p>
				)}
			</div>
			{invoice.billerAddress?.state?.trim() && (
				<p className='text-md font-semibold'>{invoice.billerAddress?.state}</p>
			)}
			{invoice.billerMobile?.trim() && (
				<p className='text-md font-semibold'>{invoice.billerMobile}</p>
			)}
			{invoice.billerEmail?.trim() && (
				<p className='text-md font-semibold'>{invoice.billerEmail}</p>
			)}
		</div>
	);
}

export default PreviewBilledBy