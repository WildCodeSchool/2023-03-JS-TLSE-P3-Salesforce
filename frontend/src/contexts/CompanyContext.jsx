import { createContext, useMemo, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { defineColorTheme } from "../../utils";

const CompanyContext = createContext();

export default CompanyContext;

export function CompanyProvider({ children }) {
  const [companyInfos, setCompanyInfos] = useState({});

  useEffect(() => {
    if (companyInfos.slug) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/companies/${companyInfos.slug}`
        )
        .then((response) => {
          setCompanyInfos(response.data);
          document.title = `${response.data.name} | IdeasForce`;

          defineColorTheme(response.data.color_name);
          const favicon = document.getElementById("favicon");
          if (response.data.logo_url) {
            favicon.href = response.data.logo_url;
          } else {
            favicon.href =
              "https://res.cloudinary.com/dmmifezda/image/upload/v1689018967/logos/favicon-salesforce_yffz3d.svg";
          }
        });
    }
  }, [companyInfos.slug]);

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
