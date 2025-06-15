import DatePickers from "../../utils/DatePickers";

type Props = { invoice: invoice; handleChange: handleChange };

function InvoiceDetails({ invoice, handleChange }: Props) {
	return (
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
					fromDate={invoice.issueDate ? new Date(invoice.issueDate) : undefined}
				/>
			</div>
		</div>
	);
}

export default InvoiceDetails;
