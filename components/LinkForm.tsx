"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { addLink } from "@/app/actions/form"

type  Response = {id:string,title:string,description:string,date:string}

const FormSchema = z.object({
  link: z.string().min(2, {
    message: "link must be at least 2 characters.",
  }),
})

export default function LinkkForm() {
    const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      link: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   await addLink(data.link).then((res:boolean)=>{
        if(res){
          toast({
            title: "You submitted the following values:",
            description: (
              <div className=" w-[340px] rounded-md bg-slate-950 p-4 text-white">
                {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
                <h1>Request submitted</h1>
              </div>
            ),
          })
          form.reset()
          router.push("/chat")
        }
        else{
            toast({
                // title: "You submitted the following values:",
                description: (
                  <div className=" w-[340px] rounded-md bg-slate-950 p-4 text-white">
                    {/* <code className="text-white">{JSON.stringify(data, null, 2)}</code> */}
                    <h1>Request not submitted</h1>
                  </div>
                ),
              })
              
        }
     
    })
    
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yt video Url</FormLabel>
              <FormControl>
                <Input placeholder="Enter the url here" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
