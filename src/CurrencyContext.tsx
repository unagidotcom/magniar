import React, { createContext, useContext, useState, useEffect } from "react";

export interface CurrencyConfig {
  code: string;
  symbol: string;
  rate: number; // multiplier from 1 USD
  label: string;
}

export const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: "USD", symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { code: "EUR", symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { code: "GBP", symbol: "£", rate: 0.80, label: "GBP (£)" },
  AUD: { code: "AUD", symbol: "A$", rate: 1.51, label: "AUD (A$)" },
  CAD: { code: "CAD", symbol: "C$", rate: 1.37, label: "CAD (C$)" },
  JPY: { code: "JPY", symbol: "¥", rate: 155.4, label: "JPY (¥)" },
  INR: { code: "INR", symbol: "₹", rate: 83.3, label: "INR (₹)" },
  AED: { code: "AED", symbol: "AED ", rate: 3.67, label: "AED" },
};

interface CurrencyContextType {
  currentCurrency: CurrencyConfig;
  setCurrencyByCode: (code: string) => void;
  formatValue: (valUSD: number, roundDecimals?: number) => string;
  formatCompact: (valUSD: number) => { prefix: string; value: string; suffix: string };
  convertValue: (valUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | null>(null);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyConfig>(CURRENCIES.USD);

  const setCurrencyByCode = (code: string) => {
    if (CURRENCIES[code]) {
      setCurrentCurrency(CURRENCIES[code]);
      localStorage.setItem("user-currency", code);
    }
  };

  useEffect(() => {
    // 1. Check local storage override
    const saved = localStorage.getItem("user-currency");
    if (saved && CURRENCIES[saved]) {
      setCurrentCurrency(CURRENCIES[saved]);
      return;
    }

    // 2. Fallback strategy based on user's timezone before loading API
    const detectTimeZoneCurrency = () => {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        const lowerTz = tz.toLowerCase();
        if (lowerTz.includes("london") || lowerTz.includes("europe/london")) return "GBP";
        if (lowerTz.includes("europe")) return "EUR";
        if (lowerTz.includes("australia") || lowerTz.includes("sydney") || lowerTz.includes("melbourne")) return "AUD";
        if (lowerTz.includes("canada") || lowerTz.includes("toronto") || lowerTz.includes("vancouver")) return "CAD";
        if (lowerTz.includes("tokyo") || lowerTz.includes("japan")) return "JPY";
        if (lowerTz.includes("calcutta") || lowerTz.includes("kolkata") || lowerTz.includes("delhi") || lowerTz.includes("mumbai") || lowerTz.includes("india")) return "INR";
        if (lowerTz.includes("dubai") || lowerTz.includes("abu_dhabi") || lowerTz.includes("asia/dubai")) return "AED";
        return "USD";
      } catch (e) {
        return "USD";
      }
    };

    const initialCode = detectTimeZoneCurrency();
    if (initialCode !== "USD") {
      setCurrencyByCode(initialCode);
    }

    // 3. Precise lookup via a free IP Info service
    const detectGeoCurrency = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        if (!res.ok) throw new Error("Geo lookup rate limit");
        const data = await res.json();
        const countryCurrency = data.currency; // e.g. "EUR", "INR"
        if (countryCurrency && CURRENCIES[countryCurrency]) {
          setCurrencyByCode(countryCurrency);
        }
      } catch (err) {
        // Safe fail - keep standard timezone currency or USD
        console.log("Geolocation currency fallback used.");
      }
    };

    detectGeoCurrency();
  }, []);

  const convertValue = (valUSD: number) => {
    return valUSD * currentCurrency.rate;
  };

  const formatValue = (valUSD: number, roundDecimals: number = 0) => {
    const converted = convertValue(valUSD);
    const formattedNum = converted.toLocaleString(undefined, {
      minimumFractionDigits: roundDecimals,
      maximumFractionDigits: roundDecimals,
    });
    return `${currentCurrency.symbol}${formattedNum}`;
  };

  const formatCompact = (valUSD: number) => {
    const converted = convertValue(valUSD);
    // e.g. for statistics like 84M, if we convert 84 to EUR it becomes 77.28
    const formattedNum = converted.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
    });
    return {
      prefix: currentCurrency.symbol,
      value: formattedNum,
      suffix: "",
    };
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCurrency,
        setCurrencyByCode,
        formatValue,
        formatCompact,
        convertValue,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
