type Optional<T> = {
    [P in keyof T]?: T[P];
};

interface UserResponse extends fb.StatusResponse, Optional<fb.UserResponse> { }

export interface FacebookLoginOptions {
    scopes?: fb.UserField[];
    shouldFetchUserProfile?: boolean;
    onError?: (response: fb.StatusResponse) => void;
    onSuccess: (response: UserResponse) => void;
}

export type FacebookLoginProps = {
    /**
     * @deprecated Use `children` instead
     * @example <FacebookLoginButton>Login with Facebook</FacebookLoginButton>
     */
    component?: React.ComponentType<
        React.ButtonHTMLAttributes<HTMLButtonElement>
    >;
} & FacebookLoginOptions & React.ButtonHTMLAttributes<HTMLButtonElement>;

export interface FacebookLoginContext {
    loading: boolean;
}
