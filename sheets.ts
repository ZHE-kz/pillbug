let questions: any[] = [];

export async function loadQuestions() {
  const sheetId = "你的_SHEET_ID";
  const apiKey = "你的_API_KEY";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Questions?key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();
  const rows = data.values || [];

  questions = rows.slice(1).map((row: string[]) => ({
    story: row[0],
    question: row[1],
    options: [row[2], row[3], row[4], row[5]],
    answer: row[6],
    explanation: row[7],
  }));

  console.log(`✅ Loaded ${questions.length} questions from Google Sheet`);
}

export function getQuestions() {
  return questions;
}
