import React from 'react'
import TransactionTable from '@/components/wayhouse/Table'

export default function page() {
  return (
    <div className='ml-2'>
       <h1 className="text-sm md:text-lg font-bold pb-4 text-white">Transactions</h1>
      <TransactionTable/>
    </div>
  )
}
