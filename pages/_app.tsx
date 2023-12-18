import "~/styles/globals.css"
import type { AppProps } from "next/app"
import TailwindIndicator from "~/components/TailwindIndicator"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <TailwindIndicator />
    </>
  )
}
