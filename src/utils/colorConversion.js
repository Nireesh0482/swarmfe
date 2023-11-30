// input: "rgb(23,23,255) => output:x0ffab34
export const convertStringRGBtoHex = (stringRGB) => {
  const rgb = stringRGB.split('(')[1].split(')')[0];
  const rgbNumbers = rgb.split(',');
  const hexNumber = rgbNumbers.map((ele) => {
    const hexDigit = parseInt(ele, 10).toString(16);
    return hexDigit.length === 1 ? `$0${hexDigit}` : hexDigit;
  });
  return `0x${hexNumber.join('')}`;
};

export default convertStringRGBtoHex;
