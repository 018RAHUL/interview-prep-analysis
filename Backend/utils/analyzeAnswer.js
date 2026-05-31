export const analyzeAnswer = (answer) => {
  let score = 0;
  let feedback = [];

  const words = answer.trim().split(/\s+/);
  const wordCount = words.length;

  // 🔹 Word count analysis
  if (wordCount > 120) score += 2;
  else if (wordCount > 60) score += 1;
  else feedback.push("Answer is too short. Add more depth.");

  // 🔹 Sentence structure
  const sentences = answer.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  if (sentences.length >= 4) score += 1;
  else feedback.push("Use multiple sentences for better clarity.");

  // 🔹 Keywords (basic relevance check)
  const keywords = ["definition", "advantage", "example", "use", "important"];
  let keywordMatches = keywords.filter((word) =>
    answer.toLowerCase().includes(word)
  ).length;

  if (keywordMatches >= 2) score += 1;
  else feedback.push("Include key concepts or keywords.");

  // 🔹 Final response
  return {
    score,
    feedback,
    wordCount,
  };
};