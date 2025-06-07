import * as dotenv from "dotenv";
dotenv.config();

import { AzureChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

// Define your LLM
const llm = new AzureChatOpenAI({
  azureOpenAIApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAIApiInstanceName: process.env.AZURE_OPENAI_API_INSTANCE_NAME,
  azureOpenAIApiDeploymentName: process.env.AZURE_OPENAI_DEPLOYMENT,
  azureOpenAIApiVersion: process.env.OPENAI_API_VERSION,
});
// Prompt using context
const prompt = ChatPromptTemplate.fromTemplate(
  `Answer the users Question.
  Context:{context}
  Question: {question}`
);

// Create chain
// const chain = prompt.pipe(llm);
const chain = await createStuffDocumentsChain({
  llm,
  prompt,
});

// Load page and extract text
const loader = new CheerioWebBaseLoader(
  "https://js.langchain.com/docs/how_to/lcel_cheatsheet/"
);
const docs = await loader.load();
console.log("Context extracted:", docs[0].pageContent.length);

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
  chunkOverlap: 30,
});

const splitDocs = await splitter.splitDocuments(docs);
console.log("Split documents:", splitDocs.length);

// Call LLM
const response = await chain.invoke({
  question: "What is LangChain?",
  context: docs,
});

// Show result
console.log("\nResponse from LLM:\n", response);
