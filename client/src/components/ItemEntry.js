

function ItemEntry({item, preTaxTotal, taxAndTipAmount}) {

  const amountOwed = ((item.item_amount / preTaxTotal) * taxAndTipAmount) + item.item_amount

  return (
    <section>
      <h4>{item.item_note}</h4>
      <p>Paid? {item.settled ? "true" : "false"}</p>
      <p>Item Amount: ${item.item_amount}</p>
      <p>Amount Owed: ${amountOwed}</p>
      ---------------------------
    </section>
  )
}

export default ItemEntry;