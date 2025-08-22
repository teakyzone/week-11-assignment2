const responsesDiv = document.getElementById("responses");

document.querySelector("form").addEventListener("submit", sendChatRequest);

async function sendChatRequest(event) {
  event.preventDefault();

  const prompt1 = event.target.prompt1.value;
  const prompt2 = event.target.prompt2.value;
  const prompt3 = event.target.prompt3.value;
  const prompt4 = event.target.prompt4.value;

  const prompt = `Create a detailed personal creative project brief for a freelance creative working in ${prompt1}. 
  The projects main goals or intentions are: ${prompt2}. 
  The creative work should be connected to contextual studies or inspirations such as: ${prompt3}. 
  Please include any specific constraints or preferences if provided: ${prompt4}.

  Summarize the main goals, inspirations, and constraints. 
Limit the response to under 400 words, focusing only on key points: Project Title, Objectives, Audience, Deliverables, and Timeline.
Use a clear and encouraging tone. 
Avoid long explanations or reflective questions
Analyze the provided project details and goals carefully. 
Offer original insights, creative suggestions, and possible challenges that fit the themes and constraints. 
Explain why these approaches could be effective. 
Include reflective questions or prompts that help the creative explore their ideas deeper. 
Avoid simply restating the inputs. Instead, expand on them thoughtfully and provide actionable advice or inspiration.`;

  console.log(prompt);
  const response = await fetch("http://localhost:8222/chat", {
    //https://week-11-assignment2.onrender.com or http://localhost:8222/chat
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      prompt,
    }),
  });

  const data = await response.json();
  console.log(data);

  const headings = [
    "Project Title",
    "Objectives",
    "Audience",
    "Deliverables",
    "Timeline",
  ];
  let formattedText = data;
  headings.forEach((heading) => {
    const regex = new RegExp(`(${heading}):`, "i");
    formattedText = formattedText.replace(regex, `<h3>$1:</h3>`);
  });

  responsesDiv.innerHTML = formattedText;
}
//const responseP = document.createElement("p");
//responseP.textContent = data;
//responsesDiv.appendChild(responseP);
