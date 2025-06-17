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
						<p style={{ ...style.itemCell, ...style.colPrice }}>{item.price}</p>
					</div>
				))}
			</div>
			<div style={style.summaryCol}>
				{invoice.discount !== 0 && (
					<div style={style.summaryRow}>
						<h2>Discount</h2>
						<h2>- {invoice.discount}</h2>
					</div>
				)}
				{invoice.advancePaid !== 0 && (
					<div style={style.summaryRow}>
						<h2>Advance</h2>
						<h2>- {invoice.advancePaid}</h2>
					</div>
				)}
			</div>
			<hr style={style.hr} />
			<div style={style.totalBox}>
					<div style={style.totalRow}>
						<h2>TOTAL</h2>
						<h2>{invoice.total}</h2>
					</div>
			</div>
		</div>
	);
};

export default PreviewDeliverables;
