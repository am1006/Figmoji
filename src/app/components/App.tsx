import React from 'react';
import { useEffect } from 'react';
import { Button, Input, Title } from 'react-figma-plugin-ds';

import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

import EmojiBasicInfo from './EmojiBasicInfo';
import EmojiDescription from './EmojiDescription';
import EmojiVendorImages from './EmojiVendorImages';
import TimeInfo from './TimeInfo';

export interface EmojiData {
  no: number;
  unicode: string;
  name: string;
  altNames: string;
  pediaHandle: string;
  description: string;
  vendorImages: Record<string, string>;
}

function App() {
  const [number, setNumber] = React.useState('998');
  const [emoji, setEmoji] = React.useState<EmojiData>({
    no: 998,
    unicode: 'U+1F319',
    name: 'crescent moon',
    altNames: 'crescent | moon',
    pediaHandle: 'crescent-moon',
    description:
      '<section class="description"><h2>Emoji Meaning</h2><p>A crescent moon, as in its <a href="/waxing-crescent-moon/">waxing crescent</a> phase. Depicts the moon as a thin, golden crescent, curving to the right and not displaying the remaining outline of the moon.</p><p>May be used for the moon more generally and saying good night. May be used in association with <a href="/star-and-crescent/">\u262a\ufe0f\u00a0Star and Crescent</a>, a popular but\u00a0unofficial symbol of Islam.</p><p>As of March 2019, sending\u00a0this emoji over Facebook\u00a0Messenger <a href="http://blog.emojipedia.org/this-emoji-actives-messenger-dark-mode/">activates\u00a0dark mode</a>.</p><p>See also <a href="/waxing-crescent-moon/">\ud83c\udf12\u00a0Waxing Crescent Moon</a>.</p><p>Google\u2019s moon <a href="/google/gmail/crescent-moon/">once</a> resembled a waning crescent moon, <a href="/twitter/twemoji-1.0/crescent-moon/">Twitter</a> and <a href="/facebook/1.0/crescent-moon/">Facebook\'s</a>\u00a0moons were\u00a0previously silver.</p><p><em>Crescent Moon</em> was approved as part of <a href="/unicode-6.0/">Unicode 6.0</a> in 2010 and added to <a href="/emoji-1.0/">Emoji 1.0</a> in 2015.</p></section>',
    vendorImages: {
      Apple: 'https://em-content.zobj.net/thumbs/240/apple/325/crescent-moon_1f319.png',
    },
  });

  const onGetInfo = async () => {
    const response = await fetch(`http://127.0.0.1:5000/emoji/${number}`);
    const text = await response.text();

    // to json
    const data: EmojiData = JSON.parse(text);
    setEmoji(data);
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'edit-emoji') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div className="p-4 flex flex-col gap-2 bg-slate-50">
      <h2 className="font-bold text-xl">Project Emoji Panel</h2>

      {/* Get Info */}
      <div className="flex flex-row gap-4 bg-white rounded shadow p-2">
        <Title className="!w-full" level="h2" size="large" weight="medium">
          № {number.toString().padStart(4, '0')}
        </Title>
        <Input
          className=""
          defaultValue={number}
          icon="search"
          onChange={(e) => {
            setNumber(e.toString());
          }}
          placeholder={number}
        />
        <Button onClick={onGetInfo}>Get Info</Button>
      </div>

      <EmojiBasicInfo emoji={emoji} />

      <TimeInfo />

      <EmojiVendorImages emoji={emoji} />

      <EmojiDescription emoji={emoji} />
    </div>
  );
}

export default App;
