"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  FacebookProvider: () => FacebookProvider,
  default: () => index_default,
  useFacebook: () => useFacebook,
  useFacebookLogin: () => useFacebookLogin
});
module.exports = __toCommonJS(index_exports);

// src/components/facebook-login-button.tsx
var import_react2 = require("react");

// src/hook/use-facebook-login.ts
var import_react = require("react");

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
  const cb = (0, import_react.useCallback)(
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
var import_jsx_runtime = require("react/jsx-runtime");
var FacebookLoginButton = (0, import_react2.forwardRef)(
  ({ onSuccess, onError, shouldFetchUserProfile, ...props }, ref) => {
    const login = useFacebookLogin({
      onSuccess,
      onError,
      shouldFetchUserProfile
    });
    const handleLogin = (0, import_react2.useCallback)(() => login(), [login]);
    return props.component ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(props.component, { ...props, onClick: handleLogin }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var FacebookContext = (0, import_react3.createContext)({
  loading: true
});
var useFacebook = () => (0, import_react3.useContext)(FacebookContext);
var FacebookProvider = ({
  appId,
  version = "v19.0",
  children
}) => {
  const [loading, setLoading] = (0, import_react3.useState)(true);
  (0, import_react3.useEffect)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FacebookContext.Provider, { value: { loading }, children });
};

// src/index.ts
var index_default = facebook_login_button_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FacebookProvider,
  useFacebook,
  useFacebookLogin
});
