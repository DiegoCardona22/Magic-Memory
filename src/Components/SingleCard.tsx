// @styles
import "./SingleCard.css";

// @interfaces
interface CardImage {
  id?: number;
  matched: boolean;
  src: string;
}

interface SingleCardProps {
  card: CardImage;
  disabled: boolean;
  flipped: boolean;
  handleChoice: (card: CardImage) => void;
}

const SingleCard = ({
  card,
  disabled,
  flipped,
  handleChoice,
}: SingleCardProps) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          alt="card-back"
          className="back"
          onClick={handleClick}
          src="/images/cover.png"
        />
      </div>
    </div>
  );
};

export default SingleCard;
