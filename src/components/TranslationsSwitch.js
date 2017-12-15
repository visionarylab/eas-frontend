import React from "react"
import { translate } from "react-translate"

const createOnChangeHandler = (available, onChange) => ({ currentTarget }) =>
  onChange(available[currentTarget.selectedIndex])

const TranslationsSwitch = ({ available, onChange, t }) => (
  <div>
    <span>
      {t("change_language")}
    </span>
    <select onChange={createOnChangeHandler(available, onChange)}>
      {available.map((item, index) =>
        <option key={index}>
          {item}
        </option>
      )}
    </select>
  </div>
)

export default translate("TranslationsSwitch")(TranslationsSwitch)
