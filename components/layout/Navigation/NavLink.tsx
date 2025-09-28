import { NavLinks } from '@/types/navlink'
import clsx from 'clsx'
import Link from 'next/link'

interface NavLinkProps {
  item: NavLinks;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, onClick }) => {
  const linkclasses = 'py-3 text-3xl sm:text-5xl font-medium text-white/40 rounded-full group-hover:text-primary'
  const liststyle = 'w-0 h-0.5 bg-primary transition-all duration-300 group-hover:block group-hover:w-6 group-hover:mr-4'

  return (
    <li className='flex items-center group w-fit'>
      <div className={liststyle} />
      <Link href={item.href} className={linkclasses} onClick={onClick}>
        {item.label}
      </Link>
    </li>
  )
}

export default NavLink