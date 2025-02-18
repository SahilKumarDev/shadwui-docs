"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CodeBlockProps {
  code: string;
  highlightedLines?: number[];
  theme?: "light" | "dark";
}

const CodeBlock = ({
  code,
  highlightedLines = [],
  theme = "light",
}: CodeBlockProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const codeLines = code.split("\n");
  const maxHeight = isExpanded ? "none" : "250px";

  return (
    <div
      className={`relative overflow-hidden ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        style={{ maxHeight }}
        className={`overflow-auto transition-all duration-300 pb-10 ${
          !isExpanded && "mask-bottom"
        }`}
      >
        <pre className="p-2 text-sm font-mono leading-6">
          {codeLines.map((line, index) => (
            <div
              key={index}
              className={`${
                highlightedLines.includes(index + 1)
                  ? theme === "dark"
                    ? "bg-gray-800"
                    : "bg-gray-200"
                  : ""
              } ${theme === "dark" ? "text-gray-100" : "text-gray-800"}`}
            >
              <span
                className={`inline-block w-8 mr-4 text-right ${
                  theme === "dark" ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {index + 1}
              </span>
              {line || "\n"}
            </div>
          ))}
        </pre>
      </div>


      {codeLines.length > 10 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-full absolute bottom-0 left-0 p-2 flex items-center justify-center hover:cursor-pointer expend-code hover:text-white/60  transition-colors`}
        >
          {isExpanded ? (
            <>
              <ChevronUp size={22} className="mr-2" />
              Expend less
            </>
          ) : (
            <>
              <ChevronDown size={22} className="mr-2" />
              Expend more
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default CodeBlock;
