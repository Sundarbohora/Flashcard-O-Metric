import React, { useState, useEffect } from "react";

function CardForm({ initialData = { front: "", back: "" }, onSave, onDone }) {
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
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          id="front"
          name="front"
          className="form-control"
          rows="3"
          value={formData.front}
          onChange={handleChange}
          placeholder="Front side of card"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          id="back"
          name="back"
          className="form-control"
          rows="3"
          value={formData.back}
          onChange={handleChange}
          placeholder="Back side of card"
          required
        />
      </div>

      <button type="button" className="btn btn-secondary mr-2" onClick={onDone}>
        Done
      </button>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
}

export default CardForm;
