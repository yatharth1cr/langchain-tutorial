import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import * as dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// created model instance with Groq
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.7,
  model: "llama3-8b-8192",
});

// created a prompt template with a fromTemplate method
const prompt = ChatPromptTemplate.fromTemplate(
  "you are a comedian and engineer as well, write a joke about {topic}"
);

// create chain with model and prompt
const chain = prompt.pipe(model);

// call the chain
chain
  .invoke({
    topic: "Developer switching to langchain",
  })
  .then((response) => {
    console.log("Response from LLM:", response.content);
  })
  .catch((error) => {
    console.error("Error invoking LLM:", error);
  });

// created a prompt template with a fromMessages method
const prompt2 = ChatPromptTemplate.fromMessages([
  ["system", "You are a non-vegetarian chef."],
  ["human", "write a recipe about {topic}"],
]);

// create chain with model and prompt
const chain2 = prompt2.pipe(model);

// call the chain
chain2
  .invoke({
    topic: "Biryani",
  })
  .then((response) => {
    console.log("Response from LLM with messages:", response.content);
  })
  .catch((error) => {
    console.error("Error invoking LLM with messages:", error);
  });
