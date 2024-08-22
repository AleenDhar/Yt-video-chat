"use server"

import { YoutubeTranscript } from 'youtube-transcript';
import { Client, MusicClient } from "youtubei";

// import {youtube} from "youtube-toolkit"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Pinecone,PineconeRecord } from "@pinecone-database/pinecone";
import md5 from "md5"
import { NextResponse } from "next/server";
import {
    Document,
    // RecursiveCharacterTextSplitter,
  } from "@pinecone-database/doc-splitter";


const genAI = new GoogleGenerativeAI( "AIzaSyClQEDtWrbJC6QikMksi7f4-C1RClESXGo");
const getPineconeClient = () => {return new Pinecone({apiKey: "2d3031aa-29ac-40f3-b04d-03e99b389f8a",});};
  
const youtube = new Client();

 const getTranscript = async(url:string)=>{
   
    const transcript = YoutubeTranscript.fetchTranscript(url).then(async (res:Array<{}>) => {
        return   res
        }).catch((error)=>{return error})
    return transcript
    
} 

const getVideodetails=async(url:string)=> {
    const id=url.slice(32)
    const video = await youtube.getVideo(id);
    return video
} 


export async function addLink(url:string) {
    const transcript=getTranscript(url).then(async(res)=>{return res}).catch((e)=>{console.log(e)})
    const video=getVideodetails(url).then(async(res)=>{return {id:res?.id,title:res?.title,description:res?.description,date:res?.uploadDate}}).catch((e)=>{console.log(e)})
    
    return true

}
