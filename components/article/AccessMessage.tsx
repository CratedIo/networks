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

export default function AccessMessage({message}:any) {

    const gate = message === 'gate' ? true : false
    const premium = message === 'premium' ? true : false

    const [open, setOpen] = useState(true)

    const AccessContent = () => {
        return (
            <>
                <p className="flex justify-center gap-2 pb-2">Premium<span>·</span><Zap strokeWidth={1} /></p>
                <h2 className="text-3xl font-medium leading-tight tracking-wide max-w-lg text-balance pb-4">
                        {gate && (`Sign up to discover stories that deepen your understanding of the world.`)}
                        {premium && (`Preium access is required to access this content.`)}
                </h2>
                {gate &&
                    <>
                        <AuthButton label={"Sign Up"} url={"/signup"} />
                        <p className="pt-4 text-sm font-medium">Already have an account?<AuthButton label={'Sign In'} url={'/signin'} pathParam={'/'} variant={'link'} /></p>
                    </>
                }
                {premium &&
                    <>
                        <AuthButton label={"Upgrade now"} url={"/upgrade"} />
                    </>
                }
            </>
        )
    }

    return (
        <>
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerContent className="outline-none">
                <div className="pb-32 pt-16 mx-auto max-w-3xl flex flex-col items-center text-center">
                    <AccessContent />
                </div>
                </DrawerContent>
            </Drawer>
            <div className="w-full flex flex-col items-center text-center border-y py-16">
                <AccessContent />
            </div>
        </>
    )
}