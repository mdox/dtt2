import { useMemo } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Driver } from "../lib/types";
import { DriverCard } from "./DriverCard";

interface DriverCardContainerProps {
  items: Driver[];
  onTakePlace(takerDriverId: number, holderDriverId: number): void;
  onOvertake(driverId: number): void;
}

export function DriverCardContainer(props: DriverCardContainerProps) {
  // Memos
  const memoItems = useMemo(() => {
    return [...props.items];
  }, [props.items]);

  // Events
  function onDragEnd(result: DropResult) {
    if (!result.destination) return;

    const oldIndex = result.source.index;
    const newIndex = result.destination.index;

    const takerDriverId = memoItems[oldIndex].id;
    const holderDriverId = memoItems[newIndex].id;

    memoItems.splice(newIndex, 0, memoItems.splice(oldIndex, 1)[0]);

    props.onTakePlace(takerDriverId, holderDriverId);
  }

  // Renders
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="driver-card-container">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col"
          >
            {memoItems.map((driver, index) => (
              <DriverCard
                key={driver.id}
                index={index}
                {...driver}
                onOvertake={props.onOvertake}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
