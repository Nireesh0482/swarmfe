/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/**
 * Simple function that converts a plain SVG string or SVG DOM Node into an image with custom dimensions.
 *
 * @param {Object} settings The configuration object to override the default settings.
 * @returns {Promise}
 */
async function SVGToImage(settingsObject) {
  const settings = {
    svg: null,
    // Usually all SVG have transparency, so PNG is the way to go by default
    mimetype: 'image/png',
    quality: 0.92,
    width: 'auto',
    height: 'auto',
    outputFormat: 'base64',
  };

  // Override default settings
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (const key in settings) {
    settings[key] = settingsObject[key];
  }

  return new Promise((resolve, reject) => {
    let svgNode;

    // Create SVG Node if a plain string has been provided
    if (typeof settings.svg === 'string') {
      // Create a non-visible node to render the SVG string
      const SVGContainer = document.createElement('div');
      SVGContainer.style.display = 'none';
      SVGContainer.innerHTML = settings.svg;
      svgNode = SVGContainer.firstElementChild;
    } else {
      svgNode = settings.svg;
    }

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const svgXml = new XMLSerializer().serializeToString(svgNode);
    const svgBase64 = `data:image/svg+xml;base64,${btoa(svgXml)}`;

    const image = new Image();

    // eslint-disable-next-line func-names
    image.onload = function () {
      let finalWidth;
      let finalHeight;

      // Calculate width if set to auto and the height is specified (to preserve aspect ratio)
      if (settings.width === 'auto' && settings.height !== 'auto') {
        finalWidth = (this.width / this.height) * settings.height;
        // Use image original width
      } else if (settings.width === 'auto') {
        finalWidth = this.naturalWidth;
        // Use custom width
      } else {
        finalWidth = settings.width;
      }

      // Calculate height if set to auto and the width is specified (to preserve aspect ratio)
      if (settings.height === 'auto' && settings.width !== 'auto') {
        finalHeight = (this.height / this.width) * settings.width;
        // Use image original height
      } else if (settings.height === 'auto') {
        finalHeight = this.naturalHeight;
        // Use custom height
      } else {
        finalHeight = settings.height;
      }

      // Define the canvas intrinsic size
      canvas.width = finalWidth;
      canvas.height = finalHeight;

      // Render image in the canvas
      context.drawImage(this, 0, 0, finalWidth, finalHeight);

      if (settings.outputFormat === 'blob') {
        // Fullfil and Return the Blob image
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          settings.mimetype,
          settings.quality,
        );
      } else {
        // Fullfil and Return the Base64 image
        resolve(canvas.toDataURL(settings.mimetype, settings.quality));
      }
    };

    // Load the SVG in Base64 to the image
    image.src = svgBase64;
  });
}

export default SVGToImage;
