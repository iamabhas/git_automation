import {GoogleGenerativeAI} from "@google/generative-ai";
import envConfig from "../config";

const {geminiApiKey}=envConfig

class GenAIService {

   public static connectToModel= ()=>{
        const genAI = new GoogleGenerativeAI(geminiApiKey as string)
        const model = genAI.getGenerativeModel({
            model:"gemini-pro"
        })
        return model

    }

    public static summarizeCode = async (code:any)=>{
       const prompt = `Give summary of this code: ${code}`
        const response = await GenAIService.connectToModel().generateContent(prompt)
        const reply = response.response.text()
        return reply
    }

}


export default GenAIService

