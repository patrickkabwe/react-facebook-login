import React, { forwardRef, PropsWithChildren, useCallback } from "react";
import { useFacebookLogin } from "../hook/use-facebook-login";
import { FacebookLoginProps } from "../types/react-facebook-login";

const FacebookLoginButton = forwardRef<
    HTMLButtonElement,
    PropsWithChildren<FacebookLoginProps>
>(({ onSuccess, onError, shouldFetchUserProfile, ...props }, ref) => {
    const login = useFacebookLogin({
        onSuccess,
        onError,
        shouldFetchUserProfile,
    });

    const handleLogin = useCallback(() => login(), [login]);

    return props.children && React.Children.count(props.children) > 0 ? (
        React.createElement(
            "button",
            {
                ...props,
                onClick: handleLogin,
                ref,
            },
            props.children
        )
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
});

export default FacebookLoginButton;
