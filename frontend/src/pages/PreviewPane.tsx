import PreviewDeliverables from "../components/previewPane/PreviewDeliverables";
import PreviewBilledBy from "../components/previewPane/PreviewBilledBy";
import PreviewBilledTo from "../components/previewPane/PreviewBilledTo";
import PreviewDates from "../components/previewPane/PreviewDates";
import { StyleSheet } from "@react-pdf/renderer";
import PreviewAdditionalFields from "@/components/previewPane/PreviewAdditionalFields";

const styles = StyleSheet.create({
	page: {
		paddingBottom: 10,
	},
	header: {
		paddingLeft: 8,
		paddingRight: 8,
		paddingBottom: 0,
		borderBottomLeftRadius: 32,
		borderBottomRightRadius: 32,
		justifyContent: "space-between",
		display: "flex",
		alignItems: "center",
	},
	headerTitle: {
		marginLeft: "1.25rem",
		fontSize: 26,
		fontWeight: "700",
	},
	midSection: {
		padding: "0px 28px",
	},
	midFirstSection: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		width: "100%",
		gap: 20,
	},
	logo: {
		marginRight: "2rem",
		width: 128,
		height: 128,
		borderRadius: 8,
	},
	logoImg: {
		objectFit: "cover",
		height: "100%",
		width: "100%",
	},
	billSection: {
		display: "flex",
		flexDirection: "row",
		alignItems: "flex-start",
		width: "100%",
		marginTop: "0.75rem",
		gap: 16,
	},
	invoiceDatesContainer: {
		maindiv: {
			display: "flex",
			flexDirection: "column",
			backgroundColor: "#F5F5F5",
			width: 360,
			borderRadius: 12,
			paddingLeft: 16,
			paddingRight: 16,
			paddingTop: 24,
			paddingBottom: 24,
			gap: 8,
		},
		invoiceDatesTitle: {
			fontWeight: "600",
			color: "#7C3AED",
			fontSize: 20,
		},
		invoiceDatesRow: {
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 16,
		},
		invoiceDateslabel: {
			fontSize: 14,
			fontWeight: "600",
			color: "#374151",
		},
		invoiceDatesValue: {
			fontSize: 14,
			fontWeight: "600",
		},
	},
	BilledContainer: {
		mainDiv: {
			backgroundColor: "#F5F5F5",
			borderRadius: 12, // rounded-lg ~ 12px
			paddingLeft: 16, // px-4 = 16px
			paddingRight: 16,
			paddingTop: 24, // py-6 = 24px
			paddingBottom: 24,
			display: "flex",
			flexDirection: "column",
			width: "100%",
			gap: 4,
		},
		sectionTitle: {
			fontWeight: 600, // font-semibold
			color: "#7C3AED", // text-violet-600
			fontSize: 20, // md:text-xl = 20px
		},
		value: {
			fontSize: 16, // text-md = 16px
			fontWeight: 600, // font-semibold
		},
		row: {
			display: "flex",
			gap: 8, // space-x-2 = 8px
		},
	},
	footer: {
		backgroundColor: "#FFFFFF",
		display: "flex",
		flexDirection: "column",
		borderTopLeftRadius: 32,
		borderTopRightRadius: 32,
		// minHeight: "100vh",
	},
	deliverableStyles: {
		container: {
			flex: 1,
			paddingLeft: 32,
			paddingRight: 32, // px-8 = 32px
			paddingTop: 16, // pt-4 = 16px
		},
		title: {
			fontSize: 24, // text-xl = 24px
			color: "#7C3AED", // text-violet-600
			fontWeight: 600, // font-semibold
			marginBottom: 16, // mb-4 = 16px
		},
		headerRow: {
			display: "flex",
			alignItems: "center",
			borderBottom: "2px solid #6B7280", // border-b-2 border-b-gray-500
			backgroundColor: "#F3F4F6", // bg-gray-100
			marginBottom: 8, // mb-2 = 8px
			fontWeight: 600,
			color: "#6B7280", // text-gray-500
			padding: 8, // p-2 = 8px
			borderTopLeftRadius: 6, // rounded-t ~ 6px
			borderTopRightRadius: 6,
		},
		colName: {
			flex: 2,
			minWidth: 100,
			// For responsive min-width, use JS or media queries
		},
		colQty: {
			flex: 1,
			textAlign: "center",
		},
		colPrice: {
			flex: 1,
			textAlign: "end",
		},
		itemRow: {
			marginBottom: 8, // mb-2 = 8px
			display: "flex",
			fontWeight: 600,
			backgroundColor: "#E8F9FF",
			alignItems: "center",
			borderRadius: 4, // rounded-sm ~ 4px
		},
		itemCell: {
			padding: "12px 8px", // p-2 py-3
		},
		summaryCol: {
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			justifyContent: "flex-end",
			marginTop: 24, // mt-6 = 24px
		},
		summaryRow: {
			display: "flex",
			gap: 16, // gap-4 = 16px
			padding: 8, // p-2 = 8px
			fontWeight: 600,
		},
		hr: {
			margin: "8px 0", // my-2 = 8px
			borderColor: "#111827", // border-gray-900
			borderWidth: 1,
			borderStyle: "solid",
		},
		totalBox: {
			padding: 8, // p-2 = 8px
			display: "flex",
			flexDirection: "column",
			alignItems: "flex-end",
			justifyContent: "flex-end",
			backgroundColor: "#86EFAC", // bg-green-300
			borderRadius: 8,
		},
		totalRow: {
			display: "flex",
			gap: 16,
			fontWeight: "bold",
		},
	},
	footerInside: {
		footerContainer: {
			display: "flex",
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			paddingLeft: 24, // px-6 = 24px
			paddingRight: 24,
			paddingTop: 12, // p-3 = 12px
			paddingBottom: 12, // bg-gray-200
			width: "100%",
			marginTop: 16,
			fontWeight: 600,
		},
		logo: {
			objectFit: "cover",
			width: 128, // w-32 = 128px
			height: 128, // h-32 = 128px
		},
	},
});

