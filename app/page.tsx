import React from "react"
import assistant from "../public/assistant.png"
import Image from "next/image"
import TeambuildingList from "./teambuildingpage/page"

export default function Home() {

  return (
    <>  
      <h1>Welcome to the new Teambuilding Experience</h1>
      <p>The 1st AI Teambuilding Platform. Talk to our assistant to find the best teambuilding for you company</p>
      <br />
      <Image src={assistant} alt='logo' width={150} height={150}/>
      <p>Tell us: what are you looking for?</p>

      <button>Something outdoors for 30 people</button>
      <button>Something different from a paintball</button>
      <button>Something to build team collaboration</button>
      <button>Something culinary </button>
      <br />

      <form action="" method="post">
        <textarea 
          cols="80" 
          rows="4" 
          placeholder="Tell us what you're looking for"
          aria-label="Team building query"
        />
        <br />
        <input type="submit" value="Send" />
      </form>
      <hr />
      <TeambuildingList />
    </>
  )
}
