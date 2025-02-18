"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

const CopyButton = ({ componentSource }: { componentSource: string }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(componentSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider  delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground/80 hover:bg-transparent hover:text-foreground disabled:opacity-100 hover:cursor-pointer"
            onClick={handleCopy}
            aria-label={copied ? "Copied" : "Copy component source"}
            disabled={copied}
          >
            <Check
              className={cn(
                "transition-all",
                copied
                  ? "scale-100 opacity-100 text-green-500"
                  : "scale-0 opacity-0"
              )}
              size={28}
            />

            <Copy
              className={cn(
                "absolute transition-all",
                copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
              )}
              size={24}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-popover px-2 py-1 text-xs text-muted-foreground">
          {copied ? "Copied!" : "Copy Text"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyButton;
