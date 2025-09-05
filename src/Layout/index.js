import React from "react";
import { Routes, Route } from "react-router-dom";

// Screens
import Home from "./Home";
import Deck from "./Deck";
import Study from "./Study";
import CreateDeck from "./CreateDeck";
import EditDeck from "./EditDeck";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import NotFound from "./NotFound";

function Layout() {
  return (
    <div className="container mt-3">
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Create Deck */}
        <Route path="/decks/new" element={<CreateDeck />} />

        {/* Deck View */}
        <Route path="/decks/:deckId" element={<Deck />} />

        {/* Study */}
        <Route path="/decks/:deckId/study" element={<Study />} />

        {/* Edit Deck */}
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />

        {/* Add Card */}
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />

        {/* Edit Card */}
        <Route
          path="/decks/:deckId/cards/:cardId/edit"
          element={<EditCard />}
        />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default Layout;
