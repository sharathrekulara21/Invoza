import { MailPlus } from "lucide-react";
import React from "react";
import { StatePicker } from "../../utils/StatePicker";
import { CountryPicker } from "../../utils/CountryPicker";

type Props = {
	invoice: invoice;
	handleChange: handleChange;
	fieldsEnabled: fieldsEnabled;
	setFieldsEnabled: setFieldsEnabled;
	setInvoice: setInvoice;
};

function BilledBy({
	invoice,
	handleChange,
	fieldsEnabled,
	setFieldsEnabled,
	setInvoice,
}: Props) {
	const updatebillerAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoice({
			billerAddress: {
				...invoice.billerAddress,
				[name]: value,
			},
		});
	};

	return (
		<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
			<h2 className='md:text-xl font-semibold text-violet-600'>Billed By</h2>
			<input
				type='text'
				className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
				name='billerName'
				value={invoice.billerName}
				onChange={handleChange}
				required
				placeholder='Biller Name/ Business Name'
			/>
			<input
				className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
				placeholder='Street (optional)'
				name='street'
				value={invoice.billerAddress?.street}
				onChange={updatebillerAddress}
			/>
			<div className='flex space-x-2'>
				<input
					className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
					placeholder='City (optional)'
					name='city'
					value={invoice.billerAddress?.city}
					onChange={updatebillerAddress}
				/>
				<input
					className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 w-full focus:outline-none'
					placeholder='Postal Code (optional)'
					name='postalCode'
					value={invoice.billerAddress?.postalCode}
					onChange={updatebillerAddress}
				/>
			</div>
			<CountryPicker type='biller' />
			<StatePicker type='biller' country={invoice.billerAddress?.country} />
			<input
				name='billerMobile'
				value={invoice.billerMobile}
				onChange={handleChange}
				required
				placeholder='Biller Mobile'
				className='border-b p-2 hover:border-violet-600 border-gray-400 focus:border-gray-900 focus:outline-none'
			/>
			{fieldsEnabled.showbillerEmail ? (
				<input
					name='billerEmail'
					value={invoice.billerEmail}
					onChange={handleChange}
					placeholder='Biller Email (optional)'
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
	);
}

export default BilledBy;
