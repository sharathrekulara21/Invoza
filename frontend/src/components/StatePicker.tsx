import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useInvoiceStore } from "@/store/invoiceStore";
import axios from "axios";
import { useEffect, useState } from "react";

type StatePickerProps = {
	type: "client" | "biller";
	country?: any;
};

export function StatePicker({ type, country }: StatePickerProps) {
	const [states, setStates] = useState<any[]>([]);
	const { invoice, setInvoice } = useInvoiceStore();

	useEffect(() => {
		if (country && country.iso2) {
			axios
				.get(
					`https://api.countrystatecity.in/v1/countries/${country.iso2}/states`,
					{
						headers: {
							"X-CSCAPI-KEY": import.meta.env.VITE_COUNTRY_API,
						},
					}
				)
				.then((res) => setStates(res.data))
				.catch(console.error);
			console.log(states);
		} else {
			setStates([]);
		}
	}, [country]);

	const handleChange = (value: string) => {
		if (type === "client") {
			setInvoice({
				clientAddress: {
					...invoice.clientAddress,
					state: value,
				},
			});
		} else if (type === "biller") {
			setInvoice({
				billerAddress: {
					...invoice.billerAddress,
					state: value,
				},
			});
		}
	};

	const selectedState =
		type === "client"
			? invoice.clientAddress?.state || ""
			: invoice.billerAddress?.state || "";

	return (
		<Select onValueChange={handleChange}>
			<SelectTrigger className='w-full border-b border-gray-900'>
				<SelectValue placeholder='Choose State' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>States</SelectLabel>
					{states.length === 0 ? (
						<SelectItem value='No states'>No states present</SelectItem>
					) : (
						states.map((item) => (
							<SelectItem key={item?.name} value={item?.name}>
								{item?.name}
							</SelectItem>
						))
					)}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
