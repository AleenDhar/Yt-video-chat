import { getContext } from '@/lib/context';
import { google,createGoogleGenerativeAI  } from '@ai-sdk/google';
import { convertToCoreMessages, streamText } from 'ai';
import { Message} from "ai";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];
  console.log(lastMessage);
  const context=await getContext(lastMessage.content,"trump_assassination_attempt");
  console.log("context",context);
  // console.log(messages);

  const prompt = {
    role: "system",
    content:`U ARE GIVEN A TASK TO READ A VIDEO TRANSCRIPT AND REPLY TO THE PROMPTS.  STOP REPLYING WITH ** AND --.  : \n Here is the video description and  THE VIDEO TRANSCRIPT WITH TIMESTAMPS ${context} \n `
    //  `AI assistant is a brand new, powerful, human-like artificial intelligence.
    // The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
    // AI is a well-behaved and well-mannered individual.
    // AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
    // AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
    // AI assistant is a big fan of Pinecone and Vercel.
    // START CONTEXT BLOCK
    // ${context}
    // END OF CONTEXT BLOCK
    // AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
    // If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
    // AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
    // AI assistant will not invent anything that is not drawn directly from the context.
    // `,
  };

  const google = createGoogleGenerativeAI({
    apiKey: "AIzaSyClQEDtWrbJC6QikMksi7f4-C1RClESXGo",
  });
  const result = await streamText({
    
    model: google('models/gemini-1.5-flash-001'),
    system: 'You are a helpful assistant.',
    // messages: convertToCoreMessages(messages),
    messages: [
          prompt,
          ...messages.filter((message: Message) => message.role === "user"),
        ],
    
  });

  return result.toDataStreamResponse();
}