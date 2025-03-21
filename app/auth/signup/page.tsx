import { getProviders } from "next-auth/react"
import SignUpComponent from "./SignUpComponent"

export default async function SignUp() {
  const providers = await getProviders()

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen flex flex-col items-center justify-center py-2">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-black to-black" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center space-y-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-600">
            Create an Account
          </h1>
          <SignUpComponent providers={providers} />
        </div>
      </div>
    </div>
  )
}
