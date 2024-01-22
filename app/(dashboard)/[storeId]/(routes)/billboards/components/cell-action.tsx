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
import { MoreHorizontal } from "lucide-react";
  

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
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    )

}