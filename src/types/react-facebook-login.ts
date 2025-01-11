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
    component?: React.ComponentType<
        React.ButtonHTMLAttributes<HTMLButtonElement>
    >;
} & FacebookLoginOptions;

export interface FacebookLoginContext {
    loading: boolean;
}
