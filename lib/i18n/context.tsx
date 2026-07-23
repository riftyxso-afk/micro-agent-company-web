"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { translations, type Locale } from "./translations";

type TranslationMap = typeof translations.id;

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: TranslationMap, key: string): string | undefined {
  return (obj as Record<string, string | undefined>)[key];
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    const stored = localStorage.getItem("locale") as Locale | null;
    if (stored === "id" || stored === "en") {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const map = translations[locale] as TranslationMap;
      let value = getNestedValue(map, key);
      if (value === undefined) {
        const fallbackMap = translations.id as TranslationMap;
        value = getNestedValue(fallbackMap, key);
      }
      if (value === undefined) return key;
      if (params) {
        return Object.entries(params).reduce(
          (acc, [k, v]) => acc.replace(new RegExp(`\\{${k}\\}`, "g"), String(v)),
          value
        );
      }
      return value;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return ctx;
}
