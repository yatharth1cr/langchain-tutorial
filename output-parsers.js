import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
  StructuredOutputParser,
} from "@langchain/core/output_parsers";
import { z } from "zod";

// Load environment variables from .env file
import * as dotenv from "dotenv";
dotenv.config();

// create model
const model = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  temperature: 0.7,
  model: "llama3-8b-8192",
});

// Function to demonstrate StringOutputParser
function callStringOutputParser() {
  // create prompt template
  const prompt = ChatPromptTemplate.fromTemplate(
    "you are a comedian, write a joke about {topic}"
  );

  // create parser
  const parser = new StringOutputParser();

  // create chain
  const chain = prompt.pipe(model).pipe(parser);

  // call the chain
  chain
    .invoke({
      topic: "nature",
    })
    .then((response) => {
      console.log("Response from LLM:", response);
    })
    .catch((error) => {
      console.error("Error invoking LLM:", error);
    });
}

// Function to demonstrate CommaSeparatedListOutputParser
function callListOutputParser() {
  // create prompt template
  const prompt = ChatPromptTemplate.fromTemplate(
    "provide 5 synonyms , seperated by commas, for the word {word} with no extre information"
  );

  // create parser
  const outputparser = new CommaSeparatedListOutputParser();

  // create chain
  const chain = prompt.pipe(model).pipe(outputparser);

  // call the chain
  chain
    .invoke({
      word: "happy",
    })
    .then((response) => {
      console.log("Response from LLM:", response);
    })
    .catch((error) => {
      console.error("Error invoking LLM:", error);
    });
}

// function to demonstrate StructuredOutputParser
function callStructuredOutputParser() {
  // create prompt template
  const prompt = ChatPromptTemplate.fromTemplate(`
    you are a travel agent, provide a travel plan for {destination} with the following details: {details} in structured format
    `);

  // create parser
  const outputparser = StructuredOutputParser.fromNamesAndDescriptions({
    day1: "Activities planned for day 1",
    day2: "Activities planned for day 2",
    day3: "Activities planned for day 3",
    budgetBreakdown: "Detailed budget breakdown for the trip",
    activities: "List of activities planned for the trip",
    accommodation: "Details of accommodation arrangements",
  });

  // create chain
  const chain = prompt.pipe(model).pipe(outputparser);

  // call the chain
  chain
    .invoke({
      destination: "Dharamshala, HimachalPradesh, India",
      details: outputparser.getFormatInstructions(),
    })
    .then((response) => {
      console.log("Response from LLM:", response);
    })
    .catch((error) => {
      console.log("Error invoking LLM:", error);
    });
}

// function to demonstrate ZodOutputParser
function callZodOutputParser() {
  // create prompt template
  const prompt = ChatPromptTemplate.fromTemplate(
    `you are a chef, write a recipe for {dish} in structured format
    {format_instructions} 
    `
  );

  // create zod schema
  const outputparser = StructuredOutputParser.fromZodSchema(
    z.object({
      ingredients: z.array(z.string()).describe("List of ingredients"),
      steps: z.array(z.string()).describe("List of steps to prepare the dish"),
      cookingTime: z.string().describe("Total cooking time for the dish"),
      servings: z.number().describe("Number of servings the recipe yields"),
    })
  );

  // create chain
  const chain = prompt.pipe(model).pipe(outputparser);

  //   call the chain
  chain
    .invoke({
      dish: "plain khichdi",
      format_instructions: outputparser.getFormatInstructions(),
    })
    .then((response) => {
      console.log("Response from LLM:", response);
    })
    .catch((error) => {
      console.log("Error invoking LLM:", error);
    });
}

callStringOutputParser();
callListOutputParser();
callStructuredOutputParser();
callZodOutputParser();
