"use server";

import { Company, Question } from "../types";
import { numberSuffix } from "../helper";

const startPrompt =
  "We gaan vragen creëren voor een op verhalen gebaseerd 'kies je eigen avontuur' spel, waarbij het centrale thema het oprichten en ontwikkelen van je eigen bedrijf is. Je krijgt informatie zoals de naam van het bedrijf, de primaire bedrijfsactiviteiten en de missieverklaring.\nDe vragen moeten zo gestructureerd zijn dat ze een meeslepend verhaal opbouwen, beginnend vanaf de vroege stadia van de oprichting van het bedrijf tot aan een belangrijk climax- of beslissingsmoment, zoals een aanbod voor een grote overname. Gedurende het spel moet het verhaal spelers subtiel aanzetten tot nadenken over verschillende bedrijfsmodellen, variërend van traditionele winstgerichte aandeelhoudersmodellen tot maatschappelijk verantwoorde modellen zoals werknemerscoöperaties of steward-eigendom, met de nadruk op positieve maatschappelijke impact en inspanningen voor klimaatverandering.\nHet verhaal moet kritieke momenten in de levenscyclus van een bedrijf weerspiegelen, van het openen van de eerste winkel tot het maken van grote ethische beslissingen en uitbreidingsuitdagingen. De afsluitende vraag moet een beslissend moment zijn dat het doel van het spel samenvat: bepalen welk bedrijfsmodel het beste aansluit bij de beslissingen en waarden van de speler, zoals aangetoond tijdens hun reis.\nElke vraag moet keuzes bieden die verschillende bedrijfsfilosofieën of -strategieën weerspiegelen, en ze moeten worden geïnformeerd door de initiële input over de naam van het bedrijf, de activiteiten en de missie. De gebruiker moet slechts twee opties krijgen om uit te kiezen.";

const questionArray =
  '[{"question":"Een fabriekseigenaar in China heeft aangeboden om je productie over te nemen. Dit zou fabricatiekosten verlagen, maar ten koste gaan van de huidige werknemers.","options":[{"label":"Besteed de productie uit voor lagere kosten","value":"agree"},{"label":"Behoud de huidige werknemers en focus op lokale productie","value":"disagree"}]},{"question":"Een grote investeerder biedt aan om in je bedrijf te investeren, maar wil in ruil daarvoor aanzienlijke zeggenschap en aandelen.","options":[{"label":"Accepteer de investering en geef een deel van de controle weg","value":"agree"},{"label":"Weiger de investering en behoud de controle","value":"disagree"}]},{"question":"Je kunt kiezen tussen goedkopere, niet-duurzame materialen of duurdere, milieuvriendelijke opties voor je producten.","options":[{"label":"Kies voor de goedkopere opties om de kosten te drukken","value":"agree"},{"label":"Kies voor de duurdere opties om het milieu te sparen","value":"disagree"}]},{"question":"Je bedrijf zit krap en kan kosten besparen door werknemersvoordelen te verminderen, maar dit kan ten koste gaan van werknemerstevredenheid en loyaliteit.","options":[{"label":"Snij in werknemersvoordelen om kosten te besparen","value":"agree"},{"label":"Behoud de huidige werknemersvoordelen","value":"disagree"}]},{"question":"Je hebt de kans om je producten aan te passen aan een breder, minder gespecialiseerd publiek, waardoor potentiële inkomsten toenemen, maar dit kan afdoen aan de nichekwaliteit van je product.","options":[{"label":"Pas je producten aan om een breder publiek aan te spreken","value":"agree"},{"label":"Houd je producten gespecialiseerd en richt je op je niche","value":"disagree"}]}]';
const questionObject =
  '{"question":"Een fabriekseigenaar in China heeft aangeboden om je productie over te nemen. Dit zou fabricatiekosten verlagen, maar ten koste gaan van de huidige werknemers.","options":[{"label":"Besteed de productie uit voor lagere kosten","value":"agree"},{"label":"Behoud de huidige werknemers en focus op lokale productie","value":"disagree"}]}';

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPEN_AI_KEY"],
});

export async function generateQuestion(company: Company, index: number) {
  console.log("Generating question " + index + "...");

  company.name = "Krijn .Inc";
  company.activity = "Bloemen verkopen";
  company.mission = "Ik maak graag mensen blij met mijn bloemen";

  index += 1;

  const timeStart = performance.now();

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          startPrompt +
          `Je hebt de taak om de ${index}${numberSuffix(
            index
          )} vraag in de serie te genereren. Een voorbeeld van het formaat en de stijl van de vragen wordt onderaan deze opdracht gegeven.\n` +
          questionObject,
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
    model: "gpt-3.5-turbo",
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
    color: "#FFA500",
    ...responseParsed,
  };
}
