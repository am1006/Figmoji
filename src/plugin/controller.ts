// The iframe can access the browser APIs but not the Figma "scene."

import editBasicInfo from './editBasicInfo';
import fillImages from './fillImages';

figma.showUI(__html__);
figma.ui.resize(960, 480);

figma.ui.onmessage = async (msg) => {
  if (msg.type == 'edit-basic-info') {
    await editBasicInfo(msg.input);
  }

  if ((msg.type = 'fill-images')) {
    await fillImages(msg.input);
  }

  if (msg.type === 'create-rectangles') {
    const nodes = [];

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${msg.count} Rectangles`,
    });
  }

  if (msg.type === 'close') {
    figma.closePlugin(`🎉 Success! Now go make something great! 🚀`);
  }
};

// Page 1:
//  1. Replace some parts with today's emoji
//  2. Replace date, day, emoji No. (fetched from full list)
//

// Page 2:
// 1. Replace some parts with today's emoji
// 2. Replace emoji No. (fetched from full list) and unicode
// 3. Set up placeholder for manual input: use urls from pedia and full list to enable fast operation

// Page 3:
// Fetch each platform's design from emojipedias
