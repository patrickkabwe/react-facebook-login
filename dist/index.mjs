// src/components/facebook-login-button.tsx
import { forwardRef, useCallback as useCallback2 } from "react";

// src/hook/use-facebook-login.ts
import { useCallback } from "react";

// src/utils/index.ts
var getUserProfile = (cb) => {
  return window.FB.api(
    "/me",
    { fields: ["name", "email", "picture"] },
    (response) => {
      cb(response);
    }
  );
};

// src/hook/use-facebook-login.ts
var useFacebookLogin = ({
  onSuccess,
  onError,
  ...rest
}) => {
  const cb = useCallback(
    (opt) => {
      window.FB.login((response) => {
        if (response.status === "connected") {
          if (rest.shouldFetchUserProfile) {
            getUserProfile((userResponse) => {
              onSuccess({ ...response, ...userResponse });
            });
          } else {
            onSuccess(response);
          }
        } else {
          if (onError) {
            onError(response);
          }
        }
      }, opt);
    },
    [onError, onSuccess, rest.shouldFetchUserProfile]
  );
  return cb;
};

// src/components/facebook-login-button.tsx
import { jsx } from "react/jsx-runtime";
var FacebookLoginButton = forwardRef(
  ({ onSuccess, onError, shouldFetchUserProfile, ...props }, ref) => {
    const login = useFacebookLogin({
      onSuccess,
      onError,
      shouldFetchUserProfile
    });
    const handleLogin = useCallback2(() => login(), [login]);
    return props.component ? /* @__PURE__ */ jsx(props.component, { ...props, onClick: handleLogin }) : /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        ...props,
        onClick: handleLogin,
        "data-testid": "facebook-login-button",
        children: "Login with Facebook"
      }
    );
  }
);
var facebook_login_button_default = FacebookLoginButton;

// src/components/facebook-provider.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var FacebookContext = createContext({
  loading: true
});
var useFacebook = () => useContext(FacebookContext);
var FacebookProvider = ({
  appId,
  version = "v19.0",
  children
}) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const defaultConfig = {
      xfbml: true,
      version
    };
    const script = document.createElement("script");
    script.src = `https://connect.facebook.net/en_US/sdk.js`;
    script.async = true;
    script.onload = () => {
      window.FB.init({
        appId,
        ...defaultConfig
      });
      setLoading(false);
    };
    document.body.appendChild(script);
  }, [appId, version]);
  return /* @__PURE__ */ jsx2(FacebookContext.Provider, { value: { loading }, children });
};

// src/index.ts
var index_default = facebook_login_button_default;
export {
  FacebookProvider,
  index_default as default,
  useFacebook,
  useFacebookLogin
};
