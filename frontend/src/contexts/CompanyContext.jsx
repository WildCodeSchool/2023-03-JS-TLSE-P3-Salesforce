import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const CompanyContext = createContext();

export default CompanyContext;

export function CompanyProvider({ children }) {
  const [companyInfos, setCompanyInfos] = useState({});

  const CompanyValue = useMemo(
    () => ({
      companyInfos,
      setCompanyInfos,
    }),
    [companyInfos]
  );

  return (
    <CompanyContext.Provider value={CompanyValue}>
      {children}
    </CompanyContext.Provider>
  );
}

CompanyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
