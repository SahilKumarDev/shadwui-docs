import React from "react";

const MaxWidthWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="max-w-screen-2xl mx-auto">{children}</div>;
};

export default MaxWidthWrapper;
