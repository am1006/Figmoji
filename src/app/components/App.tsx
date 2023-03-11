import React from 'react';
import logo from '../assets/logo.svg';
import '../styles/ui.css';
import 'react-figma-plugin-ds/figma-plugin-ds.css';
import { Button, Textarea } from 'react-figma-plugin-ds';

function App() {
  const textbox = React.useRef<HTMLInputElement>(undefined);

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = () => {
    const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <img src={logo} />
      <h2 className="text-blue-600">Rectangle Creator</h2>
      <p>
        Count: <input ref={countRef} />
        <Textarea className="" defaultValue="" onChange={function _() {}} placeholder="Hello" rows={0} />
      </p>
      <Button onClick={onCreate}>Create</Button>
      <Button onClick={onCancel}>Cancel</Button>
    </div>
  );
}

export default App;
