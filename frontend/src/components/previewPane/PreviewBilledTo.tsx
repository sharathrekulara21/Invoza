import React from "react";

type Props = { invoice: invoice; style: style };

function PreviewBilledTo({ invoice, style }: Props) {
	return (
		<div style={style.mainDiv}>
			<h2 style={style.sectionTitle}>Billed To</h2>
			{invoice.clientAddress?.country?.name.trim() && (
				<p style={style.value}>
					{invoice.clientAddress?.country.name}
				</p>
			)}
			{invoice.clientName?.trim() && (
				<p style={style.value}>{invoice.clientName}</p>
			)}
			{invoice.clientAddress?.street?.trim() && (
				<p style={style.value}>{invoice.clientAddress?.street}</p>
			)}
			<div style={style.row}>
				{invoice.clientAddress?.city?.trim() && (
					<p style={style.value}>{invoice.clientAddress?.city}</p>
				)}
				{invoice.clientAddress?.postalCode?.trim() && (
					<p style={style.value}>
						{invoice.clientAddress?.postalCode}
					</p>
				)}
			</div>
			{invoice.clientAddress?.state?.trim() && (
				<p style={style.value}>{invoice.clientAddress?.state}</p>
			)}
			{invoice.clientMobile?.trim() && (
				<p style={style.value}>{invoice.clientMobile}</p>
			)}
			{invoice.clientEmail?.trim() && (
				<p style={style.value}>{invoice.clientEmail}</p>
			)}
		</div>
	);
}

export default PreviewBilledTo;
