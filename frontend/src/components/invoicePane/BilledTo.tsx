import React from "react";
import { CountryPicker } from "../../utils/CountryPicker";
import { MailPlus } from "lucide-react";
import { StatePicker } from "../../utils/StatePicker";

type Props = {
	invoice: invoice;
	handleChange: handleChange;
	fieldsEnabled: fieldsEnabled;
	setFieldsEnabled: setFieldsEnabled;
	setInvoice: setInvoice;
};

function BilledTo({
	invoice,
	handleChange,
	fieldsEnabled,
	setFieldsEnabled,
	setInvoice,
}: Props) {
	const updateClientAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoice({
			clientAddress: {
				...invoice.clientAddress, // handles undefined safely
				[name]: value,
			},
		});
	};

	return (
		<div className='bg-gray-200 space-y-2 rounded-lg px-4 py-6 flex flex-col w-full'>
			<h2 className='md:text-xl font-semibold text-violet-600'>Billed To</h2>
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
			<StatePicker type='client' country={invoice.clientAddress?.country} />

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
	);
}

export default BilledTo;
