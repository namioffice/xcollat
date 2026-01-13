import React from 'react'
import CollateralVault from '@/components/dasboardItems/LoanApply'
import ActiveLoan from '@/components/dasboardItems/ActiveLoan'



export default function page() {
  return (
    <div>
      <CollateralVault/>
      <ActiveLoan/>
    </div>
  )
}
