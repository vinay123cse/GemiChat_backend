// import "dotenv/config";

// const getOpenAIAPIResponse = async(message) => {
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gpt-4o-mini",
//             messages: [{
//                 role: "user",
//                 content: message
//             }]
//         })
//     };

//     try {
//         const response = await fetch("https://api.openai.com/v1/chat/completions", options);
//         const data = await response.json();
//         return data.choices[0].message.content; //reply
//     } catch(err) {
//         console.log(err);
//     }
// }

// export default getOpenAIAPIResponse;




import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-goog-api-key": process.env.GEMINI_API_KEY
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                { text: message }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Gemini API Error:", data.error);
            throw new Error(
                data.error?.message || `HTTP Error: ${response.status}`
            );
        }

        const reply = data.candidates?.[0]?.content?.parts
            ?.map((part) => part.text || "")
            .join("");

        if (!reply) {
            throw new Error("Gemini returned an empty response.");
        }

        return reply;

    } catch (error) {
        console.error("Gemini request failed:", error.message);
        throw error;
    }
};

export default getOpenAIAPIResponse;
