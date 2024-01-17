"use client";
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';  
import React from 'react';

const BillBoardClient = () => {
    const router = useRouter();
    const params = useParams();  

    const navigateToAddNew = () => {
        router.push(`/${params.storeId}/billboards/new`);
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title='Billboards(0)'
                    description='Manage Billboards for your store'
                />
                <Button onClick={navigateToAddNew} >  
                    <Plus className="mr-2 h-4 w-4" />
                    Add New
                </Button>
            </div>
            <Separator/>
        </>
    );
};

export default BillBoardClient;
