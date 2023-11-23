import TeambuildingList from "../components/teambuildingList";
import { getNotionData } from "../notion";

export default async function Teambuilding() {

  const teambuildingArray = await getNotionData()

    return (
      <>
        <h1>Teambuilding List</h1>
        <div>
        {teambuildingArray.map(item => (
          <TeambuildingList key={item.id} item={item} />
        ))}
        </div>
      </>
    )

  }
  