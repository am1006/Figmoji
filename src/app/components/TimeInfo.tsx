import React, { useState } from 'react';
import { Input } from 'react-figma-plugin-ds';

export default function TimeInfo() {
  // const [input, setInput] = React.useState<>({
  //   emoji: '🌙',
  //   number: '0998',
  //   day: '周一',
  //   date: '23.03.13',
  //   unicode: 'U+1F319',
  // });

  const onCreate = () => {
    parent.postMessage({ pluginMessage: { type: 'edit-emoji', input } }, '*');
  };
  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  const [date, setDate] = useState({
    y: '2023',
    m: '03',
    d: '13',
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

  return (
    <div className="flex flex-col border p-2 gap-2 bg-white rounded shadow py-2">
      <div className="flex flex-row">
        <p className="text-gray-500 font-bold">{dateCh} </p>
        <p className="text-gray-500 font-bold">{dayCh}</p>
      </div>
      <div className="w-full flex flex-row">
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
    </div>
  );
}
