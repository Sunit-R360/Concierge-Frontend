// shows results + add ons + booking button 
"use client";

import type { FlightResult, RestaurantResult } from "@/appLogic/types";
function isFlightResult(r: unknown): r is FlightResult {
    return(
        typeof r === "object" &&
        r !== null &&
        "airline" in r &&
        "from" in r &&
        "to" in r
    );
}

function isRestaurantResult(r: unknown): r is RestaurantResult{
    return(
        typeof r === "object" &&
        r !== null &&
        "name" in r
    );
}

export default function SuggestionWindow({result}:{result: FlightResult | RestaurantResult}) {
    const flight = isFlightResult(result);
    const restuarant = isRestaurantResult(result);

    return(
        <div className="p-4 border rounded bg-white">
            <div className="flex justify-between">
                <div>
                    <div className="font-semibold text-sm">
                        {flight ? result.airline : restuarant ? result.name : "Unknown"}
                    </div>
                    <div className="text-xs text-gray-600">
                        {flight ? `${result.from} -> ${result.to}` : restuarant ? result.cuisine ?? "" : ""}
                    </div>
                </div>
                <div className="text-right">
                    {flight && result.time && <div className="font-medium">{result.time}</div>}
                    {"price" in result && typeof result.price === "number" && (
                        <div className="text-sm text-gray-600">${result.price}</div>
                    )}
                </div>
            </div>
            {result.addOns && result.addOns.length > 0 && (
                <div className="mt-3 flex gap-3 flex-wrap">
                    {result.addOns.map((a)=>(
                        <button key={a.id} className="px-2 py-1 text-xs border rounded">
                            {a.name} (+${a.price})
                        </button>
                    ))}
                </div>
            )}

            <div className="mt-3 flex gap-3">
                <button className="px-3 py-1 border rounded text-sm">View</button>
                <button className="px-3 py-1 border-green-600 text-white rounded text-sm">Book/Pay</button>
            </div>
        </div>
    );
}