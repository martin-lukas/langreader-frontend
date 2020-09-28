
const toolbar = () =>
  <div id="fixed-toolbar">
    <div id="know-button" className="fixed-button">Button one</div>
    <div id="study-button" className="fixed-button">Button two</div>
    <div id="ignore-button" className="fixed-button">Button three</div>
  </div>;

const WordWithTooltip = () =>
  <Tooltip value={translation} isToggled={!!(translation)}>
    <button id={id} className={word.type} onClick={onWordClick} onKeyUp={onKeyPress}>
      {word.value}
    </button>
  </Tooltip>;

const Tooltip = (value, isToggled, children) => {
  return (
    <span id={id} className={classnames('tooltip', {'toggled': isToggled})}>
      {children}
      <span className="tooltiptext">{value}</span>
    </span>
  );
};