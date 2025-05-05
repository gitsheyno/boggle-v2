import { ReactNode } from "react";

export default function Overlay({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 
                  backdrop-blur-sm z-50 transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
}
