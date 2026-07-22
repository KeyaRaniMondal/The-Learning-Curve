"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import jwt, { JwtPayload } from "jsonwebtoken"

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


// type LoginState = {
//     success: boolean;
//     statusCode: number;
//     message: string;
//     data?: {
//         accessToken: string;
//         refreshToken: string;
//     };
// };

// export async function loginAction(
//     prevState: LoginState,
//     formData: FormData
// ): Promise<LoginState> {
//     let result: LoginState;

//     try {
//         const res = await fetch(
//             `${process.env.BACKEND_API_URL}/api/auth/login`,
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     email: formData.get("email"),
//                     password: formData.get("password"),
//                 }),
//             }
//         );

//         result = await res.json();
//     } catch {
//         return {
//             success: false,
//             statusCode: 500,
//             message: "Something went wrong",
//         };
//     }

//     if (result.success && result.data) {
//         const cookieStore = await cookies();
//         cookieStore.set("accessToken", result.data.accessToken, {
//             httpOnly: true,
//             maxAge: 60 * 60 * 24,
//             sameSite: "lax",
//         });
//         cookieStore.set("refreshToken", result.data.refreshToken, {
//             httpOnly: true,
//             maxAge: 60 * 60 * 24 * 7,
//             sameSite: "lax",
//         });

//         const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

//         // redirect() must be called OUTSIDE the try/catch,
//         // otherwise it gets swallowed as an error (it works by throwing NEXT_REDIRECT)
//         if (decodedToken?.role === "USER") {
//             redirect("/dashboard");
//         }
//         // else if (decodedToken.role === "ADMIN") {
//         //     redirect("/admin-dashboard");
//         // } else if (decodedToken.role === "AUTHOR") {
//         //     redirect("/author-dashboard");
//         // }
//     }

//     return result;
// }
// "use server"

// import jwt, { JwtPayload } from "jsonwebtoken"
// import { cookies } from "next/headers"
// import { redirect } from "next/navigation"

type LoginState = {
    success : true,
    statusCode : number,
    message : string,
    data : {
        accessToken : string,
        refreshToken : string
    }
}


export const loginAction = async (prevState : LoginState , formData: FormData) => {

    const email = formData.get("email");
    const password = formData.get("password");

    const payload = {
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(payload)
    });

    const result = await res.json();

    if(result.success){
        const cookieStore = await cookies()

        cookieStore.set("accessToken", result.data.accessToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24,
            sameSite : "lax",
        });
        cookieStore.set("refreshToken", result.data.refreshToken , {
            httpOnly : true,
            maxAge : 60 * 60 * 24 * 7,
            sameSite : "lax",
        });

        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

        if(decodedToken.role === "USER"){
            redirect("/dashboard");
        } else if (decodedToken.role === "ADMIN"){
            redirect("/admin-dashboard");
        } else if (decodedToken.role === "AUTHOR"){
            redirect("/author-dashboard");
        }
    }

    return result
}