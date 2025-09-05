import React, { useState, useEffect } from "react";

function DeckForm({ initialData = { name: "", description: "" }, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          placeholder="Deck Name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of the deck"
          required
        />
      </div>

      <button type="button" className="btn btn-secondary mr-2" onClick={onCancel}>
        Cancel
      </button>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}

export default DeckForm;
