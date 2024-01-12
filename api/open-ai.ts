"use server";

import { readFileSync } from "fs";
import { Company, Question } from "../types";

import questionJSON from "../examples.json";

import OpenAI from "openai";

const OPENAI_KEY = process.env["OPENAI_KEY"]!;
const OPENAI_MODEL = process.env["OPENAI_MODEL"]!;

const openai = new OpenAI({ apiKey: OPENAI_KEY });

const questionObject = JSON.stringify(questionJSON);
const questionPrompt = readFileSync("prompt.txt", "utf8");

export async function generateQuestion(
  company: Company,
  index: number,
  limit: number,
  asked: string[] = [],
): Promise<Question> {
  console.log("Generating question " + index + "...");

  index += 1;

  const timeStart = performance.now();

  let chatContent = questionPrompt;

  // prettier-ignore
  chatContent += `Je hebt de taak om de ${index}e vraag in de serie te genereren. In totaal worden er ${limit} vragen gegenereerd, houd hier rekening mee ivm de opbouw van het verhaal. Een voorbeeld van het formaat en de stijl van de vragen wordt hieronder gegeven:\n`;
  chatContent += `${questionObject}\n`;

  if (asked.length > 0) {
    const chatAsked = asked.join(", ");

    chatContent += `Je hebt de volgende vragen al gesteld. Deze vraag mag niet hetzelfde zijn, maar je mag er wel op inspelen: ${chatAsked}\n`;
  }

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: chatContent,
      },
      {
        role: "user",
        content:
          `Bedrijf naam: ${company.name}\n` +
          `Bedrijf activiteiten: ${company.activity}\n` +
          `Bedrijf missie: ${company.mission}\n`,
      },
    ],
    functions: [
      {
        name: "createQuestion",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            question: {
              type: "string",
            },
            options: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  label: {
                    type: "string",
                  },
                  value: {
                    type: "string",
                  },
                  impact: {
                    type: "object",
                    properties: {
                      financial_presentation: {
                        type: "number",
                      },
                      employee_wellbeing: {
                        type: "number",
                      },
                      societal_impact: {
                        type: "number",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    ],
    function_call: {
      name: "createQuestion",
    },
    model: OPENAI_MODEL,
  });

  const timeEnd = performance.now();
  const timeDiff = timeEnd - timeStart;

  console.log("Time to generate question: " + timeDiff + "ms");

  const responseMessage = chatCompletion.choices[0].message;
  const responseArguments = responseMessage.function_call?.arguments;
  const responseParsed = JSON.parse(responseArguments!);

  console.log(responseParsed.options);

  return {
    uuid: crypto.randomUUID(),
    type: "choice",
    color: "#FFA500",
    ...responseParsed,
  };
}
