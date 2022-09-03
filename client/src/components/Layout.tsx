import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren) {
  return <div className="max-w-screen-md mx-auto">{props.children}</div>;
}
