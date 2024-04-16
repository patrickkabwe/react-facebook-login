import { forwardRef, useCallback } from "react";
import { FacebookLoginProps } from "../types/react-facebook-login";

const FacebookLoginButton = forwardRef<HTMLButtonElement, FacebookLoginProps>(
  ({ onSuccess, onError, ...props }, ref) => {
    const handleLogin = useCallback(() => {
      FB.login((response) => {
        if (response.authResponse) {
          if (props.fetchUserProfile) {
            FB.api(
              "/me",
              { fields: ["name", "email", "profile" as any] },
              (userRes) => {
                onSuccess(userRes as any);
                return;
              }
            );
          }
          onSuccess(response as any);
        }
        if (onError) {
          onError(response);
        }
      });
    }, []);

    return props.component ? (
      <props.component onClick={handleLogin} {...props} />
    ) : (
      <button
        ref={ref}
        {...props}
        onClick={handleLogin}
        data-testid="facebook-login-button"
      >
        Login with Facebook
      </button>
    );
  }
);

export default FacebookLoginButton;
