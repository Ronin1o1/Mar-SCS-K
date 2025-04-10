import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { XYCoord } from "dnd-core";

const style = {
  //border: "dashed gray",
  padding: "0px 1rem",
  marginBottom: ".5rem",
  backgroundColor: "white",
  // cursor: "move",
};

export const ItemTypes = {
  CARD: "card",
};

export interface CardProps {
  id: number;
  content;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: number;
  type: string;
}

export const Card: FC<CardProps> = ({ id, content, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const dragRef = useRef(null);
  const [{ handlerId, isActive }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
        isActive: monitor.canDrop() && monitor.isOver(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!dragRef?.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = dragRef?.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [collected, drag, preview] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = collected.isDragging ? 0 : 1;

  drag(dragRef);
  drop(preview(ref));

  return (
    <div ref={ref} id={"card_" + id} style={{ ...style, opacity }}>
      {content(handlerId, dragRef)}
    </div>
  );
};
