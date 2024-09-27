import { useState } from "react";
import { User, Calendar, Folder, CheckSquare, MessageSquare } from 'lucide-react'
export default function ChatBox(){
    const [messages, setMessages] = useState(["YET TO BE IMPLEMENTED"]);
    const [inputMessage, setInputMessage] = useState('');
  
    return (
      <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
        <div className="bg-blue-500 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">COMMUNICATE</h2>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 mb-2 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-100'} rounded-lg`}>
              <p className="text-sm">{msg}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <MessageSquare />
            </button>
          </div>
        </div>
      </div>
    );
  }
  