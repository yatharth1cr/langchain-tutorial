console.log("llm.js loaded", new Date());
// import { ChatOpenAI } from "@langchain/openai";
import * as dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";

dotenv.config();

const model = new ChatGroq({
  apiKey: process.env.OPENAI_API_KEY,
  model: "llama3-8b-8192",
});

model
  //   .invoke("What is the capital of India?")
  .invoke("write a poem about Developer switching to longchain")
  .then((response) => {
    console.log("Response from LLM:", response.text); //Response from LLM: The capital of India is New Delhi.
  })
  .catch((error) => {
    console.error("Error invoking LLM:", error);
  });
