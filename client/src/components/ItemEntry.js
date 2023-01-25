

function ItemEntry({item, preTaxTotal, taxAndTipAmount, currencyFormatter}) {

  const amountOwed = ((item.item_amount / preTaxTotal) * taxAndTipAmount) + item.item_amount

  return (
    <section>
      <h4>{item.item_note}</h4>
      <p>Paid? {item.settled ? "true" : "false"}</p>
      <p>Item Amount: {currencyFormatter.format(item.item_amount)}</p>
      <p>Amount Owed: {currencyFormatter.format(amountOwed)}</p>
      ---------------------------
    </section>
  )
}

export default ItemEntry;