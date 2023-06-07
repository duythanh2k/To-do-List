import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
import ReactLoading from 'react-loading';
import Link from 'next/link';

export default function SignIn() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)

    // If the user is already authenticated, redirect to a todo list page
    // useEffect(() => {
    //     if (!router.isReady) return
    //     if (isAuthenticated()) {
    //         // If the user is already authenticated, redirect to a todo list page
    //         router.push('/todos/tasks')
    //     }
    // }, [router])

    // const isAuthenticated = () => {
    //     // Implement your authentication logic here
    //     // You can check if the user has a valid token or session
    //     // Return true if authenticated, false otherwise
    //     const token = localStorage.getItem('token')
    //     return !!token
    // }

    const handleSubmit = async (evt: any) => {
        evt.preventDefault()

        try {
            const loginData = await apiCall('POST', 'login', { username, password, }, false)
            // const res = await axios({
                // method: 'POST',
                // url: `${process.env.NEXT_PUBLIC_API_URL}/login`,
                // data: {username, password}
            // })
            const token = loginData.access_token
            // Store the token in local storage or other secure storage
            localStorage.setItem('access_token', token)
            // Check if successful
            setIsSuccess(true)
            // Redirect to the todo page after successfully authorized
            await setTimeout(async () => {
                router.push('/todos/tasks', undefined, { shallow: true })
            }, 3000)
        } catch (error) {
            setPassword('')
            setError('Invalid username or password!')
        }
    }

    return (
        <div className="flex justify-center align-middle">
            <div className="flex absolute justify-center w-full h-2/3 top-1/4">
                {isSuccess ? (
                    <div className='flex flex-col justify-center'>
                        <h1 className='text-center font-bold text-3xl'>Login Successfully!</h1>
                        <h2 className='text-center font-bold text-xl text-gray-400'>
                            Ready to schedule...
                        </h2>
                        <div className='w-full h-full flex justify-center'>
                            <ReactLoading type='cylon' color='#22c45e' height={800} width={350} />
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center w-3/12 h-3/5 bg-slate-200 shadow-inner shadow-black border-0 rounded-xl">
                        <form
                            className="flex flex-col justify-between align-middle w-11/12 pt-8 pb-4"
                            onSubmit={handleSubmit}
                        >
                            {error && <p className='text-red-600'>{error}</p>}
                            <h1 className="text-center text-4xl text-black font-bold">
                                Login
                            </h1>
                            <input
                                className="text-black p-1 pl-3 pr-3 border-0 rounded-full shadow-inner shadow-black"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(evt) => setUsername(evt.target.value)}
                                required
                            />
                            <input
                                className="text-black p-1 pl-3 pr-3 border-0 rounded-full shadow-inner shadow-black"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(evt) => setPassword(evt.target.value)}
                                required
                            />
                            <div className="flex justify-center top-3/4">
                                <button
                                    className="w-3/12 p-2 rounded-full bg-gradient-to-r from-teal-600 hover:bg-gradient-to-r hover:from-transparent hover:to-green-800 text-black"
                                    type="submit"
                                >
                                    Sign In
                                </button>
                            </div>
                            <p className="text-black italic">
                                Do not have account yet?{' '}
                                <Link
                                    className="text-sky-500 hover:underline"
                                    href="/auth/signup"
                                >
                                    Create now!
                                </Link>
                            </p>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
