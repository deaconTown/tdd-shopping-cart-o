import React, { FC, useState } from 'react'
import SharedLayout from './sharedLayout';
import { useRouter } from 'next/router';

interface Props {

}

const Login: FC<Props> = ({ }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);

    const router = useRouter();

    const onEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const emailInput = event.currentTarget.value;

        setEmail(emailInput);
    }

    const onPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const passwordInput = event.currentTarget.value;

        setPassword(passwordInput);
    }


    async function postLogin() {
        const payload = { email, password };

        try {
            const response = await fetch('api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.log("response", response)
                    setShowToast(true);
                }

                setTimeout(() => {
                    setShowToast(false);
                }, 5000);
    
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            console.log("login response", data);

            router.push('/');


        } catch (error) {
            console.error("Error:", error);
        }
    }

    const onSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();

        postLogin()

        console.log('login submit clicked');
    }

    return (

        // <SharedLayout>
        <div>
            {showToast &&
                <div id="toast-danger" className="flex absolute top-5 right-5 items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow  border border-[#003d29]" role="alert">
                    <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                        </svg>
                        <span className="sr-only">Error icon</span>
                    </div>
                    <div className="ms-3 text-sm font-normal">Authentication failed</div>
                    <button onClick={() => setShowToast(false)} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white " data-dismiss-target="#toast-danger" aria-label="Close">
                        <span className="sr-only">Close</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                    </button>
                </div>
            }
            <form className="max-w-sm mx-auto h-full mb-28 mt-32">
                <h1 className='text-5xl mb-6'>Login</h1>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                    <input onChange={onEmailInput} type="email" id="email" className="block w-full p-4 text-white border  border-[#003d29] rounded-lg bg-[#003d29] sm:text-md focus:ring-blue-500 focus:border-blue-500 " placeholder="name@flowbite.com" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input onChange={onPasswordInput} type="password" id="password" className="block w-full p-4 text-white border border-[#003d29] rounded-lg bg-[#003d29] sm:text-md focus:ring-blue-500 focus:border-blue-500" required />
                    {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> Username already taken!</p> */}
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-[#003d29] rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required/>
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button onClick={(e) => onSubmit(e)} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
        </div>

        // </SharedLayout>

    )
}

export default Login;