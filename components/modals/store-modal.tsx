"use client";
// global
import * as Z from "zod";
import { useState } from "react"; 
import axios from "axios";

// local
import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const formSchema = Z.object({
  name: Z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);

  const form = useForm<Z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: Z.infer<typeof formSchema>) => {
   try{
    setLoading(true);
    const response = await axios.post("/api/stores", values);
    console.log(response.data);
    window.location.assign(`/${response.data.id}`)

   }
   catch(error)
   {
    console.log(error);
    toast.error("Soemthing went wrong❌");
   }
   finally
   {
    setLoading(false);
    storeModal.onClose();
   }
  };

  
  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder="E-commerce" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button disabled={loading} variant={"outline"} onClick={storeModal.onClose}>
                      Cancel
                    </Button>
                    <Button disabled={loading} type="submit" variant={"default"}>
                      Continue
                    </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
