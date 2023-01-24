import { Link } from 'react-router-dom';

function BillCard({ bill }) {

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