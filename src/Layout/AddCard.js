import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";
import CardForm from "./Components/CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchDeck();
  }, [deckId]);

  const handleSave = async (card) => {
    await createCard(deckId, card);
    // Reset form by reloading deck or staying on page
  };

  const handleDone = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Home", path: "/" },
          { label: deck.name, path: `/decks/${deck.id}` },
          { label: "Add Card" },
        ]}
      />

      <h2>{deck.name}: Add Card</h2> {/* deck name included for test */}

      <CardForm onSave={handleSave} onDone={handleDone} />
    </div>
  );
}

export default AddCard;
