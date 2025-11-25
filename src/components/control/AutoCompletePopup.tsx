// list of suggestions and emits onSelect
"use client";

import type { Suggestion } from "@/appLogic/types";

export default function AutocompletePopup({
  suggestions,
  selectedIndex,
  onSelect,
}: {
  suggestions: Suggestion[];
  selectedIndex: number;
  onSelect: (s: Suggestion) => void;
}) {
  return(
    <div className="absolute z-50 mt-1 w-full bg-white rounded shadow-lg border">
        {suggestions.length === 0 && <div className="p-2 text-gray-500">No suggestions</div>}
        {suggestions.map((s,i)=>(
            <button 
            key={s.value + i}
            onMouseDown={(e) =>{
                e.preventDefault();
                onSelect(s);
            }}
            className={
                "w-full text-left px-3 py-2 hover:bg-gray-100 " + (i === selectedIndex ? "bg-gray-100" : "")
            }
            >
                <div className="flex justify-between">
                    <span className="truncate">{s.value}</span>
                    <span className="text-xs text-gray-400">{s.type}</span>
                </div>
            </button>
        ))}
    </div>
  );
}
