// text area and keyboard handling 
"use client"

import { Suggestion } from "@/appLogic/types";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import debounce from "lodash.debounce";
import { autocompleteToken } from "@/appLogic/apiClient";
import AutocompletePopup from "./AutoCompletePopup";

export default function ChatInput({
    onSubmitPrompt,
    userId = "anon"
} : {
    onSubmitPrompt: (prompt: string) => void;
    userId?: string;
}) {
    const [value, setValue] = useState("I want to");
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [cursorPos, setCursorPos] = useState<number>(value.length);
    const [token, setToken] = useState("");
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const initialLength = useRef(value.length);

    useEffect(()=>{
        if(inputRef.current){
            const pos = initialLength.current;
            inputRef.current.selectionStart = pos;
            inputRef.current.selectionEnd = pos;
        }
    }, []);

    const fetchSuggestions = debounce(async(tok:string)=>{
        if(!tok || tok.trim().length===0){
            setSuggestions([]);
            setShowPopup(false);
            return;
        }
        try{
            const response = await autocompleteToken(tok, userId);
            setSuggestions(response.suggestions ?? []);
            setSelectedIndex(0);
            setShowPopup(true);
        } catch (error) {
            console.log(error);
        }
    }, 200);

    function extractTokenAtCursor(v: string, pos: number){
        const left = v.slice(0,pos);
        const match = left.match(/(\S+)$/);
        return match ? match[1] : "";
    }

    function handleChange(e: ChangeEvent<HTMLTextAreaElement>){
        const v = e.target.value;
        setValue(v);
        const pos = e.target.selectionStart ?? v.length;
        setCursorPos(pos);
        const tok = extractTokenAtCursor(v,pos);
        setToken(tok);
        fetchSuggestions(tok);
    }

    function applySuggestion(s: Suggestion){
        const pos = cursorPos;
        const left = value.slice(0);
        const right = value.slice(0,pos);
        const match = left.match(/(\S+)$/);
        let newVal: string;
        let newPos: number;
        if(!match){
            newVal = left + s.value + " " + right;
            newPos = (left + s.value + " ").length;  
        } else {
            const tokenStart = pos - match[1].length;
            newVal = value.slice(0,tokenStart) + s.value + " " + value.slice(pos);
            newPos = tokenStart + s.value.length + 1;
        }
        setValue(newVal);
        setShowPopup(false);
        setSuggestions([]);
        setTimeout(() => {
            setCursorPos(newPos);
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(newPos, newPos);
        }, 0);
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>){
        if(showPopup && suggestions.length > 0){
            if(e.key === "ArrowDown"){
                e.preventDefault();
                setSelectedIndex((i) => Math.min(i+1, suggestions.length - 1));
                return;
            } 
            if(e.key === "ArrowUp"){
                e.preventDefault();
                setSelectedIndex((i)=>Math.min(i-1 , 0));
                return;
            }
            if(e.key === "Tab"){
                e.preventDefault();
                const s = suggestions[selectedIndex];
                if(s) applySuggestion(s);
                return;
            }
            if(e.key === "Escape"){
                setShowPopup(false);
                setSuggestions([]);
                return;
            }

            // Submit the prompt on ctrl + enter or cmd + enter 
        }
        if(e.key === "Enter" && (e.ctrlKey || e.metaKey)){
            e.preventDefault();
            onSubmitPrompt(value);
        }
    }

    return (
        <div className="relative">
            <textarea 
            ref={inputRef} 
            value={value} 
            className="w-full p-3 border rounded h-28 resize-none focus:outline-none focus:ring"
            onChange={handleChange} 
            onKeyDown={handleKeyDown}
            onClick={(e) => {
                const t = e.target as HTMLTextAreaElement;
                const pos = t.selectionStart ?? t.value.length;
                setCursorPos(pos);
                const tok = extractTokenAtCursor(t.value, pos);
                setToken(tok);
                fetchSuggestions(tok);
            }}
            />

            {showPopup && suggestions.length > 0 && (
                <div style={{width: "100%"}} className="absolute left-0 top-20">
                    <AutocompletePopup suggestions={suggestions} selectedIndex={selectedIndex} onSelect={applySuggestion} />
                </div>
            )}

            <div className="flex items-center gap-2 mt-2">
                <button 
                    onClick={() => onSubmitPrompt(value)}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                    Search
                </button>
                <div className="text-sm text-gray-500">Tip: Tab to accept and Ctrl+Enter or Cmd + Enter to submit</div>
            </div>
        </div>
    )
}