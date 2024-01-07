import AuthComponent from "@/components/auth/AuthComponent";
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Laugh } from 'lucide-react';

export default function Header( network: {title: any, slug:any, color:any}) {

  return (
    <nav className="w-full flex items-center justify-between h-16 p-4 absolute z-10">
      <Link href={ network ? '/'+ network.slug : '/'} className={`flex justify-center items-center gap-4 ${network.color}`}>
        <Laugh />
        {network && <p>{network.title}</p> }
      </Link>
      <div className="flex justify-between gap-4 items-center text-sm">
        <AuthComponent />
      </div>
    </nav>
  )
}
