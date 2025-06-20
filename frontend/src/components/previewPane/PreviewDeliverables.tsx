import React from "react";

type Props = {
	invoice: invoice;
	style: style;
};

const PreviewDeliverables = ({ invoice, style }: Props) => {
	return (
		<div style={style.container}>
			<h2 style={style.title}>Deliverables</h2>
			<div style={style.headerRow}>
				<div style={style.colName}>Name</div>
				<div style={style.colQty}>Quantity</div>
				<div style={style.colPrice}>Price</div>
			</div>
			<div>
				{invoice.items?.map((item, idx) => (
					<div key={item.id} style={style.itemRow}>
						<p style={{ ...style.itemCell, ...style.colName }}>{item.name}</p>
						<p style={{ ...style.itemCell, ...style.colQty }}>
							{item.quantity}
						</p>
						<p style={{ ...style.itemCell, ...style.colPrice }}>
							<div style={style.deliveryCurrency}>
								<span style={{ fontWeight: 500, fontSize: 13 }}>
									{invoice.currency}
								</span>
								<h2 style={{ fontWeight: 600 }}>{item.price}</h2>
							</div>
						</p>
					</div>
				))}
			</div>
			<div style={style.summaryCol}>
				{invoice.discount !== 0 && (
					<div style={style.summaryRow}>
						<h2>Discount</h2>
						<div style={style.deliveryCurrency}>
							<span style={{ fontWeight: 500, fontSize: 13 }}>
								{invoice.currency}
							</span>
							<h2 style={{ fontWeight: 600 }}>- {invoice.discount}</h2>
						</div>
					</div>
				)}
				{invoice.advancePaid !== 0 && (
					<div style={style.summaryRow}>
						<h2>Advance</h2>
						<div style={style.deliveryCurrency}>
							<span style={{ fontWeight: 500, fontSize: 13 }}>
								{invoice.currency}
							</span>
							<h2 style={{ fontWeight: 600 }}>- {invoice.advancePaid}</h2>
						</div>
					</div>
				)}
				{invoice.tax !== 0 && (
					<div style={style.summaryRow}>
						<h2>Tax</h2>
						<div style={style.deliveryCurrency}>
							<span style={{ fontWeight: 500, fontSize: 13 }}>
								{invoice.currency}
							</span>
							<h2 style={{ fontWeight: 600 }}>{invoice.tax}</h2>
						</div>
					</div>
				)}
			</div>
			<hr style={style.hr} />
			<div style={style.totalBox}>
				<div style={style.totalRow}>
					<h2>TOTAL</h2>
					<div style={style.deliveryCurrency}>
						<span style={{ fontWeight: 500, fontSize: 13 }}>
							{invoice.currency}
						</span>
						<h2 style={{ fontWeight: 600 }}>{invoice.total}</h2>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PreviewDeliverables;
