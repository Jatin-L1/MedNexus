"use client"

import * as React from "react"
import { Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"


export function ChatDialog() {
  const [messages, setMessages] = React.useState([
    {
      text: "I am on my way. How is the patient doing?",
      timestamp: "10:31 AM",
      sender: "doctor",
    },
    {
      text: "The pain is still there but stable",
      timestamp: "10:32 AM",
      sender: "patient",
    },
    {
      text: "Keep monitoring breathing. I'm 8 minutes away.",
      timestamp: "10:37 AM",
      sender: "doctor",
    },
  ])

  const [inputMessage, setInputMessage] = React.useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        text: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sender: "patient",
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
      <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-gray-800/50 rounded-lg"
        >
          <MessageCircle className="w-5 h-5" />
        </motion.button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between gap-2">
            <span>Dr. Richard Wilson</span>
            <span className="text-sm text-muted-foreground mr-4 text-green-600">8 min away</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4 overflow-y-auto max-h-[60vh] p-4 bg-gradient-to-b from-blue-950 to-blue-900 rounded-lg">
            {messages.map((message, index) => (
              <div key={index} className={`flex flex-col ${message.sender === "doctor" ? "items-start" : "items-end"}`}>
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] ${
                    message.sender === "doctor" ? "bg-blue-800 text-white" : "bg-blue-600 text-white"
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs text-blue-200 mt-1">{message.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button size="icon" className="shrink-0" onClick={handleSendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

