'use client'
import { useChat, Message } from "ai/react";

export default function ChatComponent() {

    const { input, handleInputChange, handleSubmit, isLoading, messages }  =  useChat()

    console.log(messages)
    console.log(input)

  return (
    <div>

        {messages.map((message : Message)=>{
            return(
                <div key={message.id}>
                    {
                        message.role === "assistant" ? <h3>GTP-4</h3> : <h3>User</h3>
                    }
                    {
                        message.content.split("\n").map((currentTextBlock: string, index: number)=> {
                            if(currentTextBlock === "") {
                                return <p key={message.id + index}>&nbsp;</p>
                            } else {
                                return <p key={message.id + index}>{currentTextBlock}</p>
                            }
                        })
                    }
                    {

                    }

                </div>
            )
        })}

        {/* This is where we'll have messages from the bot */}

        <form onSubmit={handleSubmit} >
            <textarea 
            // cols="80" 
            // rows="4" 
            placeholder={"Tell us what you're looking for"}
            value={input}
            onChange={handleInputChange}
            />
        <input type="submit" value="Send" />
        </form>
    </div>
  )
}
