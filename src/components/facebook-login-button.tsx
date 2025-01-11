import { forwardRef, useCallback } from "react";
import { useFacebookLogin } from "../hook/use-facebook-login";
import { FacebookLoginProps } from "../types/react-facebook-login";

const FacebookLoginButton = forwardRef<HTMLButtonElement, FacebookLoginProps>(
    ({ onSuccess, onError, shouldFetchUserProfile, ...props }, ref) => {
        const login = useFacebookLogin({
            onSuccess,
            onError,
            shouldFetchUserProfile,
        });

        const handleLogin = useCallback(() => login(), [login]);

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
