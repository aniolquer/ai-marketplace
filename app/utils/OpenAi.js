import { OpenAI } from "openai";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Retrieve a specific run from a thread
export const retrieveRunFromThread = async (threadId, runId) => {
  const run = await openai.beta.threads.runs.retrieve(threadId, runId);
  return run;
};

// Retrieve all messages from a specific thread
export const retrieveMessagesFromThread = async (threadId) => {
  return await openai.beta.threads.messages.list(threadId);
};

// Create a new assistant with given parameters
const createAssistant = async ({ name, instructions, fileId }) => {
  const assistant = await openai.beta.assistants.create({
    name: name,
    instructions: instructions,
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4-1106-preview",
    file_ids: fileId && [fileId], // Include file ID if provided
  });

  return assistant;
};

// Update an existing assistant with new file content
export const updateAssistant = async (assistant_id, fileContent) => {
  // Upload new file content
  const updatedFile = await openai.files.create({
    file: JSON.stringify(fileContent),
    purpose: "assistants",
  });

  // Update assistant with new file ID
  await openai.beta.assistants.update(assistant_id, {
    file_ids: [updatedFile.id],
  });
};

// Run an assistant on a specific thread
export const runAssistant = async ({ assistantId, threadId }) => {
  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });
  return run;
};

// Retrieve details of a specific assistant
export const getAssistant = async (assistantId) => {
  const assistant = await openai.beta.assistants.retrieve(assistantId);
  return assistant;
};

// Delete a specific assistant
const deleteAssistant = async (assistantId) => {
  const response = await openai.beta.assistants.del(assistantId);
  return response;
};

// Check the status of a specific run in a thread
const runCheck = async ({ threadId, runId }) => {
  const check = await openai.beta.threads.runs.retrieve(threadId, runId);
  return check;
};

// Create a new thread
export const createThread = async () => {
  const thread = await openai.beta.threads.create();
  return thread;
};

// Retrieve details of a specific thread
export const getThread = async (threadId) => {
  const thread = await openai.beta.threads.retrieve(threadId);
  return thread;
};

// Delete a specific thread
const deleteThread = async (threadId) => {
  const response = await openai.beta.threads.del(threadId);
  return response;
};

// Create a new message in a specific thread
export const createMessage = async ({ threadId, content }) => {
  const messages = await openai.beta.threads.messages.create(threadId, {
    role: "user", // Role of the message sender
    content: content, // Content of the message
  });
  return messages;
};

// Retrieve all messages from a specific thread
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
