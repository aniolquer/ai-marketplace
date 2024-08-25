import { NextResponse } from "next/server";
import {
  createMessage,
  createThread,
  getAssistant,
  getThread,
  retrieveMessagesFromThread,
  retrieveRunFromThread,
  runAssistant,
  updateAssistant,
} from "@/app/utils/OpenAi";
import { getNotionData } from "@/app/notion";

function log(message: string) {
  console.log(
    "========================= \n",
    message,
    "========================= \n"
  );
}

//run the assistant
export async function POST(req: Request) {
  try {
    //const formData = await req.formData();
    //let threadId = formData.get("threadId");
    //let assistantId = formData.get("assistantId");
    const { message, threadId } = await req.json();

    const assistantId = "asst_uinCevZZMguc0SXbkhImk8gA";
    const thread =
      threadId && typeof threadId === "string"
        ? await getThread(threadId)
        : await createThread();
    log(`THREAD: ${JSON.stringify(thread)}`);
    if (!assistantId || !thread.id || !message || typeof message !== "string") {
      return NextResponse.json(
        { message: "fields are required" },
        { status: 400 }
      );
    }

    //const assistant = await getAssistant(assistantId)
    //const data = await getNotionData()

    //await updateAssistant(assistantId, data)

    await createMessage({
      content: message,
      threadId: thread.id,
    });

    let run = await runAssistant({
      assistantId,
      threadId: thread.id,
    });
    while (run.status !== "completed") {
      if (
        run.status === "cancelled" ||
        run.status === "failed" ||
        run.status === "expired"
      ) {
        const resp = new Response(undefined, {
          status: 500,
          statusText: "run failed in openAI",
        });
        return resp;
      }
      run = await retrieveRunFromThread(thread.id, run.id);
    }
    log(`RUN: ${run.status}`);

    const messages = await retrieveMessagesFromThread(thread.id);
    console.log({ messages });
    const resp = new Response(
      JSON.stringify({ messages, threadId: thread.id }),
      {
        status: 200,
      }
    );
    return resp;
  } catch (error) {
    console.log(error);
    const resp = new Response(
      JSON.stringify({
        message: "pues algo se habra roto man",
      }),
      {
        status: 500,
        statusText: "internal error",
      }
    );
    return resp;
  }
}

//get the file
//add the file to the assistant

//check if the fields are empty

/* let assistant = await runAssistant({
  assistantId,
  threadId,
}); */
