import {
	Page,
	Text,
	View,
	Document,
	StyleSheet,
	Image,
} from "@react-pdf/renderer";
import { useInvoiceStore } from "@/store/invoiceStore";

const styles = StyleSheet.create({
	page: {
		backgroundColor: "#C4D9FF",
		padding: 20,
	},
	section: {
		backgroundColor: "#FBFBFB",
		padding: 10,
		borderRadius: 10,
		marginBottom: 10,
	},
	header: {
		textAlign: "center",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 10,
	},
	row: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 5,
	},
	label: {
		fontSize: 12,
		fontWeight: "bold",
	},
	value: {
		fontSize: 12,
	},
	title: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#7C3AED",
		marginBottom: 5,
	},
	itemRow: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 2,
	},
	totalSection: {
		alignItems: "flex-end",
		marginTop: 10,
	},
	footer: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		backgroundColor: "#E5E7EB",
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		marginTop: 20,
	},
});

export default function PrintablePreview() {
	const { invoice } = useInvoiceStore();

	return (
		<Document>
			<Page size='A4' style={styles.page}>
				<View style={styles.section}>
					<Text style={styles.header}>Invoice Preview</Text>
				</View>

				<View
					style={[
						styles.section,
						{ flexDirection: "row", justifyContent: "space-between" },
					]}
				>
					<View>
						<Text style={styles.title}>Invoice Details</Text>
						<View style={styles.row}>
							<Text style={styles.label}>Invoice Number:</Text>
							<Text style={styles.value}>{invoice.invoiceNumber}</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.label}>Issue Date:</Text>
							<Text style={styles.value}>
								{invoice.issueDate?.substring(0, 10)}
							</Text>
						</View>
						<View style={styles.row}>
							<Text style={styles.label}>Due Date:</Text>
							<Text style={styles.value}>
								{invoice.dueDate?.substring(0, 10)}
							</Text>
						</View>
					</View>
					<Image
						src='Invoza_Logo_Design-removebg-preview.png'
						style={{ width: 100, height: 100 }}
					/>
				</View>

				<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
					<View style={[styles.section, { width: "48%" }]}>
						<Text style={styles.title}>Billed To</Text>
						{[
							invoice.clientAddress?.country,
							invoice.clientName,
							invoice.clientAddress?.street,
							invoice.clientAddress?.city,
							invoice.clientAddress?.postalCode,
							invoice.clientAddress?.state,
							invoice.clientMobile,
							invoice.clientEmail,
						]
							.filter(Boolean)
							.map((val, idx) => (
								<Text style={styles.value} key={idx}>
									{val}
								</Text>
							))}
					</View>

					<View style={[styles.section, { width: "48%" }]}>
						<Text style={styles.title}>Billed By</Text>
						{[
							invoice.billerAddress?.country,
							invoice.billerName,
							invoice.billerAddress?.street,
							invoice.billerAddress?.city,
							invoice.billerAddress?.postalCode,
							invoice.billerAddress?.state,
							invoice.billerMobile,
							invoice.billerEmail,
						]
							.filter(Boolean)
							.map((val, idx) => (
								<Text style={styles.value} key={idx}>
									{val}
								</Text>
							))}
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.title}>Deliverables</Text>
					<View style={[styles.row, { fontWeight: "bold" }]}>
						<Text>Name</Text>
						<Text>Quantity</Text>
						<Text>Price</Text>
					</View>
					{invoice.items?.map((item, idx) => (
						<View style={styles.itemRow} key={idx}>
							<Text>{item.name}</Text>
							<Text>{item.quantity}</Text>
							<Text>{item.price}</Text>
						</View>
					))}
					<View style={styles.totalSection}>
						{invoice.discount !== 0 && (
							<Text>Discount: -{invoice.discount}</Text>
						)}
						{invoice.advancePaid !== 0 && (
							<Text>Advance: -{invoice.advancePaid}</Text>
						)}
						<Text style={{ fontWeight: "bold" }}>TOTAL: {invoice.total}</Text>
					</View>
				</View>

				<View style={styles.footer}>
					<Image
						src='Invoza_Logo_Design-removebg-preview.png'
						style={{ width: 80, height: 80 }}
					/>
					<View>
						<Text>Contact Details</Text>
						<Text>{invoice.billerName}</Text>
						<Text>{invoice.billerMobile}</Text>
						{invoice.billerEmail && <Text>{invoice.billerEmail}</Text>}
					</View>
					<View>
						<Text>Wiring Details</Text>
						<Text>{invoice.billerName}</Text>
						<Text>Bank Name: HDFC bank</Text>
						<Text>Acc No: 0987654321</Text>
					</View>
				</View>
			</Page>
		</Document>
	);
}
