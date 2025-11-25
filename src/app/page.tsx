"use client";

import { searchPrompt } from "@/appLogic/apiClient";
import { FlightResult, RestaurantResult } from "@/appLogic/types";
import ChatWindow from "@/components/chat/ChatWindow";
import ChatInput from "@/components/control/ChatInput";
import { useState } from "react";

export default function Home() {
  const [results, setResults] = useState<Array<FlightResult | RestaurantResult>>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmitPrompt(prompt: string) {
    setLoading(true);
    try{
      console.log("🔍 Sending prompt:", prompt);
      const response = await searchPrompt(prompt, "anon");
      console.log("✅ API Response:", response);
      console.log("📦 Results from response:", response.results);
      setResults(response.results ?? []);
      console.log("✨ Results set to state");
    } catch (error) {
      console.error("❌ Error fetching results:", error);
      alert("Error: " + (error instanceof Error ? error.message : "Unknown error"));
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Concierge Chat - Prototype</h1>
        <div className="bg-secondary rounded shadow p-4">
          <ChatWindow results={results} loading={loading} />
          <div className="mt-4">
            <ChatInput onSubmitPrompt={handleSubmitPrompt} userId="user123"/>
          </div>
        </div>
      </div>
    </div>
  );
}
