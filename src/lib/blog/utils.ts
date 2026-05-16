// Average adult reading speed in English; Arabic is slightly slower per
// research but close enough — we use one constant for both locales for
// consistency in the post header UI.
const WORDS_PER_MINUTE = 220;

// Strip HTML tags so the word count reflects actual prose, not markup.
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, " ");
}

export function calculateReadingTime(body: string): number {
  const wordCount = stripHtml(body).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function wordCount(body: string): number {
  return stripHtml(body).trim().split(/\s+/).filter(Boolean).length;
}

export function formatPostDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatPostDateAr(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("ar-SA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
