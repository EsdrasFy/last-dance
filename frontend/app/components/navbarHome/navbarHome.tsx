import Link from 'next/link'
import React from 'react'

function NavbarHome() {
  return (
    <nav className='w-full mt-2 text-custom-textColor max-md:hidden'>
      <ul className='flex w-full gap-1 justify-between text-xl border-custom-pink'>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md max-lg:hidden'>SHIRTS</Link>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md'>BRANDS</Link>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md'>PANTS</Link>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md'>BEACH</Link>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md'>SHOES</Link>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md max-lg:hidden'>PERFUME</Link>
        <Link href={"#"} className='hover:bg-custom-grayThree/40 duration-300 transition-all ease-linear w-full text-center py-2 rounded-md'>RELEASES</Link>
      </ul>
    </nav>
  )
}

export default NavbarHome