import React from 'react';
import { useEffect } from 'react';
import { Button, Input, Title } from 'react-figma-plugin-ds';

import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';

import EmojiDescription from './EmojiDescription';
import EmojiVendorImages from './EmojiVendorImages';

import BasicInfo from './BasicInfo';

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
  const [url, setUrl] = React.useState('http://127.0.0.1:5000');
  const [isLoading, setIsLoading] = React.useState(false);

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
    setIsLoading(true);
    const response = await fetch(`${url}/emoji/${number}`);
    const text = await response.text();
    setIsLoading(false);

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
      <div className="flex flex-row justify-between items-center">
        <h2 className="font-bold text-xl">Project Emoji Panel</h2>
        <p className="text-sm rounded p-2 border-dotted border text-gray-700 font-medium">
          Connected to: <span className="font-bold font-mono text-red-400">{url}</span>
        </p>
      </div>

      <div className="flex flex-row gap-2">
        {/* LEFT */}
        <div className="flex flex-col gap-2">
          {/* Set URL */}
          <div className="flex flex-row gap-4 bg-white rounded shadow p-2 items-center justify-between">
            <div className="flex items-center">
              <Input
                className=""
                defaultValue={url}
                icon="link-connected"
                onChange={(e) => {
                  setUrl(e.toString());
                }}
                placeholder="Type the self-hosted server URL"
              />
              <p className="text-xs font-light">/emoji/{number}</p>
            </div>
          </div>

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
              placeholder="Emoji No."
            />

            <Button isDisabled={isLoading} onClick={onGetInfo}>
              {isLoading && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Get Emoji Data
            </Button>
          </div>

          <BasicInfo emoji={emoji} />

          <EmojiVendorImages emoji={emoji} />
        </div>

        {/* RIGHT */}
        <EmojiDescription emoji={emoji} />
      </div>
    </div>
  );
}

export default App;
