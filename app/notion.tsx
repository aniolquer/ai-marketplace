import { Client } from "@notionhq/client";
import {
  DatabaseObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { writeFileSync } from "fs";

export async function getNotionData(ids = []) {
  const notion = new Client({
    auth: process.env.NOTION_API_KEY, // Use environment variable for API key
  });

  console.log({
    ids,
    query: {
      database_id: "8e52dc5526054b35892c8eafd022a484",
      filter:
        ids.length === 0
          ? undefined
          : {
              or: ids.map((id) => ({
                number: {
                  equals: Number(id),
                },
                property: "id",
              })),
            },
    },
  });

  const results = await notion.databases.query({
    database_id: "8e52dc5526054b35892c8eafd022a484",
    filter:
      ids.length === 0
        ? undefined
        : {
            or: ids.map((id) => ({
              number: {
                equals: Number(id),
              },
              property: "id",
            })),
          },
  });
  const list = results;
  //list.find((i) => (i as PageObjectResponse).properties)
  // writeFileSync("data.json", JSON.stringify(list.results, null, 2));
  return list.results as PageObjectResponse[];
}
