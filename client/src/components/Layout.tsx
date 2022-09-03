import { PropsWithChildren } from "react";

export function Layout(props: PropsWithChildren) {
  return <div>{props.children}</div>;
}
