"use client"

import Link from "next/link"
import { Button } from "../ui/button"

const SharedNotFound = () => {

  return (
    <div className="grid h-screen place-content-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-black ">404</h1>
        <p className="text-2xl font-bold tracking-tight  sm:text-4xl">Uh-oh!</p>
        <p className="pt-4 pb-8">We can&apos;t find that page.</p>
        <Button asChild>
            <Link href={'/'}>
                Go back to home
                <span className="sr-only">Go back to home</span>
            </Link>
        </Button>
      </div>
    </div>
  )
}
export default SharedNotFound;