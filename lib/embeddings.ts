
import { GoogleGenerativeAI } from "@google/generative-ai"

// Access your API key as an environment variable (see our Getting Started tutorial)
const genAI = new GoogleGenerativeAI( "AIzaSyClQEDtWrbJC6QikMksi7f4-C1RClESXGo");

export async function getEmbeddings(text: string) {
    try{
       
        const model = genAI.getGenerativeModel({ model: "text-embedding-004"});
    
        const result = await model.embedContent(text);
        const embedding = result.embedding;
       
        return embedding.values as number[]
    }
    catch(e){
        console.log("gemini embedding error")
        throw e
    }
}

