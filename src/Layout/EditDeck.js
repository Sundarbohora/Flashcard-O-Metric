import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";

function EditDeck() {
  const { deckId } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeck = async () => {
      const data = await readDeck(deckId);
      setForm({ name: data.name, description: data.description });
    };
    loadDeck();
  }, [deckId]);

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateDeck({ id: deckId, ...form });
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: form.name || "Deck", path: `/decks/${deckId}` },
          { name: "Edit Deck", path: null },
        ]}
      />
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control" required />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate(`/decks/${deckId}`)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default EditDeck;
