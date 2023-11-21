import {Configuration, OpenAIApi} from "openai-edge"
import {OpenAIStream, StreamingTextResponse} from "ai"

export const runtime = 'edge'

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openAi = new OpenAIApi(config)

export async function POST(request: Request){

    const { messages }  =  await request.json()

    const response = await openAi.createChatCompletion({
        model: 'gpt-3.5-turbo-1106',
        stream: true,
        messages: [
            {role: 'system', content: 'You are a teambuilding assistant'},
            ...messages
        ]

    })

    const stream = await OpenAIStream(response)

    return new StreamingTextResponse(stream)
}