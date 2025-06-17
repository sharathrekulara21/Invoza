import type { Deliverable } from "../types/Invoice";
import { useInvoiceStore } from "@/store/invoiceStore";
import { BadgePercent, CloudUpload, PenTool } from "lucide-react";
import { Button } from "../components/ui/button";
import { useEffect, useRef, useState } from "react";
import InvoiceDetails from "@/components/invoicePane/InvoiceDetails";
import BilledTo from "@/components/invoicePane/BilledTo";
import BilledBy from "@/components/invoicePane/BilledBy";
import Deliverables from "@/components/invoicePane/Deliverables";
import AdditionalFields from "@/components/invoicePane/AdditionalFields";
import SignaturePad from "@/components/invoicePane/SignaturePad";

export default function InvoicePane() {
	const { invoice, setInvoice, updateItem } = useInvoiceStore();
	const [logoImage, setLogoImage] = useState("");
	const [fieldsEnabled, setFieldsEnabled] = useState({
		showDiscount: false,
		showAdvance: false,
		showclientEmail: false,
		showbillerEmail: false,
		showSignaturePad: false,
		showAddNote: false,
		showTerms: false,
	});
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoice({ [name]: value });
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
					<InvoiceDetails invoice={invoice} handleChange={handleChange} />
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
								onChange={handleFileChange}
								ref={hiddenFileInput}
								className='hidden'
								accept='image/*'
							/>
						</label>
					</div>
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
			/>
			<hr className='my-4' />
			<AdditionalFields
				handleChange={handleChange}
				invoice={invoice}
				fieldsEnabled={fieldsEnabled}
				setFieldsEnabled={setFieldsEnabled}
			/>
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
					className='group flex flex-col border border-dashed hover:border-none hover:bg-gray-300 hover:cursor-pointer rounded-sm w-72 h-52 items-center space-y-2 justify-center'
					onClick={() =>
						setFieldsEnabled((prev) => ({ ...prev, showSignaturePad: true }))
					}
				>
					<PenTool className='w-10 text-violet-600 group-hover:text-violet-700 h-10 transition-colors duration-200' />
					<h2 className='text-gray-400 font-semibold text-sm group-hover:text-gray-500 transition-colors duration-200'>
						Click to add your signature
					</h2>
				</div>
			)}

			<hr className="my-4" />
			<div className='flex items-center justify-between'>
				<h2 className='text-lg font-semibold mt-4'>Total</h2>
				<h2 className='font-semibold text-2xl'>{calculateTotal()}</h2>
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
