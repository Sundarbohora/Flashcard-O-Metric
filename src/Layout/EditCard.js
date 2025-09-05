import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState(null);
  const [form, setForm] = useState({ front: "", back: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const deckData = await readDeck(deckId);
      const cardData = await readCard(cardId);
      setDeck(deckData);
      setForm({ front: cardData.front, back: cardData.back });
    };
    loadData();
  }, [deckId, cardId]);

  if (!deck) return <p>Loading...</p>;

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateCard({ id: cardId, deckId, ...form });
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: deck.name, path: `/decks/${deckId}` },
          { name: `Edit Card ${cardId}`, path: null },
        ]}
      />
      <h2>Edit Card</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Front</label>
          <textarea name="front" value={form.front} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Back</label>
          <textarea name="back" value={form.back} onChange={handleChange} className="form-control" required />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditCard;
