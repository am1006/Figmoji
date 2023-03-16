import React from 'react';
import { EmojiData } from './App';

export default function EmojiDescription({ emoji }: { emoji: EmojiData }) {
  return (
    <>
      {/* Insert dangerous html for description */}
      <div
        className="prose prose-h2:mt-2 border rounded p-4 bg-white shadow w-2/3"
        dangerouslySetInnerHTML={{ __html: emoji.description }}
      />
    </>
  );
}
