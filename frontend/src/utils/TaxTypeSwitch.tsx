import { Switch } from "@/components/ui/switch";

type TaxType = "percentage" | "fixed";

interface Invoice {
	taxType: TaxType;
	// add other invoice fields if needed
}

interface TaxTypeSwitchProps {
	invoice: Invoice;
	setInvoice: (invoice: Invoice) => void;
}

export default function TaxTypeSwitch({
	invoice,
	setInvoice,
}: TaxTypeSwitchProps) {
	return (
		<div className='flex items-center gap-3'>
			<span className={invoice.taxType === "percentage" ? "font-bold" : ""}>
				%
			</span>
			<Switch
				checked={invoice.taxType === "fixed"}
				onCheckedChange={(checked) =>
					setInvoice({ taxType: checked ? "fixed" : "percentage" })
				}
				id='tax-type-switch'
				className='cursor-pointer'
			/>
			<span className={invoice.taxType === "fixed" ? "font-bold" : ""}>
				Fixed
			</span>
		</div>
	);
}
