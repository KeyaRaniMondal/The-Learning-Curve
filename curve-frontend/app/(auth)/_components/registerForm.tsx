"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { registerAction } from "../_actions/authAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"

const RegisterForm = () => {
     const [state,action,pending]=useActionState(registerAction,false)
     useEffect(()=> {
        if(!state) return;

        if(state.success){
            console.log(state)
            toast.success(state.message || "register Successful");
        //     // router.push("/dashboard")
        }

        if(!state.success){
            console.log(state)
            toast.error(state.message || "register failed");
        }
    }, [state]);
return (
    <form action={action} className="space-y-4">
        <Card className="p-5 space-y-4">
            <Input name="name" type="name" placeholder="Enter Your Name"/>
            <Input name="email" type="email" placeholder="Enter Your Email" required />
            <Input name="password" type="password" placeholder="Enter Your Password" required />
            <Button type="submit">
               {
                pending?"Submitting":"Register"
               } 
            </Button>
        </Card>
    </form>
  )
}

export default RegisterForm