import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
    return (
        <main
            className={`flex flex-col items-center justify-between p-24 h-screen`}
        >
            <div className="relative flex place-items-center after:absolute after:-z-20 after:h-[200px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40">
                <Image
                    className="relative"
                    src="/to-do.png"
                    alt="Todo Logo"
                    width={300}
                    height={37}
                    priority
                />
            </div>

            <div className="flex justify-between w-1/3 h-3/5">
                <Link href="/auth/signup">
                    <button className="border-0 rounded-lg p-4 bg-gradient-to-r from-indigo-800 hover:bg-gradient-to-r hover:from-transparent hover:to-sky-500 text-xl">
                        Sign Up
                    </button>
                </Link>

                <Link href="/auth/signin">
                    <button className="border-0 rounded-lg p-4 bg-gradient-to-r from-teal-700 hover:bg-gradient-to-r hover:from-transparent hover:to-green-500 text-xl">
                        Sign In
                    </button>
                </Link>
            </div>
        </main>
    )
}
