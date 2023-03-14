import React from 'react';
import { Button } from 'react-figma-plugin-ds';
import { EditBasicInfoType } from '../../plugin/editBasicInfo';
import { EmojiData } from './App';

function emojiFromUnicode(unicode: string) {
  const codePoint = parseInt(unicode.replace('U+', ''), 16);
  return String.fromCodePoint(codePoint);
}

export default function EmojiBasicInfo({ emoji }: { emoji: EmojiData }) {
  const onEmojiInsert = (input: EditBasicInfoType) => {
    console.log('onEmojiInsert', input);
    parent.postMessage({ pluginMessage: { type: 'edit-basic-info', input } }, '*');
  };

  return (
    <div className="flex flex-col border p-2 gap-2 bg-white rounded shadow py-2">
      <div className="flex flex-row gap-4">
        <p className="text-gray-500 font-bold">Emoji:</p>
        <span className="text-4xl">{emojiFromUnicode(emoji.unicode)}</span>
      </div>

      <div className="flex flex-row gap-4">
        <p className="text-gray-500 font-bold">№</p>
        <span className="">{emoji.no}</span>
      </div>

      <div className="flex flex-row gap-4">
        <p className="text-gray-500 font-bold">Unicode</p>
        <span className="">{emoji.unicode}</span>
      </div>

      <Button
        onClick={() =>
          onEmojiInsert({
            emoji: emojiFromUnicode(emoji.unicode),
            no: emoji.no.toString().padStart(4, '0'),
            unicode: emoji.unicode,
          })
        }
      >
        Insert
      </Button>

      <div className="flex">
        <p className="text-gray-500 font-bold">Name</p>
        <span className="">{emoji.name}</span>
      </div>

      <div className="flex">
        <p className="text-gray-500 font-bold">AltNames</p>
        <span className="">{emoji.altNames}</span>
      </div>
    </div>
  );
}
