import * as dotenv from "dotenv";
dotenv.config();
import { AzureChatOpenAI } from "@langchain/openai";

const model = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
  azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
});

// call the model directly with a prompt
model
  .invoke("write a poem about the sea")
  .then((response) => {
    console.log("Response from LLM:", response.text);
  })
  .catch((error) => {
    console.error("Error invoking LLM:", error);
  });
