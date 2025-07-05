'use client';
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import Flag from "react-world-flags";

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const languages = [
    { code: "US", label: "English", value: "en" },
    { code: "ES", label: "Spanish", value: "es" },
    { code: "BR", label: "Portuguese", value: "pt" },
  ];

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
  };

  const currentLanguage = languages.find(lang => lang.value === selectedLanguage);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="text-black flex items-center text-sm font-medium">
          <Flag code={currentLanguage?.code || "US"} className="inline-block mr-2 rounded-sm" width="24" height="24" />
          {currentLanguage?.label}
          <ChevronDown className="ml-2" size={14} />
        </button>
      </PopoverTrigger>
      <PopoverContent className="bg-white text-black border border-neutral-300 rounded-lg mt-2"
      align="start"
      >
        {languages.map(lang => (
          <button
            key={lang.value}
            className="flex items-center p-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 w-full rounded-lg"
            onClick={() => handleLanguageChange(lang.value)}
          >
            <Flag code={lang.code} className="inline-block mr-2 rounded-sm" width="20" />
            {lang.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};