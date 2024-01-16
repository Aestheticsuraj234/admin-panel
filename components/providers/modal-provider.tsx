"use client";
// global
import { useEffect , useState } from "react";

// local
import { StoreModal } from "@/components/modals/store-modal";

export const ModalProvider = ()=>{
    const [isMounted , setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[])

    if(!isMounted){
        return null;
    }

return (
    <>
    <StoreModal />
    </>
)
}