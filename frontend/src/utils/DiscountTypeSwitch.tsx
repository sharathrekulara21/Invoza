import { Switch } from "@/components/ui/switch";

type DiscountType = "percentage" | "fixed";

interface Invoice {
	discountType: DiscountType;
	// add other invoice fields if needed
}

interface DiscountTypeSwitchProps {
	invoice: Invoice;
	setInvoice: (invoice: Invoice) => void;
}

export default function DiscountTypeSwitch({
	invoice,
	setInvoice,
}: DiscountTypeSwitchProps) {
	return (
		<div className='flex items-center gap-3'>
			<span
				className={invoice.discountType === "percentage" ? "font-bold" : ""}
			>
				%
			</span>
			<Switch
				checked={invoice.discountType === "fixed"}
				onCheckedChange={(checked) =>
					setInvoice({ discountType: checked ? "fixed" : "percentage" })
				}
				id='tax-type-switch'
				className='cursor-pointer'
			/>
			<span className={invoice.discountType === "fixed" ? "font-bold" : ""}>
				Fixed
			</span>
		</div>
	);
}
