import Data from "./_components/data";

interface ComponentPageProps {
  sourcePath: string;
  files: string[];
}

export default function ComponentPage({
  files,
  sourcePath,
}: ComponentPageProps) {
  return (
    <div className="space-y-8">
      {files.map((componentName) => {
        return (
          <Data
            componentName={componentName}
            sourcePath={sourcePath}
            key={componentName}
          />
        );
      })}
    </div>
  );
}
