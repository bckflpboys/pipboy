"use client"

import { signIn, ClientSafeProvider } from "next-auth/react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

type SignInComponentProps = {
  providers: Record<string, ClientSafeProvider> | null
}

export default function SignInComponent({ providers }: SignInComponentProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
        console.error("Sign-in error:", result.error)
      } else {
        router.push("/")
      }
    } catch (error) {
      setError("Something went wrong")
      console.error("Unexpected error:", error)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md space-y-8 bg-black/50 backdrop-blur-lg p-8 rounded-2xl border border-gray-800"
    >
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="relative block w-full rounded-lg border-0 bg-gray-900/50 py-3 px-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all duration-200"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="relative block w-full rounded-lg border-0 bg-gray-900/50 py-3 px-4 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6 transition-all duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg"
          >
            {error}
          </motion.div>
        )}

        <div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="group relative flex w-full justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all duration-200"
          >
            Sign in
          </motion.button>
        </div>
      </form>

      <div className="mt-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-black px-4 text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          {Object.values(providers || {}).map((provider: ClientSafeProvider) => {
            if (provider.id === "credentials") return null
            return (
              <motion.div 
                key={provider.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button
                  className="flex w-full items-center justify-center space-x-2 rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  {provider.name === "Google" && (
                    <Image
                      src="/google.svg"
                      alt="Google logo"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
                  )}
                  Sign in with {provider.name}
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      <p className="mt-4 text-center text-sm text-gray-400">
        Don’t have an account?{" "}
        <Link
          href="/auth/signup"
          className="font-medium text-blue-500 hover:text-blue-400 transition-colors duration-200"
        >
          Sign up
        </Link>
      </p>
    </motion.div>
  )
}
