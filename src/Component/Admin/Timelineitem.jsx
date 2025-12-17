import React, { useState } from 'react';

const TimelineItemForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({ year: '', label: '' });

  const handleAdd = () => {
    if (!newItem.year.trim() || !newItem.label.trim()) {
      alert('Year and Label are required!');
      return;
    }
    onAddItem(newItem);
    setNewItem({ year: '', label: '' });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl mb-8">
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <input
          placeholder="Year (e.g., 2007)"
          value={newItem.year}
          onChange={e => setNewItem({ ...newItem, year: e.target.value })}
          className="p-4 border-2 rounded-lg"
        />
        <input
          placeholder="Label (e.g., Minister of Health)"
          value={newItem.label}
          onChange={e => setNewItem({ ...newItem, label: e.target.value })}
          className="p-4 border-2 rounded-lg"
        />
      </div>
      <button onClick={handleAdd} className="px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700">
        + Add Timeline Item
      </button>
    </div>
  );
};

export default TimelineItemForm;