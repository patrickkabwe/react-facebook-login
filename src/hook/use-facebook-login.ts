import { useCallback } from "react";
import { UseFacebookLoginOptions } from "../types/react-facebook-login";

export const useFacebookLogin = ({
  onSuccess,
  onError,
  ...rest
}: UseFacebookLoginOptions) => {
  const cb = useCallback((opt?: fb.LoginOptions) => {
    FB.login((response) => {
      if (response.authResponse) {
        if (rest.fetchUserProfile) {
          // For params: check https://developers.facebook.com/docs/graph-api/reference/user
          FB.api(
            "/me",
            { fields: ["name", "email", "profile" as any] },
            (response) => {
              onSuccess(response as any);
            }
          );
          return;
        }
        onSuccess(response as any);
      }
      if (onError) {
        onError(response);
      }
    }, opt);
  }, []);

  return cb;
};
