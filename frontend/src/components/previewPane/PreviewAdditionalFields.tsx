import React from "react";

type Props = {};

function PreviewAdditionalFields({ invoice }: Props) {
	return (
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
			<div>
				{invoice.note.length > 1 && (
					<div>
						<h2 style={{ fontWeight: 600, fontSize: 16 }}>Note</h2>
						<p
							style={{
								fontWeight: 400,
								color: "rgb(156 163 175)",
								fontSize: 13,
							}}
						>
							{invoice.note}
						</p>
					</div>
				)}

				{invoice.terms.length > 1 && (
					<div>
						<h2 style={{ fontWeight: 600, fontSize: 16 }}>
							Terms and Conditions
						</h2>
						<p
							style={{
								fontWeight: 400,
								color: "rgb(156 163 175)",
								fontSize: 13,
							}}
						>
							{invoice.terms}
						</p>
					</div>
				)}
			</div>
			<div>
				{invoice.signatureImg ? (
					<img
						src={invoice.signatureImg}
						style={{ width: "192px", height: "96px" }}
					/>
				) : invoice.signature ? (
					<div
						style={{
							fontFamily: invoice.signatureFont,
							fontSize: 32,
							marginTop: 16,
							width: "192px",
							height: "96px",
						}}
					>
						{invoice.signature}
					</div>
				) : null}
			</div>
		</div>
	);
}

export default PreviewAdditionalFields;
