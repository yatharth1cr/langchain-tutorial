import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from "@langchain/core/documents";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

import * as dotenv from "dotenv";
dotenv.config();

const model = new ChatGroq({
  model: "llama3-8b-8192",
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.7,
});

// Create a prompt
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the question:  
  Context: {context}
  Question: {question}`
);

const document1 = new Document({
  pageContent:
    "LCEL (LangChain Expression Language) provides a concise reference guide covering its most essential primitives. For advanced use cases, consult the LCEL how-to guides and full API documentation.",
});

const document2 = new Document({
  pageContent:
    "A passphrase is a secure sequence of words or characters used to authenticate a user or encrypt sensitive data. It should be kept private and not shared with unauthorized individuals.",
});

const document3 = new Document({
  pageContent:
    "If someone inquires about topics unrelated to LCEL, kindly respond with: 'I'm not able to answer that question at the moment.'",
});

// create chain
// const chain = prompt.pipe(model);
const chain = await createStuffDocumentsChain({
  llm: model,
  prompt,
});

const response = await chain.invoke({
  //   question: "What is LCEL?",
  //   question: "What is passphrase?",
  question: "what is the capital of india?",
  context: [document1, document2, document3],
});

console.log("Response from LLM:", response);
