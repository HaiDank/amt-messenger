import clsx from "clsx"
import React, { ReactNode } from "react"
import { Link } from "react-router-dom"

export type SidebarItemPropsType = {
    path: string,
    icon: ReactNode,
    active?: boolean,
    onClick?: () => void,
}

const SidebarItem: React.FC<SidebarItemPropsType> = ({
    path,
    icon,
    active,
    onClick,
}) => {

    const handleClick = () => {
        if (onClick) {
            onClick()
        }
    }

  return (
    <Link to={path} onClick={handleClick} className={clsx('py-3 px-5 rounded-lg font-bold text-xl text-gray-500  ',active && 'link-active')}>
        {icon}
    </Link>
  )
}

export default SidebarItem