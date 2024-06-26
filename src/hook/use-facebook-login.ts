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
      FB.login((response) => {
        if (response.authResponse) {
          if (rest.fetchUserProfile) {
            if (rest.fetchUserProfile) {
              getUserProfile(onSuccess as any);
              return;
            }
            onSuccess(response as any);
            return;
          }
          onSuccess(response as any);
        }
        if (onError) {
          onError(response);
        }
      }, opt);
    },
    [onError, onSuccess, rest.fetchUserProfile]
  );

  return cb;
};
