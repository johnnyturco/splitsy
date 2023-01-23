import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';

function Bills() {

  const { user } = useContext(UserContext);

  // useEffect(() => {
  //   fetch(`http://localhost:3000/bills`)
  //     .then((r) => r.json())
  //     .then((bills) => console.log(bills));
  // }, [user]);

  return (
    <div></div>
  )
}

export default Bills;