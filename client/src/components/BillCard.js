import { useHistory, Link } from 'react-router-dom';

function BillCard({ bill }) {

  const history = useHistory();

  function handleClick() {
    // history.push(`/bill-details/${bill.id}`)
  }

  return (
    <section>
      <Link to={`/bills/${bill.id}`}>
        <h2>{bill.title}</h2>
      </Link>
      <h5>{bill.date}</h5>
    </section>
  )
}

export default BillCard;