import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

interface SummaryResult {
  summary: string;
  cool_facts: string[];
}

export async function createGitHubSummaryChain(readmeContent: string): Promise<SummaryResult> {
  // Initialize the model
  const model = new ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0,
    maxTokens: 500
  });

  // Create output parser
  const outputParser = StructuredOutputParser.fromZodSchema(
    z.object({
      summary: z.string().describe("A concise summary of the GitHub repository"),
      cool_facts: z.array(z.string()).describe("A list of interesting facts about the repository")
    })
  );

  // Create the prompt template
  const prompt = PromptTemplate.fromTemplate(`
    Analyze this GitHub repository README content and provide a summary and interesting facts.
    
    README Content:
    {readme_content}
    
    Provide your response in the following format:
    {format_instructions}
  `);

  // Create the chain
  const chain = RunnableSequence.from([
    {
      format_instructions: async () => outputParser.getFormatInstructions(),
      readme_content: (input: string) => input
    },
    prompt,
    model,
    outputParser
  ]);

  // Execute the chain
  const result = await chain.invoke(readmeContent);
  
  return result;
} 