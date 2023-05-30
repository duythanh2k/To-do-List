import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function SignUp() {
    const router = useRouter()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (evt: any) => {
        evt.preventDefault()

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/register`,
                {
                    username,
                    password,
                }
            )
            const token = res.data.access_token
            // Store the token in local storage or other secure storage
            localStorage.setItem('token', token)
            // Redirect to the todo page after successfully authorized
            router.push('/todos/tasks', undefined, { shallow: true })
        } catch (error) {
            setUsername('')
            setPassword('')
            console.error(error)
        }
    }

    return (
        <div className="flex justify-center align-middle">
            <div className="flex absolute justify-center w-full h-2/3 top-1/4">
                <div className="flex justify-center w-3/12 h-3/5 bg-slate-200 shadow-inner shadow-black border-0 rounded-xl">
                    <form
                        className="flex flex-col justify-between align-middle w-11/12 pt-8 pb-4"
                        onSubmit={handleSubmit}
                    >
                        {error && <p>{error}</p>}
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
                        <a
                            className="text-center text-sky-500 hover:underline italic"
                            href="/auth/signin"
                        >
                            Already have account!
                        </a>
                    </form>
                </div>
            </div>
        </div>
    )
}
