import { create } from "zustand";

type Address = {
	street: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
};

type Deliverable = {
	id: string;
	name: string;
	quantity: number;
	price: number;
};

type Invoice = {
	clientName: string;
	clientCompany: string;
	clientAddress: Address;
	clientEmail: string;
	clientMobile: string;
	billerName: string;
	billerMobile: string;
	billerEmail: string;
	billerAddress: Address;
	invoiceNumber: string;
	issueDate: string;
	dueDate: string;
	items: Deliverable[];
	discount: number;
	advancePaid: number;
	total: number;
	status: "unpaid" | "paid" | "pending";
};

type InvoiceStore = {
	invoice: Invoice;
	setInvoice: (data: Partial<Invoice>) => void;
	resetInvoice: () => void;
	updateItem: (
		index: number,
		field: keyof Deliverable,
		value: string | number
	) => void;
};

const emptyInvoice: Invoice = {
	clientName: "",
	clientCompany: "",
	clientAddress: {
		street: "",
		city: "",
		state: "",
		postalCode: "",
		country: "",
	},
	clientEmail: "",
	clientMobile: "",
	billerName: "",
	billerMobile: "",
	billerEmail: "",
	billerAddress: {
		street: "",
		city: "",
		state: "",
		postalCode: "",
		country: "",
	},
	invoiceNumber: "",
	issueDate: "",
	dueDate: "",
	items: [],
	discount: 0,
	advancePaid: 0,
	total: 0,
	status: "unpaid",
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
	invoice: emptyInvoice,
	setInvoice: (data) =>
		set((state) => ({
			invoice: { ...state.invoice, ...data },
		})),
	resetInvoice: () => set(() => ({ invoice: emptyInvoice })),
	updateItem: (
		index: number,
		field: keyof Deliverable,
		value: string | number
	) =>
		set((state) => {
			const updatedItems = [...state.invoice.items];
			const item = updatedItems[index];

			updatedItems[index] = {
				...item,
				[field]: field === "name" ? String(value) : Number(value),
			};

			return {
				invoice: {
					...state.invoice,
					items: updatedItems,
				},
			};
		}),
}));
