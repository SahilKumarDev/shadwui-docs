import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  readComponentPath,
  readComponentSource,
} from "@/lib/readComponentSource";


// import { TheamToggler } from "../../components/theam/TheamToggler";
// import { CodeBlock } from "./codeblock";
// import { DotPattern } from "@/components/magicui/dot-pattern"; 



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
        <CardHeader className="py-1.5 flex-row items-center justify-between bg-fd-accent ">
          <CardTitle className="text-sm">{cardComponentName}</CardTitle>

          <div className="flex items-center justify-center">
            {/* <TheamToggler /> */} Theam-TOggler
            <TabsList className="border border-fd-background rounded-lg bg-fd-background">
              <TabsTrigger
                value="preview"
                className=" data-[state=active]:bg-red-600 hover:cursor-pointer text-xs"
              >
                Preview
              </TabsTrigger>
              <TabsTrigger
                value="code"
                className=" data-[state=active]:bg-red-600 hover:cursor-pointer text-xs"
              >
                Code
              </TabsTrigger>
            </TabsList>
          </div>
        </CardHeader>

        <Separator className="bg-fd-border" />

        <CardContent className="p-0">
          <TabsContent
            value="preview"
            className="p-0 relative flex items-center justify-center py-10"
          >
            {/* <DotPattern
              className={cn(
                "absolute [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
              )}
              height={22}
              width={22}
              /> */}
            <Component />
          </TabsContent>

          <TabsContent value="code" className="">
            {/* <CodeBlock code={source!} /> */}
            {/* {source} */}
<code >{source}</code>
 
          </TabsContent>
        </CardContent>
      </Card>
    </Tabs>
  );
};

export default Data;
