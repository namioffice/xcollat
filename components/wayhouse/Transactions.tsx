import React from 'react'
import Link from "next/link";
import TransactionTable from './Table';


export default function Transactions() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-sm md:text-xl text-white"> <span className=''>Recent</span> transactions</h1>
       <Link href={"/transactions"}>
       <div className="border border-(--color3) text-(--color1) bg-(--color2) w-[100px] p-1 text-xs  rounded cursor-pointer text-center hover:bg-indigo-50 ">
          View All
        </div>
       </Link>
      </div>

      {/* tables */}
      <div className="">
        <TransactionTable/>
      </div>
    </div>
  )
}
