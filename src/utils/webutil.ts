export const focusById = (elementId: string) => {
    document.getElementById(elementId)?.focus();
};

export const focus = (element: HTMLElement) => {
    element.focus({preventScroll: true});
};

export const decodeHTMLEntities = (htmlString: string): string => {
    var element = document.createElement("div");
    let resultString = htmlString.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, "");
    resultString = resultString.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, "");
    element.innerHTML = resultString;
    resultString = element.textContent ?? "";
    element.textContent = "";

    return resultString;
};