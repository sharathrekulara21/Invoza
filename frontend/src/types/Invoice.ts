export interface Address {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
}

export interface Deliverable {
	id: string;
	description: string;
	quantity: number;
	price: number;
}

export interface Invoice {
	// Client Details
	clientName: string;
	clientCompany: string;
	clientAddress: Address;
	clientEmail: string;
	clientMobile: string;

	// Biller Details
	billerName: string;
	billerAddress: Address;
	billerEmail: string;
	billerMobile: string;

	// Invoice
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;

	// Items
	items: Deliverable[];

	// Extra
	discount?: number;
	advancePaid?: number;
	total: number;
	status: "paid" | "unpaid";
}
