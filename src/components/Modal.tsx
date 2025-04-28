import {
  cloneElement,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { ModalContext } from "./contexts/ModalContext";
import { createPortal } from "react-dom";
import StyledModal from "../ui/ModalWrapper";
import Overlay from "../ui/Overlay";
export default function Modal({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ onOpen, onClose, isOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

type OpenProps = {
  children: ReactElement<React.HTMLAttributes<HTMLElement>>;
};

function Open({ children }: OpenProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Open must be used within a Modal");
  }

  const { onOpen } = context;

  return cloneElement(children, { onClick: () => onOpen() });
}

function Window({ children }: OpenProps) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("Window must be used within a Modal");
  }
  const { onClose, isOpen } = context;
  if (!isOpen) return null;

  return createPortal(
    <Overlay>
      <StyledModal>
        <button onClick={onClose} className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div>
          {cloneElement(
            children as ReactElement<{ onCloseModal: () => void }>,
            { ...(children.props || {}), onCloseModal: () => onClose() }
          )}
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;
