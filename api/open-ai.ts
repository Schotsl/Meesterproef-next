"use server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPEN_AI_KEY"],
});

export async function generateQuestions(
  company: string,
  task: string,
  mission: string
) {
  company = "Krijn .Inc";
  task = "Selling tulips";
  mission = "I love selling tulips";
  
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          'Create a series of 6 to 8 questions for a narrative-driven "choose your own adventure" game, where the central theme is the player founding and developing their own company. The model should start with inputs including the company\'s name, its primary business activities, and its mission statement.\n' +
          "The questions should be structured to build a compelling story, beginning from the early stages of the company's formation and leading up to a significant climax or decision point, such as a major acquisition offer. Throughout the game, the storyline should subtly nudge players to contemplate different business models, ranging from traditional profit-centric shareholder models to socially responsible models like worker cooperatives or steward ownership, emphasizing positive societal impact and climate change efforts.\n" +
          "The narrative should reflect critical moments in a company's life cycle, from opening the first shop to facing major ethical decisions and expansion challenges. The concluding question should be a decisive moment that encapsulates the game's purpose: to determine which business model best aligns with the player's decisions and values, as demonstrated through their journey.\n" +
          "Each question should offer choices reflecting different business philosophies or strategies, and they should be informed by the initial inputs about the company's name, activities, and mission.\n" +
          "An example of the format and style of the questions is provided at the bottom of this prompt.\n" +
          '{"questions":[{"question":"A factory owner in China has offered to take over your production. This would reduce manufacturing costs, but at the expense of the current employees.","options":[{"label":"Outsource the production for lower costs","value":"agree"},{"label":"Maintain the current employees and focus on local production","value":"disagree"}]},{"question":"A large investor offers to invest in your company, but in return wants significant say and shares.","options":[{"label":"Accept the investment and give up some control","value":"agree"},{"label":"Decline the investment and maintain control","value":"disagree"}]},{"question":"You can choose between cheaper, non-sustainable materials or more expensive, environmentally friendly options for your products.","options":[{"label":"Choose the cheaper options to reduce costs","value":"agree"},{"label":"Choose the more expensive options to save the environment","value":"disagree"}]},{"question":"Your business is tight on funds and can save costs by reducing employee benefits, but this may come at the cost of employee satisfaction and loyalty.","options":[{"label":"Cut employee benefits to save costs","value":"agree"},{"label":"Maintain the current employee benefits","value":"disagree"}]},{"question":"You have the opportunity to adapt your products to a broader, less specialized audience, increasing potential revenue, but this may detract from the niche quality of your product.","options":[{"label":"Adapt your products to appeal to a broader audience","value":"agree"},{"label":"Keep your products specialized and focus on your niche","value":"disagree"}]}]}',
      },
      {
        role: "user",
        content:
          "Company name: " +
          company +
          "\n" +
          "Company activities: " +
          task +
          "\n" +
          "Company mission: " +
          mission +
          "\n",
      },
    ],
    functions: [
      {
        name: "createQuestions",
        parameters: {
          type: "object",
          properties: {
            questions: {
              type: "array",
              items: {
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
          },
        },
      },
    ],
    function_call: { name: "createQuestions" },
    model: "gpt-3.5-turbo",
  });

  console.log(chatCompletion.choices[0].message);
}
