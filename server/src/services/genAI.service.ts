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

    public static reviewPrChanges = async (code:any)=>{
        const prompt = `This prompt is being used while interacting with the google gemini api. So give me concise and clear answer to the following question because I need a short response. Give PR for following patch: ${code}. This should be short meaning just review and give what can be improved or what errors can be fixed. Also the answer should be in paragraph instead of points. Don't start of by saying this "this patch includes this" or "patch  is this". If everything is ok say everything is okay and no need for changes . if code needs changes suggest changes and if there are error point out the error of how it should be done but dont give the code on how to fix it .just give what should be done in error thats it.Make the review comment short and sweet.`
        const response = await GenAIService.connectToModel().generateContent(prompt)
        const reply = response.response.text()
        return reply
    }

}


export default GenAIService

