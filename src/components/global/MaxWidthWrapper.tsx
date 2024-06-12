// The children of this component will have fixed width

//! IMPORTANT: Must use this for same width in each component

import { cn } from "@/lib/utils";

const WidthWrapper = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(className, "mx-auto w-full px-4 sm:px-8 lg:max-w-5xl")}>
      {children}
    </div>
  );
};

export default WidthWrapper;
