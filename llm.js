console.log("llm.js loaded", new Date());

import * as dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

// created model instance with Groq
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama3-8b-8192",
});

// call the model directly with a prompt
model
  .invoke("write a poem about Developer switching to langchain")
  .then((response) => {
    console.log("Response from LLM:", response.text);
  })
  .catch((error) => {
    console.error("Error invoking LLM:", error);
  });
