"use client";

import { Button } from "@/components/ui/button";
import { BillboardColumn } from "./columns";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
  

interface CellActionProps{
    data: BillboardColumn

}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    return(
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} className="h-8 w-8 p-0" >
                <span className="sr-only">Open Menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Copy className="mr-2 h-4 w-4" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
          
        </DropdownMenuContent>
      </DropdownMenu>
      
    )

}