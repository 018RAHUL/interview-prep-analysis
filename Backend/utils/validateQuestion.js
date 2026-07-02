import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

export const validateQuestion = async (
  title,
  description,
  category,
  difficulty
) => {
  try {
    // =========================
    // BASIC VALIDATION
    // =========================

    title = title.trim();
    description = description.trim();

    if (!title || !description) {
      return {
        valid: false,
        reason:
          "Title and description are required.",
      };
    }

    if (title.split(/\s+/).length < 3) {
      return {
        valid: false,
        reason:
          "Question title must contain at least 3 meaningful words.",
      };
    }

    if (description.split(/\s+/).length < 5) {
      return {
        valid: false,
        reason:
          "Description must contain at least 5 words.",
      };
    }

    // =========================
    // GIBBERISH DETECTION
    // =========================

    if (!/[a-zA-Z]/.test(title)) {
      return {
        valid: false,
        reason:
          "Question title is invalid.",
      };
    }

    const words = title
      .toLowerCase()
      .split(/\s+/);

    const uniqueWords = new Set(words);

    if (
      uniqueWords.size <= 1 &&
      words.length > 1
    ) {
      return {
        valid: false,
        reason:
          "Question appears meaningless.",
      };
    }

    const gibberishPattern =
      /^[a-z\s]+$/i;

    if (
      gibberishPattern.test(title) &&
      words.every(
        (word) =>
          word.length >= 3 &&
          !/[aeiou]/i.test(word)
      )
    ) {
      return {
        valid: false,
        reason:
          "Question appears meaningless.",
      };
    }

    // =========================
    // CATEGORY VALIDATION
    // =========================

    const validCategories = [
      "OS",
      "DBMS",
      "CN",
      "OOPS",
      "DSA",
      "CYBER SECURITY",
      "CRYPTOGRAPHY",
      "WEB DEVELOPMENT",
      "MACHINE LEARNING",
      "AI",
    ];

    if (
      !validCategories.includes(
        category.toUpperCase()
      )
    ) {
      return {
        valid: false,
        reason:
          "Invalid category selected.",
      };
    }

    // =========================
    // DIFFICULTY VALIDATION
    // =========================

    const validDifficulties = [
      "easy",
      "medium",
      "hard",
    ];

    if (
      !validDifficulties.includes(
        difficulty.toLowerCase()
      )
    ) {
      return {
        valid: false,
        reason:
          "Invalid difficulty selected.",
      };
    }

    // =========================
    // AI VALIDATION
    // =========================

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    const prompt = `
You are an expert technical interviewer.

Question Title:
${title}

Question Description:
${description}

Category:
${category}

Difficulty:
${difficulty}

Evaluate the question.

Rules:
1. Must be meaningful.
2. Must be technically correct.
3. Must belong to the provided category.
4. Must be suitable for interview preparation.
5. Must not be nonsense or gibberish.
6. Difficulty should reasonably match the question.

Examples of INVALID questions:

Title: asdasdasd
Title: cfhhgvn kbkj
Title: qwerty qwerty
Title: hello hello hello
Title: random words here

These MUST return:

{
  "valid": false,
  "reason": "Question is not meaningful."
}

Return ONLY valid JSON:

{
  "valid": true,
  "reason": ""
}
`;

    const result =
      await model.generateContent(
        prompt
      );

    const text =
      result.response.text();

    console.log(
      "Gemini Validation:",
      text
    );

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const jsonMatch =
      cleaned.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      throw new Error(
        "Invalid Gemini response"
      );
    }

    const parsed = JSON.parse(
      jsonMatch[0]
    );

    return {
      valid:
        parsed.valid ?? false,
      reason:
        parsed.reason || "",
    };
  } catch (error) {
    console.error(
      "Question Validation Error:",
      error.message
    );

    // Allow question creation if Gemini quota is exhausted
    if (
      error.message?.includes(
        "Quota exceeded"
      )
    ) {
      return {
        valid: false,
        reason: "Please try again later",
      };
    }

    return {
      valid: false,
      reason:
        "Please enter a valid question.",
    };
  }
};