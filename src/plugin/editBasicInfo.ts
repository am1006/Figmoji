export interface EditBasicInfoType {
  emoji: string;
  no: string;
  unicode: string;
}

export default async function editBasicInfo(input: EditBasicInfoType) {
  // Load fonts
  await figma.loadFontAsync({ family: 'PingFang SC', style: 'Light' });
  await figma.loadFontAsync({ family: 'PingFang SC', style: 'Regular' });
  await figma.loadFontAsync({ family: 'PingFang SC', style: 'Medium' });
  await figma.loadFontAsync({ family: 'Hasklug Nerd Font', style: 'Light' });

  // Get "#Emoji" text node on both frames
  const emojiNodes: TextNode[] = getAllOccurrences('#Emoji');
  const numberNodes: TextNode[] = getAllOccurrences('#Number');
  const unicodeNodes: TextNode[] = getAllOccurrences('#Unicode');

  // Replace text with today's emoji
  emojiNodes.forEach((node) => {
    node.characters = input.emoji;
  });

  numberNodes.forEach((node) => {
    node.characters = input.no;
  });

  unicodeNodes.forEach((node) => {
    node.characters = input.unicode;
  });

  // This is how figma responds back to the ui
  figma.ui.postMessage({
    type: 'edit-basic-info',
    message: `Edited Emoji ${input.emoji}, No. ${input.no}, Unicode ${input.unicode}`,
  });
}

const getAllOccurrences = (name: string) => {
  // TODO: get selections from user
  const frame_1 = figma.currentPage.findOne((node) => node.name === 'frame1' && node.type === 'FRAME') as FrameNode;
  const frame_2 = figma.currentPage.findOne((node) => node.name === 'frame2' && node.type === 'FRAME') as FrameNode;
  const frame_3 = figma.currentPage.findOne((node) => node.name === 'frame2' && node.type === 'FRAME') as FrameNode;

  // Get "#Emoji" text node on both frames
  const nodes: TextNode[] = [];

  nodes.push(...(frame_1.findAll((node) => node.name === name && node.type === 'TEXT') as TextNode[]));
  nodes.push(...(frame_2.findAll((node) => node.name === name && node.type === 'TEXT') as TextNode[]));
  nodes.push(...(frame_3.findAll((node) => node.name === name && node.type === 'TEXT') as TextNode[]));

  return nodes;
};
