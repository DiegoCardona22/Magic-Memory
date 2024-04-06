// @packages
import { useEffect, useState } from "react";

// @components
import SingleCard from "./Components/SingleCard";

// @styles
import "./App.css";

// @interfaces
interface CardImage {
  id?: number;
  matched: boolean;
  src: string;
}

const cardImages: CardImage[] = [
  { src: "/images/helmet-1.png", matched: false },
  { src: "/images/potion-1.png", matched: false },
  { src: "/images/ring-1.png", matched: false },
  { src: "/images/scroll-1.png", matched: false },
  { src: "/images/shield-1.png", matched: false },
  { src: "/images/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState<CardImage[]>([]);
  const [choiceOne, setChoiceOne] = useState<CardImage | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardImage | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [turns, setTurns] = useState<number>(0);

  // Shuffle Cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffleCards);
    setTurns(0);
  };

  const handleChoice = (card: CardImage) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 500);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            handleChoice={handleChoice}
            key={card.id}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
