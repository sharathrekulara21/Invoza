export interface Address {
	street: string | undefined;
	city: string | undefined;
	state: string | undefined;
	postalCode: string | undefined;
	country: CountryDetails | undefined;
}

type CountryDetails = {
	name: string | "";
	iso2: string | "";
	currency: string | "";
	phonecode: string | "";
	flag: string | "";
	// ...other fields from API if needed
};

export interface Deliverable {
	id: string;
	name: string;
	quantity: number;
	price: number;
}

export interface Invoice {
	invoiceTitle: string;
	logo: string;
	currency: string;
	// Client Details
	clientName: string;
	clientAddress?: Address;
	clientEmail: string;
	clientMobile: string;

	// Biller Details
	billerName: string;
	billerAddress?: Address;
	billerEmail: string;
	billerMobile: string;

	// Invoice
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;

	// Items
	items: Deliverable[];

	signature?: string;
	signatureImg?: string;
	signatureFont: string; // or your default font

	// Wiring Details
	holderName: string;
	accountNumber: string;
	bankName: string;

	// Extra
	discount?: number;
	advancePaid?: number;
	total: number;
	status: "paid" | "unpaid" | "pending";
	terms: string;
	note: string;
}
