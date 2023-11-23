import { PageObjectResponse, RichTextItemResponse,  } from "@notionhq/client/build/src/api-endpoints"

export default function TeambuildingList({ item }: {item: PageObjectResponse}) {

    const name = (item.properties['Name'] as {
      type: "title";
      title: Array<RichTextItemResponse>;
      id: string;
    }).title[0].plain_text



    const description = item.properties['description'].rich_text[0].plain_text
    const imageSrc = item.cover.external.url
    
  
    return (
      <div style={{display: 'inline-block'}}>
        <div style={{width: 300, height: 320, padding: 10, border: '1px solid', borderColor: 'light-grey', margin: 2 }} >
          <h3>{name}</h3>
          <p>{description }</p>
          <img src={imageSrc} alt="image teambuilding" width={200} height={100}/>
          <button>More Info</button>
        </div>
      </div>
    );
  }