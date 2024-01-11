"use server";

import { Company, Question } from "../types";

import questionArray from "../examples.json";

const questionObject = JSON.stringify(questionArray[0]);

// prettier-ignore
const startPrompt = "We gaan meeslepende vragen ontwerpen voor een 'kies je eigen avontuur'-spel, gefocust op het opzetten en uitbouwen van je eigen onderneming. Je ontvangt basisinformatie zoals de bedrijfsnaam, bedrijfsactiviteiten en de missie. Daarnaast moet je voor elke vraag een korte titel bedenken die de vraag samenvat.\nDe vragen zullen een verhaal ontwikkelen, beginnend bij de oprichting van het bedrijf en evolueren naar een climax, zoals een overnamebod. Het spel stimuleert spelers om na te denken over verschillende bedrijfsmodellen - van traditionele winstgerichte modellen tot maatschappelijk verantwoorde alternatieven zoals Worker Cooperatives of Steward Ownership met aandacht voor sociale impact en klimaatactie.\nBelangrijke bedrijfsmomenten worden belicht, zoals bijvoorbeeld het openen van de eerste winkel, ethische besluitvorming en groeistrategieën. Het slot vraagstuk bepaalt welk bedrijfsmodel het best aansluit bij de keuzes en waarden van de speler, zoals ervaren tijdens hun reis.\nElke vraag biedt twee keuzes, weerspiegelend diverse bedrijfsfilosofieën en -strategieën, geïnformeerd door de begininformatie over het bedrijf.\nLater worden de antwoorden op deze vragen gemeten in de metrics financiële prestatie, duurzaamheid en maatschappelijke verantwoordelijkheid en werknemerstevredenheid en -betrokkenheid. Zorg ervoor dat de impact van de verschillende vragen en keuzes duidelijk is voor de gebruiker. De vragen mogen onrealistisch of fictief zijn.\n";

import OpenAI from "openai";

const OPENAI_KEY = process.env["OPENAI_KEY"]!;
const OPENAI_MODEL = process.env["OPENAI_MODEL"]!;

const openai = new OpenAI({ apiKey: OPENAI_KEY });

export async function generateQuestion(
  company: Company,
  index: number,
  limit: number,
  asked: string[] = [],
): Promise<Question> {
  console.log("Generating question " + index + "...");

  index += 1;

  const timeStart = performance.now();

  let chatContent = startPrompt;

  // prettier-ignore
  chatContent += `Je hebt de taak om de ${index}e vraag in de serie te genereren. In totaal worden er ${limit} vragen gegenereerd, houd hier rekening mee ivm de opbouw van het verhaal. Een voorbeeld van het formaat en de stijl van de vragen wordt hieronder gegeven:\n`;
  chatContent += `${questionObject}\n`;

  if (asked.length > 0) {
    const chatAsked = asked.join(", ");

    chatContent += `Je hebt de volgende vragen al gesteld. Deze vraag mag niet hetzelfde zijn, maar je mag er wel op inspelen: ${chatAsked}\n`;
  }
  console.log(chatContent);
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
  // console.log(responseParsed);
  return {
    uuid: crypto.randomUUID(),
    type: "choice",
    color: "#FFA500",
    ...responseParsed,
  };
}
