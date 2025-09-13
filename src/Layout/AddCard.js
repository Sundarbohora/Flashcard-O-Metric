import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, createCard } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";
import CardForm from "./Components/CardForm";

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();
  const [card, setCard] = useState({ front: "", back: "" }); // controlled state

  // Load deck data
  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchDeck();
  }, [deckId]);

  // Handle typing in form
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  // Handle save
  const handleSave = async (event) => {
    event.preventDefault();
    await createCard(deckId, card);
    setCard({ front: "", back: "" }); // reset form after save
  };

  // Handle Done button
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

      <h2>{deck.name}: Add Card</h2>

      <form onSubmit={handleSave}>
        <div className="form-group">
          <label htmlFor="front">Front</label>
          <textarea
            className="form-control"
            id="front"
            name="front"
            placeholder="Front side of card"
            value={card.front}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="back">Back</label>
          <textarea
            className="form-control"
            id="back"
            name="back"
            placeholder="Back side of card"
            value={card.back}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="button"
          className="btn btn-secondary mr-2"
          onClick={handleDone}
        >
          Done
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddCard;
