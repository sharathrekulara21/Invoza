import { BadgePercent, HandCoins, Handshake, NotebookPen, Trash2 } from "lucide-react";
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
					<div className='flex items-center gap-4 justify-between'>
						<div className='flex space-x-2 p-2'>
							<BadgePercent className='w-5' />
							<h2 className='font-semibold text-gray-500'>Advance</h2>
						</div>
						<div className='flex space-x-1 items-center'>
							<input
								name='advancePaid'
								className='border rounded-sm border-gray-500 focus:outline-none text-end p-2 mr-2'
								placeholder='Advance'
								value={invoice.advancePaid}
								onChange={handleChange}
							/>
							{/* <Trash2 className='w-5 hover:text-red-500 cursor-pointer transition-colors duration-300' onClick={()=>{setFieldsEnabled({})}} /> */}
						</div>
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
				{fieldsEnabled.showAddNote ? (
					<div className='flex flex-col gap-4'>
						<h2 className='text-sm font-medium text-gray-900'>Add Note</h2>
						<textarea
							name='note'
							rows={3}
							className='border-1 rounded-sm border-gray-500 focus:outline-none text-base p-2 mr-2'
							placeholder='Add a note here..'
							value={invoice.note}
							onChange={handleChange}
						/>
					</div>
				) : (
					<div
						className='group flex p-2 space-x-2 items-center cursor-pointer '
						onClick={() =>
							setFieldsEnabled((prev) => ({
								...prev,
								showAddNote: true,
							}))
						}
					>
						<NotebookPen className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
						<p className='text-sm group-hover:text-violet-400 transition-colors duration-300 text-gray-500 font-semibold'>
							Add Note
						</p>
					</div>
				)}
				{fieldsEnabled.showTerms ? (
					<div className='flex flex-col gap-4'>
						<h2 className='text-sm font-medium text-gray-900'>
							Add Terms and Conditions
						</h2>
						<textarea
							name='terms'
							rows={3}
							className='border-1 rounded-sm border-gray-500 focus:outline-none text-base p-2 mr-2'
							placeholder='Add terms and conditions here..'
							value={invoice.terms}
							onChange={handleChange}
						/>
					</div>
				) : (
					<div
						className='group flex p-2 space-x-2 items-center cursor-pointer '
						onClick={() =>
							setFieldsEnabled((prev) => ({
								...prev,
								showTerms: true,
							}))
						}
					>
						<Handshake className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
						<p className='text-sm group-hover:text-violet-400 transition-colors duration-300 text-gray-500 font-semibold'>
							Add Terms and Conditions
						</p>
					</div>
				)}
			</div>
		</>
	);
}

export default AdditionalFields;
