export interface Address {
	street: string | undefined;
	city: string | undefined;
	state: string | undefined;
	postalCode: string | undefined;
	country: string | undefined;
}

export interface Deliverable {
	id: string;
	name: string;
	quantity: number;
	price: number;
}

export interface Invoice {
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

	// Extra
	discount?: number;
	advancePaid?: number;
	total: number;
	status: "paid" | "unpaid" | "pending";
}
