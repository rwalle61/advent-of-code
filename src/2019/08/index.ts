const pixels = {
  BLACK: '0',
  WHITE: '1',
  TRANSPARENT: '2',
};

const dataToRows = (data: string, width): string[] => {
  const rows = [];
  for (let i = 0; i + width <= data.length; i += width) {
    const row = data.substring(i, i + width);
    rows.push(row);
  }
  return rows;
};

const imageDataToLayers = (data: string, width, height): Array<string[]> => {
  const rows = dataToRows(data, width);
  const layers = [];
  for (let i = 0; i + height <= rows.length; i += height) {
    const layer = rows.slice(i, i + height);
    layers.push(layer);
  }
  return layers;
};

const countDigitsInLayer = (layer: string[], targetDigit) => {
  let num0Digits = 0;
  layer.forEach((row) => {
    row.split('').forEach((digit) => {
      if (digit === targetDigit) {
        num0Digits += 1;
      }
    });
  });
  return num0Digits;
};

const getLayerWithFewest0Digits = (data: string, width, height): string[] => {
  const layers = imageDataToLayers(data, width, height);
  let layerWithFewest0Digits;
  let fewest0Digits = 9999;
  layers.forEach((layer) => {
    const num0DigitsInLayer = countDigitsInLayer(layer, '0');
    if (num0DigitsInLayer < fewest0Digits) {
      layerWithFewest0Digits = layer;
      fewest0Digits = num0DigitsInLayer;
    }
  });
  return layerWithFewest0Digits;
};

const answerPart1 = (data: string, width, height): number => {
  const layerWithFewest0Digits = getLayerWithFewest0Digits(data, width, height);
  const num1DigitsInLayer = countDigitsInLayer(layerWithFewest0Digits, '1');
  const num2DigitsInLayer = countDigitsInLayer(layerWithFewest0Digits, '2');
  return num1DigitsInLayer * num2DigitsInLayer;
};

const imageDataToImage = (data: string, width, height): string[] => {
  const layers = imageDataToLayers(data, width, height);
  const image = Array(height)
    .fill(undefined)
    .map(() => []);
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const pixelsInThisPosition = layers.map((layer) => {
        const row = layer[j];
        const pixel = row[i];
        return pixel;
      });
      const firstOpaquePixel = pixelsInThisPosition.find(
        (pixel) => pixel !== pixels.TRANSPARENT
      );
      const pixel = firstOpaquePixel || pixels.TRANSPARENT;
      image[j].push(pixel);
    }
  }
  const imageStr = image.map((layer) => layer.join(''));
  return imageStr;
};

const printImage = (data: string, width, height): string => {
  const imageStr = imageDataToImage(data, width, height);
  const visualImage = imageStr
    .map((row) => row.replace(new RegExp(pixels.WHITE, 'g'), '#'))
    .map((row) => row.replace(new RegExp(pixels.BLACK, 'g'), '.'))
    .join('\n');
  return visualImage;
};

export {
  dataToRows,
  imageDataToLayers,
  countDigitsInLayer,
  getLayerWithFewest0Digits,
  answerPart1,
  imageDataToImage,
  printImage,
};
