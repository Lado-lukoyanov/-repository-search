import type { ReactNode } from "react";

type StatusHandlerProps = {
  status: boolean[];
  children: ReactNode;
};

export const StatusHandler = ({ status, children }: StatusHandlerProps) => {
  const shouldRender = status.every((status) => status);

  return <>{shouldRender && children}</>;
};
