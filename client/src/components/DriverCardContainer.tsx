import { PropsWithChildren } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

interface DriverCardContainerProps {}

export function DriverCardContainer(
  props: DriverCardContainerProps & PropsWithChildren
) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-2">{props.children}</div>
    </DndProvider>
  );
}
