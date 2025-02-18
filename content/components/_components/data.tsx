import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TheamToggler } from "./TheamToggler";

import CodeBlock from "./CodeBlock";
import {
  readComponentPath,
  readComponentSource,
} from "@/lib/readComponentSource";
import { DotPattern } from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import CopyButton from "./CopyButton";

interface DataProps {
  componentName: string;
  sourcePath: string;
}

const Data = async ({ componentName, sourcePath }: DataProps) => {
  const Component = await readComponentPath(sourcePath, componentName);
  const source = await readComponentSource(sourcePath, componentName);

  const capitalizeComponentName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
  const cardComponentName = capitalizeComponentName.split("-").join(" ");

  return (
    <Tabs defaultValue="preview">
      <Card className="overflow-hidden">
        <CardHeader className="p-0 pr-2 space-y-0 flex-row items-center justify-between bg-fd-accent ">
          <TabsList className="pb-0">
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>

          <CardTitle className="text-sm -ml-10">{cardComponentName}</CardTitle>
          <div className="flex items-center justify-center">
            <CopyButton componentSource={source!} />
            <TheamToggler />
          </div>
        </CardHeader>

        <Separator className="bg-fd-border" />

        <CardContent className="p-0">
          <TabsContent
            value="preview"
            className="p-0 mt-0 relative flex items-center justify-center"
          >
            <DotPattern
              className={cn(
                "absolute [mask-image:radial-gradient(250px_circle_at_center,white,transparent)]"
              )}
              height={20}
              width={20}
            />
            <div className="w-full backdrop-blur-[1.5px] bg-transparent dark:bg-transparent dark:border-gray-800/10 flex items-center justify-center min-h-[250px] p-10">
              <Component />
            </div>
          </TabsContent>

          <TabsContent value="code" className="p-0 mt-0">
            <CodeBlock code={source!} theme="dark" />
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default Data;
