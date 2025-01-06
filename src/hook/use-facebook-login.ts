import { useCallback } from "react";
import { UseFacebookLoginOptions } from "../types/react-facebook-login";
import { getUserProfile } from "../utils";

export const useFacebookLogin = ({
  onSuccess,
  onError,
  ...rest
}: UseFacebookLoginOptions) => {
  const cb = useCallback(
    (opt?: fb.LoginOptions) => {
      window.FB.login((response) => {
        if (response.authResponse) {
          if (rest.shouldFetchUserProfile) {
            getUserProfile(onSuccess);
          } else {
            onSuccess(response);
          }
        } else {
          if (onError && response.status !== "connected") {
            onError(response);
          }
        }
      }, opt);
    },
    [onError, onSuccess, rest.shouldFetchUserProfile]
  );

  return cb;
};
