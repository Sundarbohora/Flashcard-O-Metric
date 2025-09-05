import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Layout/Home";
import DeckView from "./Layout/DeckView";
import Study from "./Layout/Study";
import CreateDeck from "./Layout/CreateDeck";
import EditDeck from "./Layout/EditDeck";
import AddCard from "./Layout/AddCard";
import EditCard from "./Layout/EditCard";
import NotFound from "./Layout/NotFound";

function App() {
  return (
    <div className="container mt-3">
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Create Deck */}
        <Route path="/decks/new" element={<CreateDeck />} />

        {/* Deck View */}
        <Route path="/decks/:deckId" element={<DeckView />} />

        {/* Study Deck */}
        <Route path="/decks/:deckId/study" element={<Study />} />

        {/* Edit Deck */}
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />

        {/* Add Card */}
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />

        {/* Edit Card */}
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
