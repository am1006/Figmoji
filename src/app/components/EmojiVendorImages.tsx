import React from 'react';
import { EmojiData } from './App';

export default function EmojiVendorImages({ emoji }: { emoji: EmojiData }) {
  return (
    <>
      {/* Display all images */}
      <div className="grid grid-cols-2 gap-4 bg-white rounded shadow p-2 items-end">
        {Object.entries(emoji.vendorImages).map(([vendor, url]) => (
          <div key={vendor}>
            <span className="text-gray-800 font-bold">{vendor}</span>
            <img src={url} width="50" />
          </div>
        ))}
      </div>
    </>
  );
}
