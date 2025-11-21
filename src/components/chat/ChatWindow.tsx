// recieves props (messages/results)

"use client";

import { FlightResult, RestaurantResult } from "@/appLogic/types";
import SuggestionWindow from "./SuggestionWindow";

export default function ChatWindow({
    results,
    loading
} : {
    results: Array<FlightResult | RestaurantResult>;
    loading: boolean;
}) {
    return (
        <div>
            <div className="mb-3 text-sm text-gray-500">Type to get inline suggestions (Tab accepts)</div>
            <div className="space-y-3">
                {loading && <div className="text-gray-600">Searching...</div>}
                {!loading && results.length === 0 && <div className="text-gray-500">No results</div>}
                {results.map((res) => (
                    <SuggestionWindow key={res.id} result={res} />
                ))}
            </div>
        </div>
    )
}