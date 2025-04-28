import { createContext } from "react";
type ModalContextType = {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
};

export const ModalContext: React.Context<ModalContextType | undefined> =
  createContext<ModalContextType | undefined>(undefined);
