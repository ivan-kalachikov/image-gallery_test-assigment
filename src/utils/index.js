const validateUrl = (str) => {
  const urlRegexp = /^https?:\/\/[^\s$.?#].[^\s]*$/gm;
  return urlRegexp.test(str);
};

const getJsonFromArraybuffer = (data) => {
  const text = new Uint8Array(data).reduce(
    (acc, byte) => acc + String.fromCharCode(byte),
    '',
  );
  return JSON.parse(text);
};

const getBase64FromArrayBuffer = (data, contentType) => {
  const base64 = btoa(
    new Uint8Array(data)
      .reduce((acc, byte) => acc + String.fromCharCode(byte), ''),
  );
  const base64data = `data:${contentType.toLowerCase()};base64,${base64}`;
  return base64data;
};

const addImageWithBase64 = (base64, addImages) => {
  const image = document.createElement('img');
  image.src = base64;
  image.onload = () => addImages([{ url: base64, width: image.width, height: image.height }]);
};

export {
  validateUrl, getJsonFromArraybuffer, getBase64FromArrayBuffer, addImageWithBase64,
};
