'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const LoginForm = () => {
    return (
        <div>
            <Card>
                <Input type="email" name="email" placeholder="enter your email" required/>
                <Input type="password" name="password" placeholder="enter your password" required/>
                <Button type="submit">Login</Button>
            </Card>
        </div>
    );
};

export default LoginForm;