import type { Deliverable } from "../types/Invoice";
import { useInvoiceStore } from "@/store/invoiceStore";
import { CloudUpload, Image, PenLine } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from "react";
import InvoiceDetails from "@/components/invoicePane/InvoiceDetails";
import BilledTo from "@/components/invoicePane/BilledTo";
import BilledBy from "@/components/invoicePane/BilledBy";
import { useReactToPrint } from "react-to-print";
import Deliverables from "@/components/invoicePane/Deliverables";
import AdditionalFields from "@/components/invoicePane/AdditionalFields";
import PreviewPane from "./PreviewPane";
import WiringDetails from "@/components/invoicePane/WiringDetails";
import { CurrencyPicker } from "@/utils/CurrencyPicker";
import { Switch } from "@radix-ui/react-switch";
import TaxTypeSwitch from "@/utils/TaxTypeSwitch";

export default function InvoicePane() {
	const { invoice, setInvoice, updateItem, removeItem } = useInvoiceStore();
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });
	const [logoImage, setLogoImage] = useState("");
	const [fieldsEnabled, setFieldsEnabled] = useState({
		showDiscount: false,
		showAdvance: false,
		showclientEmail: false,
		showbillerEmail: false,
		showSignaturePad: false,
		showAddNote: false,
		showTerms: false,
		showPreviewPane: false,
	});
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		// List all numeric fields here:
		const numericFields = ["tax", "discount", "advancePaid"];
		setInvoice({
			[name]: numericFields.includes(name) ? Number(value) : value,
		});
	};

	const isInvoiceValid = () => {
		if (!invoice.invoiceTitle || invoice.invoiceTitle.trim() === "")
			return false;
		if (!invoice.clientName || invoice.clientName.trim() === "") return false;
		if (!invoice.billerName || invoice.billerName.trim() === "") return false;
		if (!invoice.items.length) return false;
		for (const item of invoice.items) {
			if (!item.name || item.name.trim() === "") return false;
			if (!item.price || item.price <= 0) return false;
			if (!item.quantity || item.quantity <= 0) return false;
		}
		return true;
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onloadend = () => {
			setLogoImage(reader.result as string);
			setInvoice({ ...invoice, logo: reader.result as string });
		};
		reader.readAsDataURL(file);
	};

	const [nextDeliverableId, setNextDeliverableId] = useState(1);

	const addItem = () => {
		const newItem: Deliverable = {
			id: nextDeliverableId,
			name: "",
			quantity: 1,
			price: 0,
		};
		setInvoice({
			items: [...invoice.items, newItem],
		});
		setNextDeliverableId(nextDeliverableId + 1);
	};

	const calculateTotal = () => {
		const subtotal = invoice.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const advance = invoice.advancePaid || 0;
		const totalAfterAdvance = subtotal - advance;
		const discount =
			invoice.discountType === "fixed"
				? invoice.discount || 0
				: (totalAfterAdvance / 100) * (invoice.discount ?? 0);
		const totalWithoutTax = subtotal - discount - advance;
		const tax =
			invoice.taxType === "fixed"
				? invoice.tax || 0
				: (totalWithoutTax / 100) * (invoice.tax ?? 0);
		return totalWithoutTax + tax;
	};

	useEffect(() => {
		const subtotal = invoice.items.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0
		);
		const discount = invoice.discount || 0;
		const advance = invoice.advancePaid || 0;
		const totalWithoutTax = subtotal - discount - advance;
		const tax =
			invoice.taxType === "fixed"
				? invoice.tax || 0
				: (totalWithoutTax / 100) * (invoice.tax ?? 0);
		const finalTotal = totalWithoutTax + tax;
		setInvoice({ total: finalTotal });
		// eslint-disable-next-line
	}, [invoice.items, invoice.discount, invoice.advancePaid, invoice.tax]);

	const handleSubmit = () => {
		const total = calculateTotal();

		const fullInvoice = {
			...invoice,
			total,
		};

		console.log(JSON.stringify(fullInvoice, null, 2));
	};

	return (
		<div className='p-6 flex w-full'>
			<div className='w-[70%]'>
				<div className='flex justify-center mb-4 w-full'>
					<div className='flex items-center border-b border-dashed p-1 border-gray-400 hover:border-violet-600 focus:border-gray-90 mx-auto'>
						<input
							type='text'
							name='invoiceNumber'
							className='text-2xl font-bold text-center focus:outline-none w-full bg-transparent'
							value={invoice.invoiceTitle}
							onChange={handleChange}
							required
						/>
						<PenLine className='w-6' />
					</div>
				</div>
				<div className='flex flex-col space-y-5 items-start'>
					<div className='flex space-y-4 flex-row space-x-4 justify-between items-start w-full '>
						<InvoiceDetails invoice={invoice} handleChange={handleChange} />
						<div className='flex border border-dashed hover:border-none rounded-sm w-72 h-52 items-center justify-center'>
							<label
								htmlFor='logoUpload'
								className='group flex flex-col rounded-sm items-center hover:bg-gray-300 transition-colors duration-200 justify-center cursor-pointer w-full h-full'
							>
								{invoice.logo.length > 1 ? (
									<>
										{invoice.logo && invoice.logo.length > 1 && (
											<img
												className='w-[128px] h-[128px] object-cover'
												src={invoice.logo}
												alt='logo'
											/>
										)}
									</>
								) : (
									<>
										<CloudUpload className='w-10 text-violet-600 group-hover:text-violet-700 h-10 transition-colors duration-200' />
										<h2 className='text-gray-400 font-semibold text-sm group-hover:text-gray-500 transition-colors duration-200'>
											Upload Your logo
										</h2>
									</>
								)}

								<input
									type='file'
									name='logo'
									id='logoUpload'
									onChange={handleFileChange}
									ref={hiddenFileInput}
									className='hidden'
									accept='image/*'
								/>
							</label>
						</div>
					</div>
					<div>
						<WiringDetails invoice={invoice} handleChange={handleChange} />
					</div>
					<div className='flex flex-col space-y-4 md:flex-row md:space-x-4 items-start w-full'>
						<BilledTo
							invoice={invoice}
							handleChange={handleChange}
							setInvoice={setInvoice}
							fieldsEnabled={fieldsEnabled}
							setFieldsEnabled={setFieldsEnabled}
						/>
						<BilledBy
							invoice={invoice}
							handleChange={handleChange}
							setInvoice={setInvoice}
							fieldsEnabled={fieldsEnabled}
							setFieldsEnabled={setFieldsEnabled}
						/>
					</div>
				</div>

				<hr className='my-4' />
				<Deliverables
					invoice={invoice}
					addItem={addItem}
					updateItem={updateItem}
					removeItem={removeItem}
				/>
				<hr className='my-4' />
				<AdditionalFields
					setInvoice={setInvoice}
					handleChange={handleChange}
					invoice={invoice}
					fieldsEnabled={fieldsEnabled}
					setFieldsEnabled={setFieldsEnabled}
				/>

				<hr className='my-4' />
				<div className='flex items-center justify-between'>
					<h2 className='text-lg font-semibold mt-4'>Total</h2>
					<div className='flex space-x-2 items-center '>
						<span className='font-semibold'>{invoice.currency}</span>
						<h2 className='font-semibold text-2xl'>{calculateTotal()}</h2>
					</div>
				</div>
				<div className='text-center mt-10'>
					<Button
						className='bg-violet-600 hover:bg-violet-600 hover:scale-105 '
						onClick={handleSubmit}
						disabled={!isInvoiceValid()}
					>
						Prepare invoice
					</Button>
				</div>
			</div>
			<div className='w-[30%]'>
				<div className='flex space-x-3 items-center m-4'>
					<h4>Choose your currency</h4>
					<CurrencyPicker invoice={invoice} setInvoice={setInvoice} />
				</div>
				<div className='flex space-x-3 items-center m-4'>
					<h4>Tax</h4>
					<TaxTypeSwitch invoice={invoice} setInvoice={setInvoice} />
					<div className='flex space-x-2 items-center'>
						<input
							name='tax'
							className='border rounded-sm w-20 border-gray-500 focus:outline-none text-end p-2 mr-2'
							placeholder='tax'
							value={invoice.tax}
							onChange={handleChange}
						/>
						{invoice.taxType === "fixed" ? (
							<span className='font-semibold'>{invoice.currency}</span>
						) : (
							<span className='font-semibold'>%</span>
						)}
					</div>
				</div>
				<div className='flex items-start justify-center'>
					<button
						className='p-3 rounded-sm font-semibold bg-violet-500 text-[#FBFBFB] cursor-pointer hover:bg-violet-700 transition-colors duration-200'
						onClick={() =>
							setFieldsEnabled((prev) => ({ ...prev, showPreviewPane: true }))
						}
						disabled={!isInvoiceValid()}
					>
						Review Invoice
					</button>
				</div>
				<div className='flex flex-col border p-4 border-red-400 items-center justify-center m-3'>
					<h4 className='font-semibold'>Note</h4>
					<p className='font-semibold text-gray-500'>
						* Click on review Invoice &gt; download &gt; print
					</p>
					<p className='font-semibold text-gray-500'>
						* All fields without optional mark are required
					</p>
				</div>
			</div>
			{fieldsEnabled.showPreviewPane && (
				<div className='fixed inset-0 z-50 flex items-center justify-center flex-col max-h-[100vh] bg-opacity-40'>
					<div className='relative bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto p-8'>
						<div>
							<PreviewPane
								setFieldsEnabled={setFieldsEnabled}
								contentRef={contentRef}
								reactToPrintFn={reactToPrintFn}
								invoice={invoice}
							/>
						</div>
						<div className='flex justify-center space-x-2'>
							<button
								className='border px-3 py-2 hover:border-violet-400 hover:text-violet-400 transition-colors cursor-pointer duration-200 border-gray-600 text-sm font-semibold rounded-sm'
								onClick={reactToPrintFn}
							>
								Download
							</button>
							<button
								className='border px-3 py-2 hover:border-red-400 hover:text-red-400 transition-colors cursor-pointer duration-200 border-gray-600 text-sm font-semibold rounded-sm'
								onClick={() =>
									setFieldsEnabled((prev) => ({
										...prev,
										showPreviewPane: false,
									}))
								}
							>
								Close
							</button>
						</div>

						{/* Print Button */}
					</div>
				</div>
			)}
		</div>
	);
}
