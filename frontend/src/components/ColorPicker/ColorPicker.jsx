import propTypes from "prop-types";
import "./ColorPicker.scss";
import { useContext } from "react";

import CompanyContext from "../../contexts/CompanyContext";

export default function ColorPicker({ colorName, colorId, setSelectedColor }) {
  const { setCompanyInfos, companyInfos } = useContext(CompanyContext);
  return (
    <div className={`color-picker color-picker-${colorName}`}>
      <input
        type="radio"
        name="color_id"
        id={colorId}
        checked={companyInfos.color_name === colorName}
        onChange={() => {
          setSelectedColor(colorName);
          setCompanyInfos({
            ...companyInfos,
            color_name: colorName,
          });
        }}
        value={colorId}
      />

      <label className="color-container" htmlFor={colorId}>
        <div className="color-circle">
          <i className="fi fi-rr-check" />
        </div>
      </label>
    </div>
  );
}

ColorPicker.propTypes = {
  colorName: propTypes.string,
  colorId: propTypes.number,
  setSelectedColor: propTypes.func,
};

ColorPicker.defaultProps = {
  colorName: "indigo",
  colorId: 6,
  setSelectedColor: () => {},
};
