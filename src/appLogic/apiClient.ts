// Abstraction to call either src/data mock providers or real external APIs.
// Single place to switch mocks → real providers; testable and avoids duplicating HTTP logic.

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export async function autocompleteToken(token: string, userId?: string){
    const response = await fetch (`${BASE}/api/autocomplete`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({token,userId})
    });
    if(!response.ok) throw new Error("autocomplete failed");
    return response.json();
}


export async function searchPrompt(prompt: string, userId?: string){
    try {
        const response = await fetch (`${BASE}/api/search`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({prompt,userId})
        });
        if(!response.ok) {
            const errorText = await response.text();
            throw new Error(`search failed: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("🔴 searchPrompt error:", error);
        throw error;
    }
}

export async function appendHistory(userId: string, prompt: string) {
  await fetch(`${BASE}/api/history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, prompt })
  });
}