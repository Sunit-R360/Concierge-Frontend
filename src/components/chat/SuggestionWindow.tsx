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
        <div>
            <div>
                <div>
                    <div>
                        {flight ? result.airline : restuarant ? result.name : "Unknown"}
                    </div>
                    <div>
                        {flight ? `${result.from} -> ${result.to}` : restuarant ? result.cuisine ?? "" : ""}
                    </div>
                </div>
                <div>
                    {flight && result.time && <div>{result.time}</div>}
                    {"price" in result && typeof result.price === "number" && (
                        <div>${result.price}</div>
                    )}
                </div>
            </div>
            {result.addOns && result.addOns.length > 0 && (
                <div>
                    {result.addOns.map((a)=>(
                        <button key={a.id}>
                            {a.name} (+${a.price})
                        </button>
                    ))}
                </div>
            )}

            <div>
                <button>View</button>
                <button>Book/Pay</button>
            </div>
        </div>
    );
}