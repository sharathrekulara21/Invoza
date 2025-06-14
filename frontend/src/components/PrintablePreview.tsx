import {
	Document,
	Page,
	View,
	Text,
	Image,
	StyleSheet,
} from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/invoiceStore";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#C4D9FF",
		padding: 0,
		fontFamily: "Helvetica",
		fontSize: 12,
	},
	section: {
		backgroundColor: "#FBFBFB",
		borderRadius: 20,
		margin: 16,
		padding: 16,
		minHeight: "100vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
	},
	header: {
		textAlign: "center",
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 8,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 12,
		gap: 16,
	},
	card: {
		backgroundColor: "#FBFBFB",
		borderRadius: 12,
		padding: 12,
		flex: 1,
		marginRight: 8,
	},
	cardTitle: {
		color: "#7C3AED",
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 4,
	},
	label: {
		color: "#374151",
		fontWeight: "bold",
		fontSize: 12,
	},
	value: {
		fontWeight: "bold",
		fontSize: 12,
	},
	deliverablesHeader: {
		color: "#7C3AED",
		fontWeight: "bold",
		fontSize: 18,
		marginBottom: 8,
	},
	deliverablesTableHeader: {
		flexDirection: "row",
		backgroundColor: "#F3F4F6",
		borderBottomWidth: 2,
		borderBottomColor: "#6B7280",
		padding: 6,
		fontWeight: "bold",
	},
	deliverableRow: {
		flexDirection: "row",
		backgroundColor: "#E8F9FF",
		borderRadius: 4,
		marginBottom: 4,
		alignItems: "center",
	},
	deliverableCell: {
		padding: 6,
		flexGrow: 1,
		fontWeight: "bold",
	},
	deliverableCellName: {
		minWidth: 100,
		maxWidth: 240,
		flexGrow: 2,
	},
	deliverableCellQty: {
		textAlign: "center",
		flexGrow: 1,
	},
	deliverableCellPrice: {
		textAlign: "right",
		flexGrow: 1,
	},
	rightAlign: {
		alignItems: "flex-end",
		marginTop: 12,
	},
	totalBox: {
		backgroundColor: "#BBF7D0",
		borderRadius: 6,
		padding: 8,
		alignItems: "flex-end",
		marginTop: 8,
	},
	summaryRow: {
		flexDirection: "row",
		gap: 16,
		fontWeight: "bold",
		marginBottom: 2,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		backgroundColor: "#E5E7EB",
		borderRadius: 20,
		padding: 16,
		marginTop: 24,
	},
	logo: {
		width: 80,
		height: 80,
		objectFit: "cover",
		borderRadius: 8,
	},
	contact: {
		fontSize: 12,
		fontWeight: "bold",
	},
	wiring: {
		fontSize: 12,
		fontWeight: "bold",
	},
});

