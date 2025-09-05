import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listDecks, deleteDeck } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";

function Home() {
  const [decks, setDecks] = useState([]);
  const navigate = useNavigate();

  // Load all decks when Home mounts
  useEffect(() => {
    async function loadDecks() {
      const response = await listDecks();
      setDecks(response);
    }
    loadDecks();
  }, []);

  // Delete a deck
  const handleDelete = async (deckId) => {
    const confirmed = window.confirm(
      "Delete this deck?\n\nYou will not be able to recover it."
    );
    if (confirmed) {
      await deleteDeck(deckId);
      setDecks((current) => current.filter((deck) => deck.id !== deckId));
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Home" }]} />

      {/* Create Deck button */}
      <div className="mb-3">
        <Link to="/decks/new" className="btn btn-secondary">
          + Create Deck
        </Link>
      </div>

      {/* Deck list */}
      {decks.map((deck) => (
        <div key={deck.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{deck.name}</h5>
              <p>{deck.cards.length} cards</p>
            </div>
            <p className="card-text">{deck.description}</p>
            <div className="d-flex">
              <Link
                to={`/decks/${deck.id}`}
                className="btn btn-secondary mr-2"
              >
                View
              </Link>
              <Link
                to={`/decks/${deck.id}/study`}
                className="btn btn-primary mr-2"
              >
                Study
              </Link>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(deck.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
