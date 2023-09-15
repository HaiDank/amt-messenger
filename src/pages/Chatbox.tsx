import React from 'react'
import ChatboxHeader from '../components/chatbox/ChatboxHeader'
import ChatboxInputField from '../components/chatbox/ChatboxInputField'
import ChatboxContent from '../components/chatbox/ChatboxContent'

const Chatbox: React.FC = () => {
  return (
    <div className='flex flex-col flex-1 max-w-full max-h-full min-w-0 bg-white pt-9 '>
        <ChatboxHeader/> 
        <ChatboxContent/>
        <ChatboxInputField/>
    </div>
  )
}

export default Chatbox