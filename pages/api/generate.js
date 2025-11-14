// If using Node.js <18, add: import fetch from 'node-fetch';
// For Node.js >=18, fetch is built-in

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  // Get expanded user data from request body
  const {
    name,
    email,
    phone,
    address,
    linkedIn,
    objective,
    education,
    skills,
    certifications,
    experience,
    projects,
    achievements,
    extracurricular,
    languages,
    references,
    jobDescription,
  } = req.body;

  // Build a truly complete and clear prompt for the LLM!
  const prompt = `
You are an expert resume and cover letter writer.

Generate a professional-looking resume and a personalized cover letter, using ONLY the provided user data below. Follow the modern resume layout: contact info at the top, clearly titled sections, relevant content, and bullet points for skills and experience. Do NOT use placeholders/brackets—fill every section with the actual data. If a field is missing, use "N/A".

User Info:
Name: ${name || "N/A"}
Email: ${email || "N/A"}
Phone: ${phone || "N/A"}
Address: ${address || "N/A"}
LinkedIn: ${linkedIn || "N/A"}
Objective/Summary: ${objective || "N/A"}
Education: ${education || "N/A"}
Skills: ${skills || "N/A"}
Certifications: ${certifications || "N/A"}
Experience: ${experience || "N/A"}
Projects: ${projects || "N/A"}
Achievements: ${achievements || "N/A"}
Extracurricular: ${extracurricular || "N/A"}
Languages: ${languages || "N/A"}
References: ${references || "N/A"}

Job Description: ${jobDescription || "N/A"}

Format for Resume:
------------------------------------------------------------
${name}
${address}
Email: ${email} | Phone: ${phone} | LinkedIn: ${linkedIn}
------------------------------------------------------------

Objective:
${objective}

Education:
${education}

Skills:
- ${skills.split(",").join("\n- ")}

Certifications:
${certifications}

Experience:
${experience}

Projects:
${projects}

Achievements:
${achievements}

Extracurricular:
${extracurricular}

Languages:
${languages}

References:
${references}

------------------------------------------------------------

Cover Letter:
Dear Hiring Manager,

I am excited to apply for the ${
    jobDescription || "N/A"
  } position at your company. My name is ${name} and my experience includes ${experience}, with skills in ${skills}. (Continue with personalized content, mentioning education, achievements, and how you fit the job. Use the info above — do not use any placeholders or ask for manual insertion.)

Thank you for your time and consideration.

Sincerely,
${name}
Email: ${email}
Phone: ${phone}

------------------------------------------------------------
Output only the full formatted resume and cover letter as shown above.
`;

  try {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama", // swap with "llama2" or another model you want (after running with ollama)
        prompt: prompt,
        stream: false, // always use non-stream for single output
      }),
    });

    const data = await response.json();
    // Ollama returns { response: "...", ... }
    const result = data.response || "No output generated.";
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
