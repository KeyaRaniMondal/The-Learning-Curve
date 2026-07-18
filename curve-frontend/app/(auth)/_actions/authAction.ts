"use server"

type registerState = {
    success : boolean,
    statusCode : number,
    message : string
}
export const registerAction = async ( prevState: registerState,formData: FormData) => {
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

// export const loginAction = async (prevState:LoginState ,formData: FormData) => {
//     const email = formData.get('email')
//     const password = formData.get('password')
//     const payload = {
//         email, password
//     }
//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(payload)
//     })
//     return await res.json()
// }

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

    return await res.json();
  } catch {
    return {
      success: false,
      statusCode: 500,
      message: "Something went wrong",
    };
  }
}