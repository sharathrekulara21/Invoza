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

type CountryPickerProps = {
	type: "client" | "biller";
};

export function CountryPicker({ type }: CountryPickerProps) {
	const [countries, setCountries] = useState<any[]>([]);
	const { invoice, setInvoice } = useInvoiceStore();

	useEffect(() => {
		axios
			.get("https://api.countrystatecity.in/v1/countries", {
				headers: {
					"X-CSCAPI-KEY": import.meta.env.VITE_COUNTRY_API,
				},
			})
			.then((res) => setCountries(res.data))
			.catch(console.error);
	}, []);

	const handleChange = (value: string) => {
		const selected = countries.find((c) => c.name === value);
		if (type === "client") {
			setInvoice({
				clientAddress: {
					...invoice.clientAddress,
					country: selected,
				},
			});
		} else if (type === "biller") {
			setInvoice({
				billerAddress: {
					...invoice.billerAddress,
					country: selected,
				},
			});
		}
	};

	const selectedCountry =
		type === "client"
			? invoice.clientAddress?.country?.name || ""
			: invoice.billerAddress?.country?.name || "";

	return (
		<Select onValueChange={handleChange}>
			<SelectTrigger className='w-full border-b border-gray-900'>
				<SelectValue placeholder='Choose Country' />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Countries</SelectLabel>
					{countries?.map((item) => (
						<SelectItem key={item?.name} value={item?.name}>
							{item?.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
