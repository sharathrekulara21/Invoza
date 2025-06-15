import React from "react";

type Props = {
	invoice: invoice;
};

const PreviewDeliverables = ({ invoice }: Props) => {
	return (
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
	);
};

export default PreviewDeliverables;
