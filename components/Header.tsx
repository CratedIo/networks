import AuthComponent from "@/components/auth/AuthComponent";
import Link from 'next/link';
import { ModeToggle } from './ModeToggle';
import { Laugh } from 'lucide-react';

export default function Header() {

  return (
    <nav className="w-full flex items-center justify-between h-16 p-4">
      <Link href={'/'}>
      <Laugh />
      </Link>
      <div className="flex justify-between gap-4 items-center text-sm">
        <AuthComponent />
        <ModeToggle />
      </div>
    </nav>
  )
}
