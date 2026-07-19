'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useActionState, useEffect } from "react";
import { loginAction } from "../_actions/authAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
    const [state, action, pending] = useActionState(loginAction, false)
    const router = useRouter()
    useEffect(() => {
        if (!state) return;

        if (state.success) {
            console.log(state)
            toast.success(state.message || "Login Successful");
            router.push("/dashboard")
        }

        if (!state.success) {
            console.log(state)
            toast.error(state.message || "Login failed");
        }
    }, [state, router]);
    return (
        <form action={action} className="space-y-4">
            <Card>
                <Input type="email" name="email" placeholder="enter your email" required />
                <Input type="password" name="password" placeholder="enter your password" required />
                <Button type="submit">
                    {
                        pending ? "Submitting" : "Login"
                    }
                </Button>
            </Card>
        </form>
    );
};

export default LoginForm;