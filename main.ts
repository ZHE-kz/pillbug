import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleLineRequest } from "./line.ts";
import { loadQuestions } from "./sheets.ts";

console.log("🦕 Server starting on port 8000...");

// 啟動時載入題庫
await loadQuestions();

serve(async (req) => {
  const url = new URL(req.url);
  
  if (req.method === "POST" && url.pathname === "/webhook") {
    return await handleLineRequest(req);
  }

  return new Response("🐭 LINE Bot Server Running!", {
    status: 200,
    headers: { "content-type": "text/plain" },
  });
});
