import React, { useState } from 'react';
import { Button, Input } from 'react-figma-plugin-ds';
import { EditBasicInfoType } from '../../plugin/editBasicInfo';
import { EmojiData } from './App';

function emojiFromUnicode(unicode: string) {
  const codePoint = parseInt(unicode.replace('U+', ''), 16);
  return String.fromCodePoint(codePoint);
}

export default function BasicInfo({ emoji }: { emoji: EmojiData }) {
  // get today's year, month, day
  const today = new Date();
  const todayY = today.getFullYear().toString();
  const todayM = (today.getMonth() + 1).toString().padStart(2, '0');
  const todayD = today.getDate().toString().padStart(2, '0');

  const [date, setDate] = useState({
    y: todayY,
    m: todayM,
    d: todayD,
  });

  const displayedDate = new Date(`${date.y}-${date.m}-${date.d}`);

  // Display date in "yy.mm.dd" format
  const dateCh = displayedDate
    .toLocaleDateString('zh-CN', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');

  // Display day in "周x" format
  const dayCh = displayedDate.toLocaleDateString('zh-CN', { weekday: 'short' });

  const onInsert = (input: EditBasicInfoType) => {
    console.log('onEmojiInsert', input);
    parent.postMessage({ pluginMessage: { type: 'edit-basic-info', input } }, '*');
  };

  return (
    <div className="flex flex-col border p-2 gap-1 bg-white rounded shadow py-2 items-end">
      <div className="border-b pb-4 mb-4">
        <div className="flex flex-row gap-2">
          <Input
            className=""
            defaultValue={date.y}
            onChange={(e) => {
              setDate({ ...date, y: e.toString() });
            }}
            placeholder="Year"
          />

          <Input
            className=""
            defaultValue={date.m}
            onChange={(e) => {
              setDate({ ...date, m: e.toString() });
            }}
            placeholder="Month"
          />

          <Input
            className=""
            defaultValue={date.d}
            onChange={(e) => {
              setDate({ ...date, d: e.toString() });
            }}
            placeholder="Day"
          />
        </div>

        <div className="flex flex-row gap-2 rounded border border-dotted px-2 py-1 mt-1 bg-gray-50">
          <p className="text-xs font-light">Preview: </p>
          <p className="text-gray-700 text-xs font-light">{dayCh}</p>
          <p className="text-gray-700 text-xs font-light">{dateCh} </p>
        </div>
      </div>

      <table className="table-auto w-full text-sm text-left text-gray-500 border-b pb-4 mb-4">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-2 py-2">Tag</th>
            <th className="py-2">Value</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="px-2 py-1">Emoji</td>
            <td className="py-1">{emojiFromUnicode(emoji.unicode)}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">№</td>
            <td className="py-1">{emoji.no}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">Unicode</td>
            <td className="py-1">{emoji.unicode}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">Name</td>
            <td className="py-1">{emoji.name}</td>
          </tr>
          <tr>
            <td className="px-2 py-1">AltNames</td>
            <td className="py-1">{emoji.altNames}</td>
          </tr>
        </tbody>
      </table>

      <Button
        onClick={() =>
          onInsert({
            emoji: emojiFromUnicode(emoji.unicode),
            no: emoji.no.toString().padStart(4, '0'),
            unicode: emoji.unicode,
            dayCh: dayCh,
            dateCh: dateCh,
          })
        }
      >
        Insert Basic Information
      </Button>
    </div>
  );
}
