import { createContext } from "react";
import type { CountryContextType } from "../types/types";

const CountryContext = createContext<CountryContextType | null>(null);

export default CountryContext;
