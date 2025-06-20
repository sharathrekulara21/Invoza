import { create } from "zustand";
import type { Invoice, Deliverable } from "../types/Invoice";

type InvoiceStore = {
	invoice: Invoice;
	setInvoice: (data: Partial<Invoice>) => void;
	resetInvoice: () => void;
	removeItem: (index: number) => void;
	updateItem: (
		index: number,
		field: keyof Deliverable,
		value: string | number
	) => void;
};

const emptyInvoice: Invoice = {
	invoiceTitle: "Invoice #01",
	logo: "",
	currency: "USD",
	clientName: "",
	clientEmail: "",
	clientMobile: "",
	billerName: "",
	billerMobile: "",
	billerEmail: "",
	invoiceNumber: `INV-${Date.now()}`,
	issueDate: new Date().toISOString(),
	dueDate: "",
	items: [],
	discount: 0,
	advancePaid: 0,
	signature: "",
	signatureFont: "Dancing Script",
	total: 0,
	tax: 0,
	taxType: "fixed",
	discountType: "fixed",
	status: "unpaid",
	note: "",
	terms: "",
	holderName: "",
	accountNumber: "",
	bankName: "",
};

export const useInvoiceStore = create<InvoiceStore>((set) => ({
	invoice: emptyInvoice,

	setInvoice: (data) =>
		set((state) => ({
			invoice: { ...state.invoice, ...data },
		})),
	resetInvoice: () => set(() => ({ invoice: emptyInvoice })),
	removeItem: (index: number) =>
		set((state) => {
			const updatedItems = state.invoice.items.filter((_, i) => i !== index);
			return {
				invoice: {
					...state.invoice,
					items: updatedItems,
				},
			};
		}),
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
