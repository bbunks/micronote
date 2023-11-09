import { CSSProperties, PropsWithChildren } from "react";
import { Card } from "../input/Card";
import { createPortal } from "react-dom";

interface Props {
  onBgClick: () => void;
  style?: CSSProperties;
}

export function Modal({
  onBgClick,
  style,
  children,
}: PropsWithChildren<Props>) {
  return (
    <>
      {createPortal(
        <div
          onClick={onBgClick}
          className="fixed top-0 right-0 left-0 bottom-0 bg-black z-10 bg-opacity-40 flex flex-col justify-center items-center"
        >
          <Card
            className="max-w-[600px] w-full"
            style={style}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </Card>
        </div>,
        document.body
      )}
    </>
  );
}
