import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Breadcrumb from "./Components/Breadcrumb";

function DeckView() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  // Load deck details
  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchDeck();
  }, [deckId]);

  // Delete deck
  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  // Delete card
  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Delete this card? You will not be able to recover it.")) {
      await deleteCard(cardId);
      setDeck((prev) => ({
        ...prev,
        cards: prev.cards.filter((card) => card.id !== cardId),
      }));
    }
  };

  if (!deck) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb
        items={[
          { name: "Home", path: "/" },
          { name: deck.name, path: `/decks/${deck.id}` },
        ]}
      />

      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      {/* Deck Actions */}
      <div className="mb-3">
        <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary me-2">
          Edit
        </Link>
        <Link to={`/decks/${deck.id}/study`} className="btn btn-primary me-2">
          Study
        </Link>
        <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary me-2">
          + Add Cards
        </Link>
        <button className="btn btn-danger" onClick={handleDeleteDeck}>
          Delete
        </button>
      </div>

      {/* Cards Section */}
      <h3>Cards</h3>
      {deck.cards.length === 0 ? (
        <p>No cards yet. Add some!</p>
      ) : (
        deck.cards.map((card) => (
          <div key={card.id} className="card mb-2">
            <div className="card-body d-flex justify-content-between">
              <div className="col-5">{card.front}</div>
              <div className="col-5">{card.back}</div>
              <div className="col-2 text-end">
                <Link
                  to={`/decks/${deck.id}/cards/${card.id}/edit`}
                  className="btn btn-secondary me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteCard(card.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DeckView;
