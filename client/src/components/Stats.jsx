import React from 'react'

function Stats({month, data}) {



  return (
   <>
    <div className='flex justify-center my-5'>
        <div className='w-1/2 bg-yellow-200 p-4 rounded'>
        <div className="text-center text-3xl">Statistics - {month}</div>

        <div className="flex justify-between">
            <span className='text-2xl'>Total Sales</span>
            <span className='text-2xl'>{Number(data.totalSales || 0).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
            <span className='text-2xl'>Total sold items</span>
            <span className='text-2xl'>{data?.soldItems}</span>
        </div>
        <div className="flex justify-between">
            <span className='text-2xl'>Total not sale</span>
            <span className='text-2xl'>{data?.notSoldItems}</span>
        </div>
        </div>
    </div>
   </>
  )
}

export default Stats