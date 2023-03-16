export default async function fillImages(vendorImages: Record<string, string>) {
  for (const input of Object.entries(vendorImages)) {
    // vendorImages is an object with key as vendor name and value as image url
    // e.g. { apple: 'https://...', google: 'https://...', ... }
    const [vendor, url] = input;
    await fillImage({ vendor, url });
  }
}

export interface FillImageInput {
  url: string;
  vendor: string;
}

async function fillImage(input: FillImageInput) {
  let image = await figma.createImageAsync(input.url);

  try {
    // Create node
    // const node = figma.createRectangle();
    const node: RectangleNode = figma.currentPage.findOne(
      (node) => node.name === `#${input.vendor}` && node.type === 'RECTANGLE'
    ) as RectangleNode;

    if (!node) {
      // throw new Error(`No node found for ${input.vendor}`);

      // Skip if no node found
      return;
    }

    // Resize the node to match the image's width and height
    // const { width, height } = await image.getSizeAsync();
    // node.resize(width, height);

    // Set the fill on the node
    node.fills = [
      {
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL',
      },
    ];

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'edit-basic-info',
      message: `Edited Emoji`,
    });
  } catch (error) {
    console.log(error);
  }
}
