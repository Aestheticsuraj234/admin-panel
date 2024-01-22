"use client";
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Billboard } from '@prisma/client';

import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';  
import React from 'react';
import { BillboardColumn, columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

interface BillboardClientProps{
    data: BillboardColumn[]
}


const BillBoardClient:React.FC<BillboardClientProps> = ({data}) => {
    const router = useRouter();
    const params = useParams();  

    const navigateToAddNew = () => {
        router.push(`/${params.storeId}/billboards/new`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data?.length}) `}
                    description='Manage Billboards for your store'
                />
                <Button onClick={navigateToAddNew} >  
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator/>
            <DataTable searchKey='label' columns={columns} data={data} />
        </>
    );
};

export default BillBoardClient;
