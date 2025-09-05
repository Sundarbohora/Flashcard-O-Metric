import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";

function Study() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchDeck();
  }, [deckId]);

  if (!deck) return <p>Loading...</p>;

  const cards = deck.cards;

  if (cards.length < 3) {
    return (
      <div>
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: deck.name, path: `/decks/${deck.id}` },
            { label: "Study" },
          ]}
        />
        <h2>Study: {deck.name}</h2>
        <h4>Not enough cards.</h4>
        <p>
          You need at least 3 cards to study. This deck has {cards.length} card
          {cards.length !== 1 ? "s" : ""}.
        </p>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
          + Add Cards
        </Link>
      </div>
    );
  }

  const card = cards[cardIndex];

  const handleFlip = () => setFlipped(!flipped);

  const handleNext = () => {
    if (cardIndex + 1 < cards.length) {
      setCardIndex(cardIndex + 1);
      setFlipped(false);
    } else {
      if (
        window.confirm(
          "Restart cards?\n\nClick 'Cancel' to return to the home page."
        )
      ) {
        setCardIndex(0);
        setFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: deck.name, path: `/decks/${deck.id}` },
          { label: "Study" },
        ]}
      />
      <h2>Study: {deck.name}</h2>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cardIndex + 1} of {cards.length}
          </h5>
          <p className="card-text">{flipped ? card.back : card.front}</p>
          <button className="btn btn-secondary me-2" onClick={handleFlip}>
            Flip
          </button>
          {flipped && (
            <button className="btn btn-primary" onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Study;
