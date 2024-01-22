import React from 'react'
import {format} from 'date-fns'
import BillBoardClient from './components/client'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'

const BillboardsPage = async ({params}:{params:{stroeId:string}}) => {

  const billboards = await prismadb.billboard.findMany({

    where:{
      storeId:params.stroeId
    },
    orderBy:{
      createdAt:'desc'
    }
  })

  console.log(billboards)

  const formattedBillboards: BillboardColumn[] = billboards.map((billboard) => ({
  id: billboard.id,
  label: billboard.label,
  createdAt:format(billboard.createdAt , "MMMM do, yyyy")
  }))



  return (
    <div className="flex-col space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillboards} />
    </div>
  )
}

export default BillboardsPage