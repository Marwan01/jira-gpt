import { fetch } from "@forge/api";

const messages = [
  {
    role: "system",
    content:
      "You are a bot that helps to expand on the existing content of the Jira story to give more insight for the user. You will be given a concatenated string of the content of the description and comments, and you need to provide a declarative response that contains a detailed description along with a criteria of acceptance",
  },
];
export const callGpt = async (prompt) => {
  const url = `https://api.openai.com/v1/chat/completions`;
  messages.push(
    {
      role: "user",
      content: prompt,
    },
  );
  const payload = {
    model: "gpt-3.5-turbo",
    n: 1,
    messages: messages,
  };

  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, options);
  let result = "";

  if (response.status === 200) {
    const chatCompletion = await response.json();
    const firstChoice = chatCompletion.choices[0];

    if (firstChoice) {
      result = firstChoice.message.content;
    } else {
      console.warn(
        `Chat completion response did not include any assistance choices.`
      );
      result = `AI response did not include any choices.`;
    }
  } else {
    const text = await response.text();
    result = text;
  }
  return result;
};
