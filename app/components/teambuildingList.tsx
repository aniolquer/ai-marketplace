import {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";

export default function TeambuildingList({
  item,
}: {
  item: PageObjectResponse;
}) {
  const name = (
    item.properties["Name"] as {
      type: "title";
      title: Array<RichTextItemResponse>;
      id: string;
    }
  ).title[0].plain_text;

  const description = (
    item.properties["description"] as {
      type: "rich_text";
      rich_text: Array<RichTextItemResponse>;
      id: string;
    }
  ).rich_text[0].plain_text;

  const imageSrc = (
    item.cover as {
      type: "external";
      external: { url: string };
    }
  ).external.url;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-96 flex flex-col">
      <div className="h-48 relative">
        <Image
          src={imageSrc}
          alt="image teambuilding"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{name}</h2>
        <p className="text-gray-600 mb-4 flex-grow overflow-hidden line-clamp-3">
          {description}
        </p>
        <div className="mt-auto">
          <button className="mt-2 w-full px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-700 transition-colors duration-300">
            More Info
          </button>
        </div>
      </div>
    </div>
  );
}
