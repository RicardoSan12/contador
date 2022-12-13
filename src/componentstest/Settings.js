import React from 'react';
import './style.css';
import Button from '../Button';

const textTranform = (str) => {
  let [first, ...rest] = str.split(' ');
  return {
    kebab: str.split(' ').join('-'),
    camel: `${first}${rest
      .map((elem) => elem[0].toUpperCase() + elem.substring(1))
      .join('')}`,
  };
};

const Settings = ({
  visible,
  toggleSettingsVisibility,
  setPomoLength,  
  typeLength,
  setShortLength,
  setLongLength,
  fontPref,
  setFontPref,
  accentColor,
  setAccentColor,
  closeSettings,
  setSecondsLeft,
  timerMode,
}) => {
  const colors = { default: '#F87070', blue: '#70F3F8', purple: '#D881F8' };

  const fonts = {
    kumbh: `'Kumbh Sans', sans-serif`,
    roboto: `'Roboto Slab', serif`,
    space: `'Space Mono', monospace`,
  };

  const styles = document.documentElement.style;

  const applySettings = (event) => {
    event.preventDefault();

    const {target} = event

    setPomoLength(target.pomodoro.value);
    setShortLength(target.shortBreak.value);
    setLongLength(target.longBreak.value);

    setFontPref(target.font.value);
    setAccentColor(target.color.value);
    closeSettings();

    styles.setProperty('--font-current', fonts[target.font.value]);
    styles.setProperty('--accent-color', colors[target.color.value]);

    switch (timerMode) {
      case 'short':
        setSecondsLeft(target.shortBreak.value * 60);
        break;
      case 'long':
        setSecondsLeft(target.longBreak.value * 60);
        break;
      default:
        setSecondsLeft(target.pomodoro.value * 60);
    }
  };

  if (!visible) return null;
  return (
    <div className="preferences preferences--visible">
      <div className="preferences__pane">
        <Button
          type="close"
          text="×"
          toggleVisibility={toggleSettingsVisibility}
        />
        <h2>Settings</h2>
        <form onSubmit={applySettings}>
          <div className="pane__time-settings">
            <h3>Time (Minutes)</h3>
              <label htmlFor="pomodoro">Pomodoro</label>
              <input
                type="number"
                name="pomodoro"
                id="pomodoro"
                min="5"
                max="90"
                defaultValue={typeLength['pomo']}
              />
              <label htmlFor="short-break">Short break</label>
              <input
                type="number"
                name="shortBreak"
                id="short-break"
                min="1"
                max="14"
                defaultValue={typeLength['short']}
              />
              <label htmlFor="long-break">Long break</label>
              <input
                type="number"
                name="longBreak"
                id="long-break"
                min="15"
                max="30"
                defaultValue={typeLength['long']}
              />
          </div>
          <div className="pane__font-preference">
            <h3>Font</h3>
            {['kumbh', 'roboto', 'space'].map((font, index) => (
              <>
                <input
                  type="radio"
                  id={`fontPref${index + 1}`}
                  name="font"
                  value={font}
                  defaultChecked={fontPref === font}
                />
                <label
                  htmlFor={`fontPref${index + 1}`}
                  className={`font-preference__${font}`}
                >
                  Aa
                </label>
              </>
            ))}
          </div>

          <div className="pane__color-preference">
            <h3>Color</h3>
            {['default', 'blue', 'purple'].map((color, index) => (
              <>
                <input
                  type="radio"
                  id={`colorPref${index + 1}`}
                  name="color"
                  value={color}
                  defaultChecked={accentColor === color}
                />
                <label
                  htmlFor={`colorPref${index + 1}`}
                  className={`color-preference__${color}`}
                ></label>
              </>
            ))}
          </div>
          <Button type="apply" buttonText="Apply" />
        </form>
      </div>
    </div>
  );
};
export default Settings;

const setting = () => {
  const panel = {
    time: [
      {
        title: 'Pomodoro',
        id: 'pomodoro',
        name: 'pomodoro',
        min: '5',
        max: '90',
        defaultValue: pomoLength,
      },
      {
        title: 'Short break',
        id: 'short-break',
        name: 'shortBreak',
        min: '1',
        max: '14',
        defaultValue: shortLength,
      },
      {
        title: 'Long break',
        id: 'long-break',
        name: 'longBreak',
        min: '15',
        max: '30',
        defaultValue: longLength,
      },
    ],
    font: [
      { id: 'fontPref1', name: 'kumbh', class: 'font-preference__kumbh' },
      { id: 'fontPref2', name: 'roboto', class: 'font-preference__roboto' },
      { id: 'fontPref3', name: 'space', class: 'font-preference__space' },
    ],
    color: [
      { id: 'colorPref1', name: 'default', class: 'color-preference__default' },
      { id: 'colorPref2', name: 'blue', class: 'color-preference__blue' },
      { id: 'colorPref3', name: 'purple', class: 'color-preference__purple' },
    ],
  };

  const time = [
    { name: 'pomodoro', min: '5', max: '90', defaultValue: pomoLength },
    { name: 'short break', min: '1', max: '14', defaultValue: shortLength },
    { name: 'long break', min: '15', max: '30', defaultValue: longLength },
  ];
  const color = [
    { id: 'colorPref1', name: 'default' },
    { id: 'colorPref2', name: 'blue' },
    { id: 'colorPref3', name: 'purple' },
  ];

  if (!visible) {
    return (
      <div className="preferences preferences--visible">
        <div className="preferences__pane">
          <Button
            type="close"
            buttonText="×"
            toggleVisibility={toggleSettingsVisibility}
          />
          <h2>Settings</h2>
          <form onSubmit={applySettings}>
            {Object.entries(panel).map(([key, values]) => {
              return values.map(
                ({ id, value, clase, defaultValue, label, min, max }) => (
                  <div className={`pane__${key}-preference`}>
                    <h3>
                      {key}
                      {key === 'time' && ' (MINUTES)'}
                    </h3>
                    {key === 'time' ? (
                      <div>
                        <input
                          type="number"
                          name={value}
                          min={min}
                          max={max}
                          defaultValue={defaultValue}
                        />
                        <label>{label}</label>
                      </div>
                    ) : (
                      <>
                        <input
                          type="radio"
                          id={id}
                          name={key}
                          value={value}
                          defaultChecked={[accentColor, fontPrefvalue].includes(
                            value
                          )}
                        />
                        <label htmlFor={id} className={clase}>
                          {key === 'color' && 'Aa'}
                        </label>
                      </>
                    )}
                  </div>
                )
              );
            })}
          </form>
        </div>
      </div>
    );
  }
};
