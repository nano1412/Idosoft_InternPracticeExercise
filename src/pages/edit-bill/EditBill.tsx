import { useState } from 'react'
import { useParams } from 'react-router'

// import './App.css'

function EditBill() {
  const { id } = useParams()

  return(
    <>
      <h1>Hello from edit bill</h1>
      <p>the id is {id}</p>
    </>
  )
}

export default EditBill
