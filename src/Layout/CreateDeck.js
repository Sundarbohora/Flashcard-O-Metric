import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";

function CreateDeck() {
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newDeck = await createDeck(form);
    navigate(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Create Deck", path: null }]} />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control" required />
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}

export default CreateDeck;
