"use client"

import { signIn } from "next-auth/react"
import Image from "next/image"

export default function SignInComponent({ providers }: any) {
  return (
    <div className="flex flex-col items-center">
      {Object.values(providers || {}).map((provider: any) => (
        <div key={provider.name}>
          <button
            className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
        </div>
      ))}
    </div>
  )
}
