import React from 'react'
import ChatboxHeader from './ChatboxHeader'
import ChatboxInputField from './ChatboxInputField'
import ChatboxContent from './ChatboxContent'

const Chatbox: React.FC = () => {
  return (
    <div className='flex flex-col flex-auto h-full bg-white '>
        <ChatboxHeader/> 
        <ChatboxContent/>
        <ChatboxInputField/>
    </div>
  )
}

export default Chatbox