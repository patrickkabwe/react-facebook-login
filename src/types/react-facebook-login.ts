type Optional<T> = {
    [P in keyof T]?: T[P];
};

export interface FacebookLoginOptions {
    scopes?: fb.UserField[];
    shouldFetchUserProfile?: boolean;
    onError?: (response: fb.StatusResponse) => void;
    onSuccess: (response: UserResponse) => void;
}

type UserResponse = fb.StatusResponse & Optional<fb.UserResponse>


export type FacebookLoginProps = {
    component?: React.ComponentType<
        React.ButtonHTMLAttributes<HTMLButtonElement>
    >;
} & FacebookLoginOptions;

export interface FacebookLoginContext {
    loading: boolean;
}
