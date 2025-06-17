import React from "react";

type Props = {
	invoice: invoice;
	style: style;
};

function PreviewBilledBy({ invoice, style }: Props) {
	return (
		<div style={style.mainDiv}>
			<h2 style={style.sectionTitle}>Billed By</h2>
			{invoice.billerAddress?.country?.name.trim() && (
				<p style={style.value}>{invoice.billerAddress?.country.name}</p>
			)}
			{invoice.billerName?.trim() && (
				<p style={style.value}>{invoice.billerName}</p>
			)}
			{invoice.billerAddress?.street?.trim() && (
				<p style={style.value}>{invoice.billerAddress?.street}</p>
			)}

			<div style={style.row}>
				{invoice.billerAddress?.city?.trim() && (
					<p style={style.value}>{invoice.billerAddress?.city}</p>
				)}
				{invoice.billerAddress?.postalCode?.trim() && (
					<p style={style.value}>{invoice.billerAddress?.postalCode}</p>
				)}
			</div>
			{invoice.billerAddress?.state?.trim() && (
				<p style={style.value}>{invoice.billerAddress?.state}</p>
			)}
			{invoice.billerMobile?.trim() && (
				<p style={style.value}>{invoice.billerMobile}</p>
			)}
			{invoice.billerEmail?.trim() && (
				<p style={style.value}>{invoice.billerEmail}</p>
			)}
		</div>
	);
}

export default PreviewBilledBy;
