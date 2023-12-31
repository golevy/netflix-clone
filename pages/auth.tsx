import axios from "axios"
import { useCallback, useState } from "react"
import Input from "~/components/Input"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import Head from "next/head"

const Auth = () => {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [variant, setVariant] = useState("login")

  const isLoginWithGoogleEnabled = false

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    )
  }, [])

  const login = useCallback(async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      })

      if (result?.error) {
        console.error(result.error)
      }
    } catch (error) {
      console.log(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      })

      setVariant("login")
    } catch (error) {
      console.log(error)
    }
  }, [email, name, password, login])

  return (
    <>
      <Head>
        <title>Login | Register</title>
        <meta name="description" content="Login | Register" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative h-screen w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <div className="bg-black w-full h-full lg:bg-opacity-50">
          <nav className="px-12 py-5">
            <img src="/images/logo.png" alt="Logo" className="h-12" />
          </nav>
          <div className="flex justify-center">
            <div className="bg-black bg-opacity-70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
              <h2 className="text-white text-4xl mb-8 font-semibold">
                {variant === "login" ? "Sign in" : "Register"}
              </h2>
              <div className="flex flex-col gap-4">
                {variant === "register" && (
                  <Input
                    label="Username"
                    id="name"
                    value={name}
                    onChange={(e: any) => setName(e.target.value)}
                  />
                )}
                <Input
                  label="Email"
                  id="email"
                  value={email}
                  onChange={(e: any) => setEmail(e.target.value)}
                  type="email"
                />
                <Input
                  label="Password"
                  id="password"
                  value={password}
                  onChange={(e: any) => setPassword(e.target.value)}
                  type="password"
                />
              </div>
              <button
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
                onClick={variant === "login" ? login : register}
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex items-center gap-4 mt-8 justify-center">
                {isLoginWithGoogleEnabled && (
                  <div
                    onClick={() =>
                      signIn("google", { callbackUrl: "/profiles" })
                    }
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  >
                    <FcGoogle size={30} />
                  </div>
                )}
                <div
                  onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "register" ? "Login" : "Create an account"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth
