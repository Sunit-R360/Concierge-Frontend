// Define all shared TS interfaces
export type Suggestion<Tmeta = undefined> = {
    value: string;
    type?: string;
    meta?: Tmeta;
}

export type CitySuggestion = Suggestion<undefined>;
export type RestaurantSuggestion = Suggestion<{rating: number}>

export interface AddOn{
    id: string;
    name: string;
    price: number;
}

export interface FlightResult {
    id: string;
    airline: string;
    from: string;
    to: string;
    time?: string;
    classes?: string[];
    price?: number;
    durationMinutes?: number;
    addOns: AddOn[];
    score?: number;
}

export interface RestaurantResult {
    id: string;
    name: string;
    stars?: number;
    rating?: number;
    cuisine: string;
    availableSlots?: string[];
    addOns: AddOn[];
    score?: number;
}

export interface SearchResponse{
    results: Array<FlightResult | RestaurantResult>;
}