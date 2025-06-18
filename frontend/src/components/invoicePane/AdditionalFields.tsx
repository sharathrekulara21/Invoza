import {
	BadgePercent,
	HandCoins,
	Handshake,
	NotebookPen,
	PenTool,
	Trash2,
} from "lucide-react";
import React from "react";
import SignaturePad from "./SignaturePad";

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
			<div className='mb-4 flex flex-col gap-y-3'>
				{fieldsEnabled.showDiscount ? (
					<div className='flex items-center gap-4 justify-between'>
						<div className='flex space-x-1 justify-between pr-3'>
							<div className='flex space-x-2 p-2'>
								<BadgePercent className='w-5' />
								<h2 className='text-sm font-medium text-gray-900'>Discount</h2>
							</div>
						</div>
						<div className='flex space-x-1 items-center pr-3'>
							<input
								name='discount'
								className='border rounded-sm border-gray-500 focus:outline-none text-end p-2 mr-2'
								placeholder='0'
								value={invoice.discount}
								onChange={handleChange}
							/>
							<Trash2
								className='w-5 hover:text-red-500 cursor-pointer transition-colors duration-300'
								onClick={() => {
									setFieldsEnabled((prev) => ({
										...prev,
										showDiscount: false,
									}));
								}}
							/>
						</div>
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
						<div className='flex space-x-1 justify-between pr-3'>
							<div className='flex space-x-2 p-2'>
								<HandCoins className='w-5 group-hover:text-violet-400 transition-colors duration-300' />
								<h2 className='text-sm font-medium text-gray-900'>
									Add Advance
								</h2>
							</div>
						</div>

						<div className='flex space-x-1 items-center pr-3'>
							<input
								name='advancePaid'
								className='border rounded-sm border-gray-500 focus:outline-none text-end p-2 mr-2'
								placeholder='Advance'
								value={invoice.advancePaid}
								onChange={handleChange}
							/>
							<Trash2
								className='w-5 hover:text-red-500 cursor-pointer transition-colors duration-300'
								onClick={() => {
									setFieldsEnabled((prev) => ({ ...prev, showAdvance: false }));
								}}
							/>
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
					<div className='flex flex-col gap-4 p-3'>
						<div className='flex justify-between'>
							<div className='flex space-x-1'>
								<NotebookPen className='w-5' />
								<h2 className='text-sm font-medium text-gray-900'>Add Note</h2>
							</div>
							<Trash2
								className='w-5 hover:text-red-500 cursor-pointer transition-colors duration-300'
								onClick={() => {
									setFieldsEnabled((prev) => ({ ...prev, showAddNote: false }));
								}}
							/>
						</div>
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
					<div className='flex flex-col gap-4 p-3'>
						<div className='flex justify-between'>
							<div className='flex space-x-1'>
								<Handshake className='w-5 ' />
								<h2 className='text-sm font-medium text-gray-900'>
									Add Terms and Conditions
								</h2>
							</div>
							<Trash2
								className='w-5 hover:text-red-500 cursor-pointer transition-colors duration-300'
								onClick={() => {
									setFieldsEnabled((prev) => ({ ...prev, showTerms: false }));
								}}
							/>
						</div>

						<textarea
							name='terms'
							rows={3}
							className='border-1 rounded-sm border-gray-500 focus:outline-none text-base p-2'
							placeholder='Add terms and conditions here..'
							value={invoice.terms}
							onChange={handleChange}
						/>
					</div>
				) : (
					<div
						className='group flex p-2 space-x-2 items-center cursor-pointer'
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
				{fieldsEnabled.showSignaturePad ? (
					<div
						className='fixed inset-0 z-50 flex items-center justify-center  bg-opacity-40'
						style={{ minHeight: "100vh" }}
					>
						<div className='bg-white rounded-lg shadow-lg p-6 max-w-lg w-full'>
							<SignaturePad setFieldsEnabled={setFieldsEnabled} />
						</div>
					</div>
				) : (
					<div
						className='group flex flex-col p-2 border border-dashed hover:border-none hover:bg-gray-200 hover:cursor-pointer rounded-sm w-72 transition-colors duration-200 h-52 items-center space-y-2 justify-center'
						onClick={() =>
							setFieldsEnabled((prev) => ({ ...prev, showSignaturePad: true }))
						}
					>
						<PenTool className='w-10 text-gray-600 group-hover:text-violet-400 h-10 transition-colors duration-200' />
						<h2 className='text-gray-400 font-semibold text-sm group-hover:text-violet-400 transition-colors duration-200'>
							Click to add your signature
						</h2>
					</div>
				)}
			</div>
		</>
	);
}

export default AdditionalFields;
