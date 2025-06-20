import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { currencyList } from "@/utils/currencyList";

export function CurrencyPicker({ invoice, setInvoice }) {
	const handleChange = (value: string) => {
		setInvoice({
			currency: value,
		});
	};

	return (
		<Select value={invoice.currency} onValueChange={handleChange}>
			<SelectTrigger className='border-b border-gray-900'>
				<SelectValue placeholder='Choose Currency' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Currency</SelectLabel>
					{currencyList.map((item) => (
						<SelectItem key={item.CurrencyCode} value={item.CurrencyCode}>
							{item.CurrencyCode} - {item.CurrencyName}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}


