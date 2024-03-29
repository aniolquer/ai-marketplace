import { OpenAI } from "openai";
import * as dotenv from "dotenv";
import { threadId } from "worker_threads";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

//retrieve run from thread (i know)
export const retrieveRunFromThread = async (threadId, runId) => {
  const run = await openai.beta.threads.runs.retrieve(threadId, runId);
  return run;
};

export const retrieveMessagesFromThread = async (threadId) => {
  return await openai.beta.threads.messages.list(threadId);
};

//create assistants
const createAssistant = async ({ name, instructions, fileId }) => {
  const assistant = await openai.beta.assistants.create({
    name: name,
    instructions: instructions,
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",
    file_ids: fileId && [fileId],
  });

  return assistant;
};

export const updateAssistant = async (assistant_id, fileContent) => {
  const updatedFile = await openai.files.create({
    file: JSON.stringify(fileContent),
    purpose: "assistants",
  });

  await openai.beta.assistants.update(assistant_id, {
    file_ids: [updatedFile.id],
  });
};

//run assistants
// TODO NAMING
export const runAssistant = async ({ assistantId, threadId }) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  return run;
};

//get thread
export const getAssistant = async (assistantId) => {
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  return assistant;
};

//delete assistant
const deleteAssistant = async (assistantId) => {
  const response = await openai.beta.assistants.del(assistantId);
  return response;
};

//check on the run thread
const runCheck = async ({ threadId, runId }) => {
  const check = await openai.beta.threads.runs.retrieve(threadId, runId);
  return check;
};

//create thread
export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

//get thread
export const getThread = async (threadId) => {
  const thread = await openai.beta.threads.retrieve(threadId);
  return thread;
};

//delete thread
const deleteThread = async (threadId) => {
  const response = await openai.beta.threads.del(threadId);
  return response;
};

//create message
// TODO CHANGE NAMING
export const createMessage = async ({ threadId, content }) => {
  const messages = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: content,
  });
  return messages;
};

//get messages
export const getMessages = async (threadId) => {
  const messages = await openai.beta.threads.messages.list(threadId);
  return messages;
};

// Upload a file with an "assistants" purpose

export const UploadFile = async (fileSrc) => {
  const file = await openai.files.create({
    file: fileSrc,
    purpose: "assistants",
  });
  return file;
};
