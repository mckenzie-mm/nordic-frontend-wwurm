'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
const { REGISTER } = require('../templates');
 
export default function BtnRegister() {

    const pathname = usePathname();

    if (pathname.includes("admin"))
    {
        return <Link href='/'>Sign Out</Link>
    } else {
        return <Link href='/admin'>{REGISTER}</Link> 
    }          
}