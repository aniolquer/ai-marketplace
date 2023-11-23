'use client'
import { useState } from "react";
import Markdown from "react-markdown";

type MessageObj = {
    role: "assistant" | "user",
    text: string,
    rawText: string,
    ids: string[]
}

type ProcessedTextIds = {
    processedText: string,
    ids: string[]
}

type TitleIdMatch = [string, string, string]

function processText(raw:string): ProcessedTextIds {
    const regex = /(["][^"]+["]|[\*]{2}[^\*]+[\*]{2})\ (?:\(ID: (\d+)\)|\{\{(\d+)\}\})/g
    //@ts-ignore
    const matches: TitleIdMatch  = [...raw.matchAll(regex)]
    
    let processed = raw
    const ids = []
    for(const match of matches) {
        //@ts-ignore
        const [str, title, _, id] = match
        console.log({match})
        processed = processed.replace(str, title)
        ids.push(id)
    }

    return {
        processedText: processed,
        ids
    }

}

export default function ChatComponent({onSetIds}:{onSetIds: (ids:string[]) => void}) {

    const [input, setInput] = useState<string>("")
    const [messages, setMessages] = useState<MessageObj[]>([]);
    const [arrayOfMessages, setArrayOfMessages] = useState<any[]>([]);
    const [currentThread, setCurrentThread] = useState<string | undefined> ()
    
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value)
    }
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const userMessageObject:  MessageObj = {
            role: 'user',
            text: input
        }

        const updatedUserMessages = [...messages, userMessageObject]
        // setMessages(updatedUserMessages);

        setInput('')

        const resp = await fetch('http://localhost:3000/api/assistant/run', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: input, threadId: currentThread }),
        });
        const responseObject = await resp.json()
        console.log('responseObject', responseObject)
        
        /* const whoAnswers = responseObject.messages.data[0].role
        const latestAnswer = responseObject.messages.data[0].content[0].text.value
        const openAImessageObject = {
            role: whoAnswers,
            text: latestAnswer
        } */

        console.log('messageObject ¡¡¡:', responseObject.messages.data)
        const reducedMessages: MessageObj[] = responseObject.messages.data.map((item: any) => {
            if(item.role === "user") return {
                text: item.content[0].text.value as string,
                rawText: item.content[0].text.value as string,
                role: item.role
            }
            const processed =processText(item.content[0].text.value as string)
            const m: MessageObj = {
                text: processed.processedText,
                ids: processed.ids,
                rawText: item.content[0].text.value as string,
                role: item.role
            }
            console.log("Setting ids…", m.ids, m)
            onSetIds(m.ids)
            return m
        })

        //const updatedAllMessages = [updatedAIMessages]

        setMessages(reducedMessages.reverse());
        setCurrentThread(responseObject.threadId)
        setArrayOfMessages(arrayOfMessages)
    }

  return (
    <div>
        {/* {messages.map((message : string, index: number)=>{
                return(
                    <div key={index}>{message}</div>
                )
            })
        } */}

        {messages.map(({role, text}, index) => {
                return(
                    <>
                        <div key={`team-nuilding-item-${index}`} style={{fontWeight: 'bolder'}}>{role}</div>
                        <Markdown>{text}</Markdown>
                    </>
                )
            })

        }

        <form onSubmit={handleSubmit} action='/api/chat' >
            <textarea 
            // cols="80" 
            // rows="4" 
            placeholder={"Tell us what you're looking for"}
            value={input}
            onChange={handleInputChange}
            name='message'
            />
        <input type="submit" value="Send" />
        </form>
    </div>
  )
}


// const messages = [{role: "chatgpt", text: "wtvr"}, {role: "user", text: }]

// {messages.map((message : Message)=>{
//     return(
//         <div key={message.id}>
//             {
//                 message?.role === "assistant" ? <h3>GTP Assistant</h3> : <h3>User</h3>
//             }
//             {
//                 message.content.split("\n").map((currentTextBlock: string, index: number)=> {
//                     if(currentTextBlock === "") {
//                         return <p key={message.id + index}>&nbsp;</p>
//                     } else {
//                         return <p key={message.id + index}>{currentTextBlock}</p>
//                     }
//                 })
//             }

//         </div>
//     )
// })
// }