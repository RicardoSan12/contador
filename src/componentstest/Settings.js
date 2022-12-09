import React from 'react';
import Button from '../Button';

const Settings = ({
  visible,
  toggleSettingsVisibility,
  pomoLength,
  setPomoLength,
  shortLength,
  setShortLength,
  longLength,
  setLongLength,
  fontPref,
  setFontPref,
  changeColor,
  setChangeColor,
  closeSettings,
  setSecondsLeft,
  timerMode,
}) => {
  const colors = {
    default: '#F87070',
    blue: '#70F3F8',
    purple: '#D881F8',
  };

  const fonts = {
    kumbh: `'Kumbh Sans', sans-serif`,
    roboto: `'Roboto Slab', serif`,
    space: `'Space Mono', monospace`,
  };

  const styles = document.documentElement.style;

  const applySettings = (event) => {
    event.preventDefault();

    setPomoLength(event.target.pomodoro.value);
    setShortLength(event.target.shortBreak.value);
    setLongLength(event.target.longBreak.value);
    setFontPref(event.target.font.value);
    setChangeColor(event.target.color.value);
    closeSettings();

    styles.setProperty('--font-current', fonts[event.target.font.value]);
    styles.setProperty('--accent-color', colors[event.target.color.value]);

    if (timerMode == 'short')
      setSecondsLeft(event.target.shortBreak.value * 60);
    else if (timerMode == 'long')
      setSecondsLeft(event.target.longBreak.value * 60);
    else setSecondsLeft(event.target.pomodoro.value * 60);
  };

  const applySettings = (event) => {
    event.preventDefault();

    setPomoLength(event.target.pomodoro.value);
    setShortLength(event.target.shortBreak.value);
    setLongLength(event.target.longBreak.value);
    setFontPref(event.target.font.value);
    setChangeColor(event.target.color.value);
    closeSettings();

    styles.setProperty('--font-current', fonts[event.target.font.value]);
    styles.setProperty('--accent-color', colors[event.target.color.value]);

    if (timerMode == 'short')
      setSecondsLeft(event.target.shortBreak.value * 60);
    else if (timerMode == 'long')
      setSecondsLeft(event.target.longBreak.value * 60);
    else setSecondsLeft(event.target.pomodoro.value * 60);
  };

  if (visible) {
    return (
      <div className="preferences preferences--visible">
        <div className="preferences__pane">
          <Button
            type="close"
            buttonText="×"
            toggleVisibility={toggleSettingsVisibility}
          />
          <h2>Ajustes</h2>
          <form onSubmit={applySettings}>
            <div className="pane__time-settings">
              <h3>Tiempo (minutos)</h3>
              <div className="time-settings__form">
                <label>
                  Pomodoro
                  <input
                    type="number"
                    id="pomo"
                    min="5"
                    max="90"
                    defaultValue={pomoLength}
                  />
                </label>
                <label>
                  Descanso corto
                  <input
                    type="number"
                    id="short"
                    min="1"
                    max="14"
                    defaultValue={shortLength}
                  />
                </label>
                <label>
                  Descanso largo
                  <input
                    type="number"
                    id="long"
                    min="15"
                    max="30"
                    defaultValue={longLength}
                  />
                </label>
              </div>
            </div>

            <div className="pane__font-preference">
              <h3>Fuentes</h3>
              <input
                type="radio"
                id="fontPref1"
                value="kumbh"
                defaultChecked={fontPref === 'kumbh'}
              />
              <label htmlFor="fontPref1" className="font-preference__kumbh">
                Aa
              </label>
              <input
                type="radio"
                id="fontPref2"
                value="roboto"
                defaultChecked={fontPref === 'roboto'}
              />
              <label htmlFor="fontPref2" className="font-preference__roboto">
                Aa
              </label>
              <input
                type="radio"
                id="fontPref3"
                value="space"
                defaultChecked={fontPref === 'space'}
              />
              <label htmlFor="fontPref3" className="font-preference__space">
                Aa
              </label>
            </div>

            <div className="pane__color-preference">
              <h3>Color</h3>
              <input
                type="radio"
                id="colorPref1"
                value="default"
                defaultChecked={changeColor === 'default'}
              />
              <label
                htmlFor="colorPref1"
                className="color-preference__default"
              ></label>

              <input
                type="radio"
                id="colorPref2"
                value="blue"
                defaultChecked={changeColor === 'blue'}
              />
              <label
                htmlFor="colorPref2"
                className="color-preference__blue"
              ></label>

              <input
                type="radio"
                id="colorPref3"
                value="purple"
                defaultChecked={changeColor === 'purple'}
              />
              <label
                htmlFor="colorPref3"
                className="color-preference__purple"
              ></label>
            </div>
            <Button type="apply" buttonText="Aplicar" />
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default Settings;
