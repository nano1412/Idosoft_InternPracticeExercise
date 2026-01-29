import { useState } from 'react'
import { useParams } from 'react-router'
import type { Bill } from '../components/types';

type Props = {
  bills:Bill[];
  editBills: any;
};

function EditBill({bills, editBills}:Props) {
  const bill = bills
  const { id } = useParams()

  return(
    <>
      <h1>Hello from edit bill</h1>
      <p>the id is {id}</p>
    </>
  )
}

export default EditBill
