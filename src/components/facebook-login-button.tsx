import { forwardRef, useCallback } from "react";
import { FacebookLoginProps } from "../types/react-facebook-login";
import { getUserProfile } from "../utils";

const FacebookLoginButton = forwardRef<HTMLButtonElement, FacebookLoginProps>(
  ({ onSuccess, onError, ...props }, ref) => {
    const handleLogin = useCallback(() => {
      FB.login(async (response) => {
        if (response.authResponse) {
          if (props.fetchUserProfile) {
            onSuccess((await getUserProfile()) as any);
            return;
          }
          onSuccess(response as any);
        }
        if (onError) {
          onError(response);
        }
      });
    }, [onError, onSuccess, props.fetchUserProfile]);

    return props.component ? (
      <props.component {...props} onClick={handleLogin} />
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
