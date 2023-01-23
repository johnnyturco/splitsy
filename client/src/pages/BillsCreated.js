import React, {useEffect} from 'react';

function BillsCreated() {

useEffect(() => {
  fetch("/bills")
    .then((r) => r.json())
    .then(data => console.log(data))
}, [])

  return <h1>BillsCreated Page</h1>
}

export default BillsCreated;