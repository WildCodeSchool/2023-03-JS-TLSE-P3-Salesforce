import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

// const decodedToken = jwt.decode(userToken);
const AuthContext = createContext();

export default AuthContext;

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [userInfos, setUserInfos] = useState({});
  const [togglePhones, setTogglePhones] = useState(false);
  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 8 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };

  const AuthValue = useMemo(
    () => ({
      userToken,
      setUser,
      userInfos,
      setUserInfos,
      togglePhones,
      setTogglePhones,
    }),
    [userToken, userInfos, togglePhones]
  );

  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
