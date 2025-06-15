import React from "react";

type Props = {
	invoice: invoice;
	addItem: addItem;
	updateItem: updateItem;
};

function Deliverables({ invoice, addItem, updateItem }: Props) {
	return (
		<>
			<h2 className='text-xl font-semibold mb-2'>Deliverables</h2>
			<div className='flex items-center border-b-2 border-b-gray-500 bg-gray-100 mb-2 font-semibold p-2 rounded-t'>
				<div className='flex-2/3 min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'>
					Name
				</div>
				<div className='flex-1/3 text-center'>Quantity</div>
				<div className='flex-1/3 text-end'>Price</div>
			</div>
			<div>
				{invoice.items.map((item, idx) => (
					<div
						key={item.id}
						className='mb-2 flex bg-gray-300 items-center rounded-sm'
					>
						<input
							className='p-2 flex-2/3 border focus:outline-none min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'
							placeholder='Name'
							value={item.name}
							onChange={(e) => updateItem(idx, "name", e.target.value)}
						/>
						<input
							className='flex-1/3 p-2 border text-center focus:outline-none'
							placeholder='Qty'
							value={item.quantity}
							onChange={(e) => updateItem(idx, "quantity", +e.target.value)}
						/>
						<input
							className='flex-1/3 p-2 text-center focus:outline-none'
							placeholder='Price'
							value={item.price}
							onChange={(e) => updateItem(idx, "price", +e.target.value)}
						/>
					</div>
				))}
				<button
					onClick={addItem}
					className='mb-4 bg-violet-600 hover:bg-violet-700 w-full transition-colors duration-300 ease-in text-white px-4 py-2 rounded'
				>
					Add Item
				</button>
			</div>
		</>
	);
}

export default Deliverables;
