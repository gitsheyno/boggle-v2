import { ReactNode } from "react";

export default function StyledModal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-xl
                  bg-white rounded-lg shadow-lg p-8 transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
}
