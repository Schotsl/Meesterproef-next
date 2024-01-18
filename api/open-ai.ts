"use server";

// import { readFileSync } from "fs";
import { Company, Question } from "../types";

import questionJSON from "../examples.json";

import OpenAI from "openai";

const OPENAI_KEY = process.env["OPENAI_KEY"]!;
const OPENAI_MODEL = process.env["OPENAI_MODEL"]!;

const openai = new OpenAI({ apiKey: OPENAI_KEY });

// const questionPrompt = readFileSync("prompt.txt", "utf8");

const questionObject = JSON.stringify(questionJSON);
const questionPrompt = `We gaan meeslepende vragen ontwerpen voor een 'kies je eigen avontuur'-spel, gefocust op het opzetten en uitbouwen van je eigen onderneming. Je ontvangt basisinformatie zoals de bedrijfsnaam, bedrijfsactiviteiten en de missie. Daarnaast moet je voor elke vraag een korte titel bedenken die de vraag samenvat.\n\nDe vragen zullen een verhaal ontwikkelen, beginnend bij de oprichting van het bedrijf of evolueren naar een climax, zoals een overnamebod. Het spel stimuleert spelers om na te denken over verschillende bedrijfsmodellen - van traditionele winstgerichte modellen tot maatschappelijk verantwoorde alternatieven zoals Worker Cooperatives of Steward Ownership met aandacht voor sociale impact en klimaatactie.\n\nBelangrijke bedrijfsmomenten worden belicht, zoals het openen van de eerste winkel, ethische besluitvorming en groeistrategieën. Het slot vraagstuk bepaalt welk bedrijfsmodel het best aansluit bij de keuzes en waarden van de speler, zoals ervaren tijdens hun reis.\n\nElke vraag biedt maximaal twee keuzes, weerspiegelend diverse bedrijfsfilosofieën en -strategieën, geïnformeerd door de begin informatie over het bedrijf. Je moet bij elke keuze een schatting doen van de impact van het antwoord. Dus financiële prestaties, duurzaamheid en maatschappelijke verantwoordelijkheid en tenslotte werknemers tevredenheid en - betrokkenheid.\n\nDit moet een getal tussen -1 en 1 zijn, maar zorg ervoor dat het nooit 0 is. De naam van deze variablen zijn "financialPresentation", "employeeWellbeing", en "societalImpact"\n\nDaarnaast moet je ook een korte uitleg geven over waarom deze score gegeven is en de consequenties van de acties. Als de bedrijfsmissie nog niet bekend is hoef je hier niet naar te vragen, het systeem zelf zal deze vraag de volgende ronde stellen.\n\nLater worden de antwoorden op deze vragen gemeten in de metrics financiële prestatie, duurzaamheid en maatschappelijke verantwoordelijkheid en werknemerstevredenheid en -betrokkenheid. Zorg ervoor dat de impact van de verschillende vragen en keuzes duidelijk is voor de gebruiker. De vragen mogen onrealistisch of fictief zijn.\n\n`;

export async function fetchQuestion(
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
  chatContent += `\nJe hebt de taak om de ${index}e vraag in de serie te genereren. In totaal worden er ${limit} vragen gegenereerd, houd hier rekening mee ivm de opbouw van het verhaal. Een voorbeeld van het formaat en de stijl van de vragen wordt hieronder gegeven:\n\n`;
  chatContent += `${questionObject}\n\n`;

  if (asked.length > 0) {
    const chatAsked = asked.join('", "');

    chatContent += `Je hebt de volgende vragen al gesteld. Deze vraag mag niet hetzelfde zijn, maar je mag er wel op inspelen: "${chatAsked}"\n`;
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
                  explain: {
                    type: "string",
                  },
                  impact: {
                    type: "object",
                    properties: {
                      financialPresentation: {
                        type: "number",
                      },
                      employeeWellbeing: {
                        type: "number",
                      },
                      societalImpact: {
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

  return {
    uuid: crypto.randomUUID(),
    type: "choice",
    ...responseParsed,
  };
}
