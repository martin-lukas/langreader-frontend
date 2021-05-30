export const focusById = (elementId: string) => {
    document.getElementById(elementId)?.focus();
};

export const focus = (element: HTMLElement) => {
    element.focus({preventScroll: true});
};