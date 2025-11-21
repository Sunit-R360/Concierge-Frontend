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
    <div>
        {suggestions.length === 0 && <div>No suggestions</div>}
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
                <div>
                    <span>{s.value}</span>
                    <span>{s.type}</span>
                </div>
            </button>
        ))}
    </div>
  );
}
