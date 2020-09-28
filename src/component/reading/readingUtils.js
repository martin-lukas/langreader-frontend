export const updatedText = (originalText, updatedWord) => {
  const newText = {...originalText};
  newText.paragraphs.forEach(paragraph => {
    paragraph.forEach(token => {
      if (token.type && token.value.toLowerCase() === updatedWord.value.toLowerCase()) {
        token.type = updatedWord.type;
      }
    });
  });
  return newText;
};

export const focusOn = (element) => {
  element.focus({preventScroll: true});
};