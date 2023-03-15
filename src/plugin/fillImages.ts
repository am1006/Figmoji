export interface FillImagesInput {
  url: string;
  vendor: string;
}

export default async function fillImages(input: FillImagesInput) {
  let image = await figma.createImageAsync(input.url);

  try {
    // Create node
    // const node = figma.createRectangle();
    const node: RectangleNode = figma.currentPage.findOne(
      (node) => node.name === `#Image${input.vendor}` && node.type === 'RECTANGLE'
    ) as RectangleNode;

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
  } catch (error: any) {
    console.log(error);
  }
}
