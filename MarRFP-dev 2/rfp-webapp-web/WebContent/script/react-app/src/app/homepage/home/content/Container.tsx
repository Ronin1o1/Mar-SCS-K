import React, { useState, useCallback, useContext } from "react";
import { Card } from "./Card";
import update from "immutability-helper";
import AccountStatus from "./AccountStatus";
import ViewableAccounts from "./ViewableAccounts";
import ApplicationContext, {
  IApplicationContext,
} from "../../../common/components/ApplicationContext";

export interface Item {
  id: number;
  content;
}

export interface ContainerState {
  cards: Item[];
}

export const Container = (props) => {
  const appContext: IApplicationContext = useContext(ApplicationContext);
  const [cards, setCards] = useState([
    {
      id: 1,
      content: <AccountStatus />,
    },
    {
      id: 2,
      content: <ViewableAccounts />,
    },
  ]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setCards((prevCards: Item[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as Item],
        ],
      })
    );
    appContext.setHomePageDragNoSelectStyle(true);
  }, []);

  const renderCard = useCallback(
    (card: { id: number; content: JSX.Element }, index: number) => {
      const setCardContent = (content, handlerId, dragRef) => {
        return React.cloneElement(content, {
          handlerId: handlerId,
          ref: dragRef,
        });
      };
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          content={(handlerId, ref) =>
            setCardContent(card.content, handlerId, ref)
          }
          moveCard={moveCard}
        ></Card>
      );
    },
    []
  );

  return <>{cards?.map((card, i) => renderCard(card, i))}</>;
};
