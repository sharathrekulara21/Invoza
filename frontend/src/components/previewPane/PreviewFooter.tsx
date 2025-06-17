import React from "react";

interface Props {
	invoice: invoice;
	style: style;
}

function PreviewFooter({ invoice, style }: Props) {
	return (
		<div style={style.footerContainer}>
			<div>
				<h1>Contact Details</h1>
				<p>{invoice.billerName}</p>
				<p>{invoice.billerMobile}</p>
				{invoice.billerEmail && <p>{invoice.billerEmail}</p>}
			</div>
			<div>
				<h1>Wiring Details</h1>
				<p>{invoice.billerName}</p>
				<p>Bank Name: HDFC bank</p>
				<p>Acc No: 0987654321</p>
			</div>
		</div>
	);
}

export default PreviewFooter;
