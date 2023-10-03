import React, { ReactNode} from 'react'
import Searchbar from '../Searchbar'

type SidebarHeaderPropsType = {
    title: string | undefined,
    searchFunction: (e: React.ChangeEvent<HTMLInputElement>) => void,
    functionButton?: ReactNode,
    chatOption?: ReactNode,

}

const SidebarHeader: React.FC<SidebarHeaderPropsType> = ({title, functionButton, chatOption, searchFunction}) => {
  return (
    <div className='flex flex-col gap-4 mt-12 mb-2'>
        <div className='flex items-center justify-between mx-3 text-2xl font-bold'>
            <span>{title}</span>
            <span>{functionButton}</span>
        </div>
        <div className='mx-3'>
            <Searchbar placeholder='Search (Ctrl+K)' onChange={searchFunction}/>
        </div>
        <div>
        {chatOption}
        </div>
    </div>
  )
}

export default SidebarHeader