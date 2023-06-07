import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { apiCall } from '../api/apiCall'
import ReactLoading from 'react-loading';
import Link from 'next/link';

export default function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [successfulMessage, setSuccessfulMessage] = useState('')

    // If the user is already authenticated, redirect to a todo list page
    useEffect(() => {
        if (!router.isReady) return
        if (isAuthenticated()) {
            // If the user is already authenticated, redirect to a todo list page
            router.push('/todos/tasks')
        }
    }, [router])

    const isAuthenticated = () => {
        // Implement your authentication logic here
        // You can check if the user has a valid token or session
        // Return true if authenticated, false otherwise
        const token = localStorage.getItem('token')
        return !!token
    }

    const handleSubmit = async (evt: any) => {
        evt.preventDefault()

        try {
            const registerData = await apiCall('POST', 'register', { username, password, }, false)
            setIsSuccess(true)
            setSuccessfulMessage(registerData.message)
            // Redirect to the login page after successfully register
            await setTimeout(async () => {
                router.push('/auth/signin', undefined, { shallow: true })
            }, 3000)
        } catch (error) {
            setUsername('')
            setPassword('')
            setError('User has already existed!')
        }
    }

    return (
        <div className="flex justify-center align-middle">
            <div className="flex absolute justify-center w-full h-2/3 top-1/4">
                {isSuccess ? (
                    <div className='flex flex-col justify-center'>
                        <h1 className='text-center font-bold text-3xl'>{successfulMessage}</h1>
                        <h2 className='text-center font-bold text-xl text-gray-400'>
                            Redirect to login page...
                        </h2>
                        <div className='w-full h-full flex justify-center'>
                            <ReactLoading type='cylon' color='#0ea5e9' height={800} width={350} />
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
                                Register
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
                                    className="w-3/12 p-2 rounded-full bg-gradient-to-r from-indigo-600 hover:bg-gradient-to-r hover:from-transparent hover:to-sky-700 text-black"
                                    type="submit"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <Link
                                className="text-center text-sky-500 hover:underline italic"
                                href="/auth/signin"
                            >
                                Already have account!
                            </Link>
                        </form>
                    </div>
                )}
            </div>
        </div>
    )
}