export default function PreviewPane({
	setFieldsEnabled,
	contentRef,
	reactToPrintFn,
	invoice,
}) {
	return (
		<div>
			<div id='invoice-preview' ref={contentRef} style={styles.page}>
				<div>
					<div style={styles.header}>
						<h2 style={styles.headerTitle}>{invoice.invoiceTitle}</h2>
						<div style={styles.logo}>
							{invoice.logo && invoice.logo.length > 1 && (
								<img
									style={styles.logoImg as React.CSSProperties}
									src={invoice.logo}
									alt='logo'
								/>
							)}
						</div>
					</div>
					<div style={styles.midSection}>
						<div style={styles.midFirstSection}>
							{/*  Invoice details */}
							<PreviewDates
								invoice={invoice}
								style={styles.invoiceDatesContainer}
							/>
							<div
								style={
									styles.invoiceDatesContainer.maindiv as React.CSSProperties
								}
							>
								<h2 style={styles.invoiceDatesContainer.invoiceDatesTitle}>
									Wiring Details
								</h2>
								<div
									style={
										styles.invoiceDatesContainer
											.invoiceDatesRow as React.CSSProperties
									}
								>
									<h2 style={styles.invoiceDatesContainer.invoiceDateslabel}>
										Holder Name
									</h2>
									<p style={styles.invoiceDatesContainer.invoiceDatesValue}>
										{invoice.holderName}
									</p>
								</div>
								<div
									style={
										styles.invoiceDatesContainer
											.invoiceDatesRow as React.CSSProperties
									}
								>
									<h2 style={styles.invoiceDatesContainer.invoiceDateslabel}>
										Bank Name
									</h2>
									<p style={styles.invoiceDatesContainer.invoiceDatesValue}>
										{invoice.bankName}
									</p>
								</div>
								<div
									style={
										styles.invoiceDatesContainer
											.invoiceDatesRow as React.CSSProperties
									}
								>
									<h2 style={styles.invoiceDatesContainer.invoiceDateslabel}>
										Account Number
									</h2>
									<p style={styles.invoiceDatesContainer.invoiceDatesValue}>
										{invoice.accountNumber}
									</p>
								</div>
							</div>
						</div>

						<div style={styles.billSection}>
							{/* Billed To */}
							<PreviewBilledTo
								invoice={invoice}
								style={styles.BilledContainer}
							/>

							{/* Billed By */}
							<PreviewBilledBy
								invoice={invoice}
								style={styles.BilledContainer}
							/>
						</div>
					</div>

					<div style={styles.footer}>
						<PreviewDeliverables
							invoice={invoice}
							style={styles.deliverableStyles}
						/>
					</div>
					<div
						style={{
							display: "flex",
							padding: "0px 28px",
							marginTop: 10,
							flexDirection: "row",
							justifyContent: "space-between",
							gap: 50,
						}}
					>
						<PreviewAdditionalFields invoice={invoice} />
					</div>
				</div>
			</div>
		</div>
	);
}
