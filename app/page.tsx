import assistant from "../public/assistant.png"
import Image from "next/image"
import TeambuildingList from "./teambuildingpage/page"
import ChatComponent from "./ui/chatComponent"
// import Suggestions from "./ui/suggestions"
export default function Home() {

  return (
    <>  
      <h1>Welcome to the new Teambuilding Experience</h1>
      <p>The 1st AI Teambuilding Platform. Talk to our assistant to find the best teambuilding for you company</p>
      <br />
      <Image src={assistant} alt='logo' width={150} height={150}/>
      <p>Tell us: what are you looking for?</p>

      {/* <Suggestions /> Opcional por el momento */}
      <ChatComponent />
      <hr />
      <TeambuildingList />
    </>
  )
}
