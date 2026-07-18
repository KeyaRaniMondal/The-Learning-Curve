"use server"

import { cookies } from "next/headers"

type registerState = {
    success: boolean,
    statusCode: number,
    message: string
}
export const registerAction = async (prevState: registerState, formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')

    const payload = {
        name, email, password
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return res.json()
}


type LoginState = {
    success: boolean;
    statusCode: number;
    message: string;
};

export async function loginAction(
    prevState: LoginState,
    formData: FormData
) {
    try {
        const res = await fetch(
            `${process.env.BACKEND_API_URL}/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData.get("email"),
                    password: formData.get("password"),
                }),

            }

        );

        // return await res.json();

        //for setting up cookies
        const result = await res.json()
        console.log(result)
        if (result.success) {
            const cookieStore = await cookies()
            cookieStore.set("accessToken", result.data.accessToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: "lax",
            })
            cookieStore.set("refreshToken", result.data.refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: "lax",
            })
            return result
        }
    } catch {
        return {
            success: false,
            statusCode: 500,
            message: "Something went wrong",
        };
    }

}


