// Context setup
import { useContext } from "react";
import CountryContext from "../context/context";

// TypeScript types
import type { CountryContextType } from "../types/types";

export default function useCountryContext(): CountryContextType {
  const context = useContext(CountryContext);

  if (!context) throw new Error("The context must be used within a Provider");

  return context;
}
