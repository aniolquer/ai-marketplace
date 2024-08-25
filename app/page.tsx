"use client";

import Image from "next/image";
import assistant from "../public/assistant.png";
import ChatComponent from "./components/chatComponent";
import TeambuildingList from "./components/teambuildingList";
import { useState } from "react";
import useSWR from "swr";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import "./globals.css";

export default function Home() {
  console.log("Rendering and downloading…");

  // State to hold the IDs for fetching data
  const [ids, setIds] = useState<string[]>([]);

  // Fetch data from the Notion API using SWR
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR<Array<PageObjectResponse>>(
    `/api/notion?ids=${ids}`,
    (url: string) => fetch(url).then((res) => res.json())
  );

  console.log({ ids, activities });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Welcome to the new Teambuilding Experience
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          The 1st AI Teambuilding Platform. Talk to our assistant to find the
          best teambuilding for your company
        </p>

        <div className="flex items-center justify-center mb-8">
          <Image
            src={assistant}
            alt="AI Assistant"
            width={250}
            height={250}
            className="rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>

        <p className="text-2xl font-semibold text-center text-blue-500 mb-6">
          Tell us: what are you looking for?
        </p>

        {/* Chat component to interact with the user */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-inner mb-8">
          <ChatComponent onSetIds={setIds} />
        </div>

        <hr className="my-8 border-t-2 border-blue-200" />

        {/* Render the list of teambuilding activities */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities?.map((item: PageObjectResponse) => (
            <TeambuildingList key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
