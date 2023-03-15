import React from 'react';
import { Button } from 'react-figma-plugin-ds';
import { FillImagesInput } from '../../plugin/fillImages';
import { EmojiData } from './App';

export default function EmojiVendorImages({ emoji }: { emoji: EmojiData }) {
  const onFillImages = (input: FillImagesInput) => {
    console.log('onFillImages', input);
    parent.postMessage({ pluginMessage: { type: 'fill-images', input } }, '*');
  };

  return (
    <>
      <Button
        onClick={() =>
          onFillImages({
            url: emoji.vendorImages.Apple,
            vendor: 'Apple',
          })
        }
      >
        Try insert
      </Button>

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
