import axios from "../../util/axiosInstance";

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

export const resetTranslationTooltips = () => {
  Array.from(document.getElementsByClassName('tooltip-toggled')).forEach(toggledTooltip => {
    toggledTooltip.className = 'tooltip';
  });
};

export const translate = (e, word) => {
  const toggledClassName = 'tooltip tooltip-toggled';
  const wordElement = e.target.parentElement;
  const tooltipTextElement = e.target.nextElementSibling;

  if (!tooltipTextElement.textContent) {
    axios.get(`/translate?word=${word.value}`)
      .then(response => {
        console.info(`Translated: ${word.value} -> ${response.data}`);
        tooltipTextElement.textContent = response.data;
        wordElement.className = toggledClassName;
      })
      .catch(err => console.error(err.response.data));
  } else {
    wordElement.className = toggledClassName;
  }
};

export const focusOn = (element) => {
  element.focus({preventScroll: true});
};