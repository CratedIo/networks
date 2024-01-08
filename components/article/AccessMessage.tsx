"use client"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import AuthButton from "../auth/AuthButton"
import { Zap } from "lucide-react"

export default function AccessMessage() {

    const [open, setOpen] = useState(true)

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="outline-none">
                <div className="pb-32 pt-16 mx-auto max-w-3xl text-center">
                    <p className="flex justify-center gap-2 pb-2">Premium<span>·</span><Zap strokeWidth={1} /></p>
                    <h2 className="text-3xl font-medium leading-tight tracking-wide max-w-lg text-balance pb-4">
                        Sign up to discover stories that deepen your understanding of the world.
                    </h2>
                    <AuthButton label={"Sign Up"} url={"/signup"} />
                    <p className="pt-4 text-sm font-medium">Already have an account?<AuthButton label={'Sign In'} url={'/signin'} pathParam={'/'} variant={'link'} /></p>
                </div>
                </DrawerContent>
            </Drawer>
            <div className="w-full text-center border-y py-16">
                <p className="flex justify-center gap-2 pb-2">Premium<span>·</span><Zap strokeWidth={1} /></p>
                <h2 className="text-3xl font-medium leading-tight tracking-wide text-balance pb-4">
                    Sign up to discover stories that deepen your understanding of the world.
                </h2>
                <AuthButton label={"Sign Up"} url={"/signup"} />
                <p className="pt-4 text-sm font-medium">Already have an account?<AuthButton label={'Sign In'} url={'/signin'} pathParam={'/'} variant={'link'} /></p>
            </div>
        </>
    )
}