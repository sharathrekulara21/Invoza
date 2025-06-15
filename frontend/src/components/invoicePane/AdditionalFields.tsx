import { BadgePercent, HandCoins } from "lucide-react";
import React from "react";

type Props = {
	invoice: invoice;
	fieldsEnabled: fieldsEnabled;
	handleChange: handleChange;
	setFieldsEnabled: setFieldsEnabled;
};

function AdditionalFields({
	invoice,
	fieldsEnabled,
	handleChange,
	setFieldsEnabled,
}: Props) {
	return (
		<>
			<div className='mb-4'>
				{fieldsEnabled.showDiscount ? (
					<div className='flex items-center gap-4 justify-end'>
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
					<div className='flex items-center gap-4 justify-end'>
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
		</>
	);
}

export default AdditionalFields;
