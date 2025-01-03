import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
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

  // Create the prompt template
  const prompt = PromptTemplate.fromTemplate(`
    Analyze this GitHub repository README content and provide a summary and interesting facts.
    
    README Content:
    {readme_content}
  `);

  // Create the chain with structured output
  const chain = prompt.pipe(
    model.withStructuredOutput(
      z.object({
        summary: z.string().describe("A concise summary of the GitHub repository"),
        cool_facts: z.array(z.string()).describe("A list of interesting facts about the repository")
      })
    )
  );

  // Execute the chain
  const result = await chain.invoke({ readme_content: readmeContent });
  
  return result;
} 