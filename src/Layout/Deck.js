import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../utils/api";
import Breadcrumbs from "./Components/Breadcrumbs";

function Deck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState(null);
  const navigate = useNavigate();

  // Load deck data
  useEffect(() => {
    const fetchDeck = async () => {
      const data = await readDeck(deckId);
      setDeck(data);
    };
    fetchDeck();
  }, [deckId]);

  if (!deck) return <p>Loading...</p>;

  // Delete deck
  const handleDeleteDeck = async () => {
    if (window.confirm("Delete this deck? You will not be able to recover it.")) {
      await deleteDeck(deckId);
      navigate("/");
    }
  };

  // Delete a card
  const handleDeleteCard = async (cardId) => {
    if (window.confirm("Delete this card? You will not be able to recover it.")) {
      await deleteCard(cardId);
      setDeck((prevDeck) => ({
        ...prevDeck,
        cards: prevDeck.cards.filter((card) => card.id !== cardId),
      }));
    }
  };

  return (
    <div>
      {/* Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: deck.name },
        ]}
      />

      <h2>{deck.name}</h2>
      <p>{deck.description}</p>

      {/* Deck Action Buttons */}
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
          Delete Deck
        </button>
      </div>

      {/* Cards List */}
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

export default Deck;