export default function PrintablePreview() {
	const { invoice } = useInvoiceStore.getState();

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.section}>
					{/* Header */}
					<Text style={styles.header}>Invoice Preview</Text>

					{/* Invoice Details & Logo */}
					<View style={styles.row}>
						<View style={styles.card}>
							<Text style={styles.cardTitle}>Invoice Details</Text>
							<View style={styles.row}>
								<Text style={styles.label}>Invoice Number</Text>
								<Text style={styles.value}>{invoice.invoiceNumber}</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Issue Date</Text>
								<Text style={styles.value}>
									{invoice.issueDate?.substring(0, 10)}
								</Text>
							</View>
							<View style={styles.row}>
								<Text style={styles.label}>Due Date</Text>
								<Text style={styles.value}>
									{invoice.dueDate?.substring(0, 10)}
								</Text>
							</View>
						</View>
						<Image
							style={styles.logo}
							src='Invoza_Logo_Design-removebg-preview.png'
						/>
					</View>

					{/* Billed To / Billed By */}
					<View style={styles.row}>
						<View style={styles.card}>
							<Text style={styles.cardTitle}>Billed To</Text>
							{invoice.clientAddress?.country?.trim() && (
								<Text style={styles.value}>
									{invoice.clientAddress.country}
								</Text>
							)}
							{invoice.clientName?.trim() && (
								<Text style={styles.value}>{invoice.clientName}</Text>
							)}
							{invoice.clientAddress?.street?.trim() && (
								<Text style={styles.value}>{invoice.clientAddress.street}</Text>
							)}
							<View style={{ flexDirection: "row", gap: 8 }}>
								{invoice.clientAddress?.city?.trim() && (
									<Text style={styles.value}>{invoice.clientAddress.city}</Text>
								)}
								{invoice.clientAddress?.postalCode?.trim() && (
									<Text style={styles.value}>
										{invoice.clientAddress.postalCode}
									</Text>
								)}
							</View>
							{invoice.clientAddress?.state?.trim() && (
								<Text style={styles.value}>{invoice.clientAddress.state}</Text>
							)}
							{invoice.clientMobile?.trim() && (
								<Text style={styles.value}>{invoice.clientMobile}</Text>
							)}
							{invoice.clientEmail?.trim() && (
								<Text style={styles.value}>{invoice.clientEmail}</Text>
							)}
						</View>
						<View style={styles.card}>
							<Text style={styles.cardTitle}>Billed By</Text>
							{invoice.billerAddress?.country?.trim() && (
								<Text style={styles.value}>
									{invoice.billerAddress.country}
								</Text>
							)}
							{invoice.billerName?.trim() && (
								<Text style={styles.value}>{invoice.billerName}</Text>
							)}
							{invoice.billerAddress?.street?.trim() && (
								<Text style={styles.value}>{invoice.billerAddress.street}</Text>
							)}
							<View style={{ flexDirection: "row", gap: 8 }}>
								{invoice.billerAddress?.city?.trim() && (
									<Text style={styles.value}>{invoice.billerAddress.city}</Text>
								)}
								{invoice.billerAddress?.postalCode?.trim() && (
									<Text style={styles.value}>
										{invoice.billerAddress.postalCode}
									</Text>
								)}
							</View>
							{invoice.billerAddress?.state?.trim() && (
								<Text style={styles.value}>{invoice.billerAddress.state}</Text>
							)}
							{invoice.billerMobile?.trim() && (
								<Text style={styles.value}>{invoice.billerMobile}</Text>
							)}
							{invoice.billerEmail?.trim() && (
								<Text style={styles.value}>{invoice.billerEmail}</Text>
							)}
						</View>
					</View>

					{/* Deliverables */}
					<Text style={styles.deliverablesHeader}>Deliverables</Text>
					<View style={styles.deliverablesTableHeader}>
						<Text style={[styles.deliverableCell, styles.deliverableCellName]}>
							Name
						</Text>
						<Text style={[styles.deliverableCell, styles.deliverableCellQty]}>
							Quantity
						</Text>
						<Text style={[styles.deliverableCell, styles.deliverableCellPrice]}>
							Price
						</Text>
					</View>
					{invoice.items?.map((item) => (
						<View key={item.id} style={styles.deliverableRow}>
							<Text
								style={[styles.deliverableCell, styles.deliverableCellName]}
							>
								{item.name}
							</Text>
							<Text style={[styles.deliverableCell, styles.deliverableCellQty]}>
								{item.quantity}
							</Text>
							<Text
								style={[styles.deliverableCell, styles.deliverableCellPrice]}
							>
								{item.price}
							</Text>
						</View>
					))}

					{/* Discount & Advance */}
					<View style={styles.rightAlign}>
						{invoice.discount !== 0 && (
							<View style={styles.summaryRow}>
								<Text>Discount</Text>
								<Text>- {invoice.discount}</Text>
							</View>
						)}
						{invoice.advancePaid !== 0 && (
							<View style={styles.summaryRow}>
								<Text>Advance</Text>
								<Text>- {invoice.advancePaid}</Text>
							</View>
						)}
					</View>

					{/* Total */}
					<View style={styles.totalBox}>
						<View style={styles.summaryRow}>
							<Text>TOTAL</Text>
							<Text>{invoice.total}</Text>
						</View>
					</View>

					{/* Footer */}
					<View style={styles.footer}>
						<Image
							style={styles.logo}
							src='Invoza_Logo_Design-removebg-preview.png'
						/>
						<View>
							<Text style={styles.contact}>Contact Details</Text>
							<Text>{invoice.billerName}</Text>
							<Text>{invoice.billerMobile}</Text>
							{invoice.billerEmail && <Text>{invoice.billerEmail}</Text>}
						</View>
						<View>
							<Text style={styles.wiring}>Wiring Details</Text>
							<Text>{invoice.billerName}</Text>
							<Text>Bank Name: HDFC bank</Text>
							<Text>Acc No: 0987654321</Text>
						</View>
					</View>
				</View>
			</Page>
		</Document>
	);
}
