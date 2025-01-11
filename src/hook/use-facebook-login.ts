import { useCallback } from "react";
import { FacebookLoginOptions } from "../types/react-facebook-login";
import { getUserProfile } from "../utils";

export const useFacebookLogin = ({
    onSuccess,
    onError,
    ...rest
}: FacebookLoginOptions) => {
    const cb = useCallback(
        (opt?: fb.LoginOptions) => {
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
