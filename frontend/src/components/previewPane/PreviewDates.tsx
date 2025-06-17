
type Props = { invoice: invoice; style: style };

function PreviewDates({ invoice, style }: Props) {
	return (
		<div style={style.maindiv}>
			<h1 style={style.invoiceDatesTitle}>Invoice Details</h1>
			<div style={style.invoiceDatesRow}>
				<h2 style={style.invoiceDateslabel}>Invoice Number</h2>
				<p style={style.invoiceDatesValue}>{invoice.invoiceNumber}</p>
			</div>
			<div style={style.invoiceDatesRow}>
				<h2 style={style.invoiceDateslabel}>Issue Date</h2>
				<p style={style.invoiceDatesValue}>
					{invoice.issueDate.substring(0, 10)}
				</p>
			</div>
			<div style={style.invoiceDatesRow}>
				<h2 style={style.invoiceDateslabel}>Due Date</h2>
				<p style={style.invoiceDatesValue}>{invoice.dueDate}</p>
			</div>
		</div>
	);
}

export default PreviewDates;
