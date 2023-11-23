'use client'

import Image from "next/image"
import assistant from "../public/assistant.png"
import ChatComponent from "./components/chatComponent"
import TeambuildingList from "./components/teambuildingList"
import { getNotionData } from "./notion"
import { useState } from "react"
import useSWR from "swr"
import { Teambuilding } from "./utils/types"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"


export default function Home() {

  console.log("Rendering and downloading…")
  const [ids, setIds] = useState<string[]>([])
  // @ts-ignore
  const {data: activities, error, isLoading} = useSWR<Array<PageObjectResponse>>(`/api/notion?ids=${ids}`, (...args:any) => fetch(...args).then(res => res.json()))
  console.log({ids, activities})

  return (
    <>  
      <h1>Welcome to the new Teambuilding Experience</h1>
      <p>The 1st AI Teambuilding Platform. Talk to our assistant to find the best teambuilding for you company</p>
      <br />
      <Image src={assistant} alt='logo' width={150} height={150}/>
      <p>Tell us: what are you looking for?</p>
      <ChatComponent onSetIds={setIds} />
      <hr />
      <div>
        {activities?.map((item: PageObjectResponse) => (
          <TeambuildingList key={item.id} item={item} />
        ))}
      </div>

    </>
  )
}


