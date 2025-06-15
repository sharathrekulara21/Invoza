import React from 'react'

interface Props {
	invoice: invoice;
}

function PreviewFooter({invoice}: Props) {
  return (
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
	);
}

export default PreviewFooter