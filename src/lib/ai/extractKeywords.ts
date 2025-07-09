/**
 * A lightweight, no-dependency keyword extractor that picks significant words based on frequency (very basic NLP-lite).
 */
export function extractKeywords(text: string, max = 5): string[] {
  const stopWords = new Set([
    "the",
    "is",
    "in",
    "at",
    "of",
    "a",
    "and",
    "to",
    "it",
    "on",
    "for",
    "with",
    "as",
    "by",
    "an",
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word && !stopWords.has(word));

  const freqMap: Record<string, number> = {};

  for (const word of words) {
    freqMap[word] = (freqMap[word] || 0) + 1;
  }

  return Object.entries(freqMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word);
}
