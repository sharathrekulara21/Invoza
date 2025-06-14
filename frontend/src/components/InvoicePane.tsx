import type { Deliverable } from "../types/Invoice";
import { useInvoiceStore } from "@/store/invoiceStore";
import DatePickers from "./DatePickers";
import { BadgePercent, CloudUpload, HandCoins, MailPlus } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { CountryPicker } from "./CountryPicker";
import { StatePicker } from "./StatePicker";

export default function InvoicePane() {
	const { invoice, setInvoice, updateItem } = useInvoiceStore();
	const [fieldsEnabled, setFieldsEnabled] = useState({
		showDiscount: false,
		showAdvance: false,
		showclientEmail: false,
		showbillerEmail: false,
	});

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
				...invoice.clientAddress, // handles undefined safely
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
		const finalTotal = subtotal - discount - advance;
		return finalTotal;
	};

	useEffect(() => {
		const subtotal = invoice.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const discount = invoice.discount || 0;
		const advance = invoice.advancePaid || 0;
		const finalTotal = subtotal - discount - advance;
		setInvoice({ total: finalTotal });
		// eslint-disable-next-line
	}, [invoice.items, invoice.discount, invoice.advancePaid]);

	const handleSubmit = () => {
		const total = calculateTotal();

		const fullInvoice = {
			...invoice,
			total,
		};

		console.log(JSON.stringify(fullInvoice, null, 2));
	};

	return (
		<div className='p-6'>
			<h1 className='text-2xl font-bold text-center mb-4'>Create Invoice</h1>

			<div className='flex flex-col space-y-5 items-start'>
				<div className='flex space-y-4 flex-row space-x-4 justify-between items-start w-full '>
					<div className='flex bg-gray-200 w-90 space-y-2 md:w-120 rounded-lg px-4 py-6 flex-col'>
						<h1 className='md:text-xl font-semibold text-violet-600'>
							Invoice Details
						</h1>
						<div className='flex flex-row space-x-4 items-center justify-between'>
							<h2 className='text-sm font-semibold'>Invoice Number</h2>
							<input
								type='text'
								name='invoiceNumber'
								className='border-b p-2 border-gray-400 hover:border-violet-600 focus:border-gray-900 focus:outline-none'
								value={invoice.invoiceNumber}
								onChange={handleChange}
								placeholder='Invoice Number'
							/>
						</div>
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-sm font-semibold'>Issue Date</h2>
							<DatePickers label='Issue Date' dateKey='issueDate' />
						</div>
						<div className='flex flex-row items-center justify-between'>
							<h2 className='text-sm font-semibold'>Due Date</h2>
							<DatePickers
								label='Due Date'
								dateKey='dueDate'
								fromDate={
									invoice.issueDate ? new Date(invoice.issueDate) : undefined
								}
							/>
						</div>
					</div>
					<div className='flex border border-dashed hover:border-none rounded-sm w-72 h-52 items-center justify-center'>
						<label
							htmlFor='logoUpload'
							className='group flex flex-col rounded-sm items-center hover:bg-gray-300 transition-colors duration-200 justify-center cursor-pointer w-full h-full'
						>
							<CloudUpload className='w-10 text-violet-600 group-hover:text-violet-700 h-10 transition-colors duration-200' />
							<h2 className='text-gray-400 font-semibold text-sm group-hover:text-gray-500 transition-colors duration-200'>
								Upload Your logo
							</h2>
							<input
								type='file'
								name='logo'
								id='logoUpload'
								className='hidden'
								accept='image/*'
							/>
						</label>
					</div>
				</div>
				<div className='flex flex-col space-y-4 md:flex-row md:space-x-4 items-start w-full'>
					<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
						<h2 className='md:text-xl font-semibold text-violet-600'>
							Billed To
						</h2>
						<CountryPicker type='client' />
						<input
							type='text'
							className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
							name='clientName'
							value={invoice.clientName}
							onChange={handleChange}
							placeholder='Client Name/ Business Name'
						/>
						<input
							className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
							placeholder='Street'
							name='street'
							value={invoice.clientAddress?.street}
							onChange={updateClientAddress}
						/>
						<div className='flex space-x-2'>
							<input
								className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
								placeholder='City'
								name='city'
								value={invoice.clientAddress?.city}
								onChange={updateClientAddress}
							/>
							<input
								className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
								placeholder='Postal Code'
								name='postalCode'
								value={invoice.clientAddress?.postalCode}
								onChange={updateClientAddress}
							/>
						</div>
						<StatePicker
							type='client'
							country={invoice.clientAddress?.country}
						/>

						<input
							name='clientMobile'
							value={invoice.clientMobile}
							onChange={handleChange}
							placeholder='Client Mobile'
							className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
						/>
						{fieldsEnabled.showclientEmail ? (
							<input
								name='clientEmail'
								value={invoice.clientEmail}
								onChange={handleChange}
								placeholder='Client Email'
								className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
							/>
						) : (
							""
						)}
						<div className='flex space-x-2'>
							{fieldsEnabled.showclientEmail ? (
								""
							) : (
								<div
									className='group flex p-2 space-x-2 items-center cursor-pointer'
									onClick={() =>
										setFieldsEnabled((prev) => ({
											...prev,
											showclientEmail: true,
										}))
									}
								>
									<MailPlus className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
									<p className='text-sm text-gray-500 group-hover:text-violet-400 transition-colors duration-300 font-semibold'>
										Add Email
									</p>
								</div>
							)}
						</div>
					</div>

					<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
						<h2 className='md:text-xl font-semibold text-violet-600'>
							Billed By
						</h2>
						<CountryPicker type='biller' />
						<input
							type='text'
							className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
							name='billerName'
							value={invoice.billerName}
							onChange={handleChange}
							placeholder='Biller Name/ Business Name'
						/>
						<input
							className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
							placeholder='Street'
							name='street'
							value={invoice.billerAddress?.street}
							onChange={updatebillerAddress}
						/>
						<div className='flex space-x-2'>
							<input
								className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
								placeholder='City'
								name='city'
								value={invoice.billerAddress?.city}
								onChange={updatebillerAddress}
							/>
							<input
								className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
								placeholder='Postal Code'
								name='postalCode'
								value={invoice.billerAddress?.postalCode}
								onChange={updatebillerAddress}
							/>
						</div>
						<StatePicker
							type='biller'
							country={invoice.billerAddress?.country}
						/>
						<input
							name='billerMobile'
							value={invoice.billerMobile}
							onChange={handleChange}
							placeholder='Biller Mobile'
							className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
						/>
						{fieldsEnabled.showbillerEmail ? (
							<input
								name='billerEmail'
								value={invoice.billerEmail}
								onChange={handleChange}
								placeholder='Biller Email'
								className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
							/>
						) : (
							""
						)}
						<div className='flex space-x-2'>
							{fieldsEnabled.showbillerEmail ? (
								""
							) : (
								<div
									className='group flex p-2 space-x-2 items-center cursor-pointer'
									onClick={() =>
										setFieldsEnabled((prev) => ({
											...prev,
											showbillerEmail: true,
										}))
									}
								>
									<MailPlus className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
									<p className='text-sm text-gray-500 group-hover:text-violet-400 transition-colors duration-300 font-semibold'>
										Add Email
									</p>
								</div>
							)}
						</div>
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
					className='mb-4 bg-violet-600 hover:bg-violet-700 w-full transition-colors duration-300 ease-in text-white px-4 py-2 rounded'
				>
					Add Item
				</button>
			</div>

			<hr className='my-4' />
			<div className='mb-4'>
				{fieldsEnabled.showDiscount ? (
					<div className='flex items-center justify-between'>
						<h2 className='font-semibold'>Discount</h2>
						<input
							name='discount'
							className='border-b-2 border-gray-500 hover:border-violet-400 focus:outline-none text-end p-2 mr-2'
							placeholder='0'
							value={invoice.discount}
							onChange={handleChange}
						/>
					</div>
				) : (
					<div
						className='group flex p-2 space-x-2 items-center cursor-pointer'
						onClick={() =>
							setFieldsEnabled((prev) => ({
								...prev,
								showDiscount: true,
							}))
						}
					>
						<BadgePercent className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
						<p className='text-sm text-gray-500 group-hover:text-violet-400 transition-colors duration-300 font-semibold'>
							Add Discount
						</p>
					</div>
				)}
				{fieldsEnabled.showAdvance ? (
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
				) : (
					<div
						className='group flex p-2 space-x-2 items-center cursor-pointer '
						onClick={() =>
							setFieldsEnabled((prev) => ({
								...prev,
								showAdvance: true,
							}))
						}
					>
						<HandCoins className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
						<p className='text-sm group-hover:text-violet-400 transition-colors duration-300 text-gray-500 font-semibold'>
							Add Advance
						</p>
					</div>
				)}
			</div>

			<hr />
			<div className='flex items-center justify-between'>
				<h2 className='text-lg font-semibold mt-4'>Total</h2>
				<h2 className='font-semibold text-2xl'>₹{calculateTotal()}</h2>
			</div>
			<div className='text-center mt-10'>
				<Button
					className='bg-violet-600 hover:bg-violet-600 hover:scale-105 '
					onClick={handleSubmit}
				>
					Prepare invoice
				</Button>
			</div>
		</div>
	);
}
