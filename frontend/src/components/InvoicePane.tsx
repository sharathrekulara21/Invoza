import { useState } from "react";
import type { Deliverable } from "../types/Invoice";
import { useInvoiceStore } from "@/store/invoiceStore";
import DatePickers from "./DatePickers";

export default function InvoicePane() {
	const { invoice, setInvoice, updateItem } = useInvoiceStore();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoice({ [name]: value });
	};

	const addItem = () => {
		const newItem: Deliverable = {
			id: crypto.randomUUID(),
			name: "",
			quantity: 1,
			price: 0,
		};
		setInvoice({
			items: [...invoice.items, newItem],
		});
	};

	const updateClientAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoice({
			clientAddress: {
				...invoice.clientAddress,
				[name]: value,
			},
		});
	};

	const updatebillerAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoice({
			billerAddress: {
				...invoice.billerAddress,
				[name]: value,
			},
		});
	};

	const calculateTotal = () => {
		const subtotal = invoice.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const discount = invoice.discount || 0;
		const advance = invoice.advancePaid || 0;
		return subtotal - discount - advance;
	};

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold mb-4'>Create Invoice</h1>

			<div className='flex flex-col space-y-5 md:flex-row md:space-x-4 items-start'>
				<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
					<h2 className='md:text-xl font-semibold text-violet-600'>
						Billed To
					</h2>
					<input
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						placeholder='Country'
						value={invoice.clientAddress.country}
						onChange={updateClientAddress}
					/>
					<input
						type='text'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						name='clientName'
						value={invoice.clientName}
						onChange={handleChange}
						placeholder='Client Name'
					/>
					<input
						type='text'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						name='clientCompany'
						value={invoice.clientCompany}
						onChange={handleChange}
						placeholder='Client company Name'
					/>
					<input
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						placeholder='Street'
						value={invoice.clientAddress.street}
						onChange={updateClientAddress}
					/>
					<div className='flex space-x-2'>
						<input
							className='border-b p-2 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
							placeholder='City'
							value={invoice.clientAddress.city}
							onChange={updateClientAddress}
						/>
						<input
							className='border-b p-2 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
							placeholder='Postal Code'
							value={invoice.clientAddress.postalCode}
							onChange={updateClientAddress}
						/>
					</div>
					<input
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						placeholder='State'
						value={invoice.clientAddress.state}
						onChange={updateClientAddress}
					/>

					<input
						name='clientMobile'
						value={invoice.clientMobile}
						onChange={handleChange}
						placeholder='Client Mobile'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
					/>
					<input
						name='clientEmail'
						value={invoice.clientEmail}
						onChange={handleChange}
						placeholder='Client Email'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
					/>
				</div>

				<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
					<h2 className='md:text-xl font-semibold text-violet-600'>
						Billed By
					</h2>
					<input
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						placeholder='Country'
						value={invoice.billerAddress.country}
						onChange={updatebillerAddress}
					/>
					<input
						type='text'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						name='billerName'
						value={invoice.billerName}
						onChange={handleChange}
						placeholder='Biller Name'
					/>
					<input
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						placeholder='Street'
						value={invoice.billerAddress.street}
						onChange={updatebillerAddress}
					/>
					<div className='flex space-x-2'>
						<input
							className='border-b p-2 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
							placeholder='City'
							value={invoice.billerAddress.city}
							onChange={updatebillerAddress}
						/>
						<input
							className='border-b p-2 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
							placeholder='Postal Code'
							value={invoice.billerAddress.postalCode}
							onChange={updatebillerAddress}
						/>
					</div>
					<input
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
						placeholder='State'
						value={invoice.billerAddress.state}
						onChange={updatebillerAddress}
					/>

					<input
						name='BillerMobile'
						value={invoice.billerMobile}
						onChange={handleChange}
						placeholder='Biller Mobile'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
					/>
					<input
						name='billerEmail'
						value={invoice.billerEmail}
						onChange={handleChange}
						placeholder='Biller Email'
						className='border-b p-2 border-gray-400 focus:border-gray-900 focus:outline-none'
					/>
				</div>

				<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
					<h1 className='md:text-xl font-semibold text-violet-600'>
						Invoice Details
					</h1>
					<div className='flex flex-row items-center justify-between'>
						<h2 className='text-sm font-semibold'>Invoice Number</h2>
						<input
							name='invoiceNumber'
							value={invoice.invoiceNumber}
							onChange={handleChange}
							placeholder='Invoice Number'
							className='border-b p-1 border-gray-400 focus:border-gray-900 focus:outline-none'
						/>
					</div>
					<div className='flex flex-row items-center justify-between'>
						<h2 className='text-sm font-semibold'>Issue Date</h2>
						<DatePickers label='Issue Date' dateKey='issueDate' />
					</div>
					<div className='flex flex-row items-center justify-between'>
						<h2 className='text-sm font-semibold'>Due Date</h2>
						<DatePickers label='Due Date' dateKey='dueDate' />
					</div>
				</div>
			</div>

			<hr className='my-4' />
			<h2 className='text-xl font-semibold mb-2'>Deliverables</h2>
			<div className='flex items-center border-b-2 border-b-gray-500 bg-gray-100 mb-2 font-semibold p-2 rounded-t'>
				<div className='flex-2/3 min-w-[100px] sm:min-w-[180px] md:min-w-[240px]'>
					Description
				</div>
				<div className='flex-1/3 text-center'>Quantity</div>
				<div className='flex-1/3 text-center'>Price</div>
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
					className='mb-4 bg-violet-600 hover:bg-violet-500 w-full transition-transform hover:scale-101 duration-300 ease-in-out text-white px-4 py-2 rounded'
				>
					Add Item
				</button>
			</div>

			<hr className='my-4' />
			<div className='mb-4'>
				<div className='flex items-center justify-between'>
					<h2 className='font-semibold'>Discount</h2>
					<input
						name='discount'
						className='border-b-2 border-gray-500 focus:outline-none text-end p-2 mr-2'
						placeholder='0'
						value={invoice.discount}
						onChange={handleChange}
					/>
				</div>
				<div className='flex items-center justify-between'>
					<h2 className='font-semibold'>Advance</h2>
					<input
						name='advancePaid'
						className='border-b-2 border-gray-500 focus:outline-none text-end p-2 mr-2'
						placeholder='0'
						value={invoice.advancePaid}
						onChange={handleChange}
					/>
				</div>
			</div>

			<hr />
			<div className='flex items-center justify-between'>
				<h2 className='text-lg font-semibold mt-4'>Total</h2>
				<h2 className='font-semibold text-2xl'>₹{calculateTotal()}</h2>
			</div>
		</div>
	);
}
