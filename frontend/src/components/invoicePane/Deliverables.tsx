import { CircleX } from "lucide-react";

type Props = {
	invoice: invoice;
	addItem: addItem;
	removeItem: removeItem;
	updateItem: updateItem;
};

function Deliverables({ invoice, addItem, updateItem, removeItem }: Props) {
	return (
		<div className='pr-6'>
			<h2 className='text-xl font-semibold mb-2'>Deliverables</h2>
			<table className='table-auto w-full border-separate border-spacing-y-2'>
				<thead>
					<tr className='bg-gray-100 font-semibold rounded-t'>
						<th className='p-2 text-left min-w-[100px] sm:min-w-[180px] md:min-w-[240px] rounded-tl'>
							Name
						</th>
						<th className='p-2 text-center'>Quantity</th>
						<th className='p-2 text-start'>Price</th>
						<th className='p-2 text-center rounded-tr'>Action</th>
					</tr>
				</thead>
				<tbody>
					{invoice.items.map((item, idx) => (
						<tr key={item.id} className='bg-gray-100'>
							<td className='p-2 min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'>
								<input
									required
									className='w-full p-2 rounded focus:outline-none'
									placeholder='Name'
									value={item.name}
									onChange={(e) => updateItem(idx, "name", e.target.value)}
								/>
							</td>
							<td className='p-2 text-center'>
								<input
									type='number'
									required
									min={1}
									placeholder='Quantity'
									onWheel={(e) => e.currentTarget.blur()}
									className='w-full p-2 rounded text-center focus:outline-none'
									value={item.quantity}
									onChange={(e) => updateItem(idx, "quantity", +e.target.value)}
								/>
							</td>
							<td className='p-2 text-start'>
								<div className='flex items-center justify-start'>
									<span>{invoice.currency}</span>
									<input
										type='number'
										required
										placeholder='0'
										onWheel={(e) => e.currentTarget.blur()}
										className='p-2 rounded text-start focus:outline-none'
										value={item.price === 0 ? "" : item.price}
										onChange={(e) => {
											const val = +e.target.value;
											updateItem(idx, "price", val);
										}}
									/>
								</div>
							</td>
							<td className='px-2 py-2 text-center'>
								<button
									type='button'
									onClick={() => {
										removeItem(idx);
									}}
									className='flex justify-center items-center mx-auto'
								>
									<CircleX className='w-6 h-6 hover:text-red-400 transition-colors duration-150 cursor-pointer' />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button
				onClick={addItem}
				className='mt-4 border-gray-900 border hover:bg-violet-400 hover:border-none w-full transition-colors duration-200 text-gray-900 font-semibold cursor-pointer hover:text-white px-4 py-2 rounded'
			>
				Add Item
			</button>
			{/* <h2 className='text-xl font-semibold mb-2'>Deliverables</h2> */}
			{/* <div className='flex items-center border-b-2 border-b-gray-500 bg-gray-100 mb-2 font-semibold p-2 rounded-t'>
				<div className='flex-[2] min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'>
					Name
				</div>
				<div className='flex-1 text-center '>Quantity</div>
				<div className='flex-1 text-center'>Price</div>
				<div className='flex-1 text-end '>Action</div>
			</div>
			<div>
				{invoice.items.map((item, idx) => (
					<div
						key={item.id}
						className='mb-2 flex bg-gray-300 items-center rounded-sm max-w-full'
					>
						<input
							className='p-2 flex-[2] border focus:outline-none min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'
							placeholder='Name'
							value={item.name}
							onChange={(e) => updateItem(idx, "name", e.target.value)}
						/>
						<input
							className='flex-1 p-2 border text-center focus:outline-none'
							placeholder='Qty'
							value={item.quantity}
							onChange={(e) => updateItem(idx, "quantity", +e.target.value)}
						/>
						<input
							className='flex-1 p-2 border text-center focus:outline-none'
							placeholder='Price'
							value={item.price}
							onChange={(e) => updateItem(idx, "price", +e.target.value)}
						/>
						<div className='flex-1 flex justify-center items-center text-center'>
							<CircleX className='w-10  hover:text-red-400 transition-colors duration-150 cursor-pointer' />
						</div>
					</div>
				))}
				<button
					onClick={addItem}
					className='mb-4 border-gray-900 border hover:bg-violet-400 hover:border-none w-full transition-colors duration-200 text-gray-900 font-semibold cursor-pointer hover:text-white px-4 py-2 rounded'
				>
					Add Item
				</button>
			</div> */}
		</div>
	);
}

export default Deliverables;
