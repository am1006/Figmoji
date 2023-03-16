import React from 'react';
import { Button } from 'react-figma-plugin-ds';

import { EmojiData } from './App';

export default function EmojiVendorImages({ emoji }: { emoji: EmojiData }) {
  const onFillImages = (input: Record<string, string>) => {
    console.log('onFillImages', input);
    parent.postMessage({ pluginMessage: { type: 'fill-images', input } }, '*');
  };

  return (
    // Display all images
    <div className="flex flex-col bg-white rounded shadow p-2 items-end">
      <table className="table-auto w-full text-sm text-left text-gray-500 border-b pb-4 mb-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-2 py-2">Vendor</th>
            <th className="py-2">Image</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {Object.entries(emoji.vendorImages).map(([vendor, url]) => (
            <tr className="border-b" key={vendor}>
              <td className="px-2 py-1">{vendor}</td>
              <td className="py-1">
                <img src={url} width="40" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button onClick={() => onFillImages(emoji.vendorImages)}>Try insert</Button>
    </div>
  );
}
