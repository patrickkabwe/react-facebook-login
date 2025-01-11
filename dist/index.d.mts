import * as react from 'react';
import { PropsWithChildren } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

type Optional<T> = {
    [P in keyof T]?: T[P];
};
interface UserResponse extends fb.StatusResponse, Optional<fb.UserResponse> {
}
interface FacebookLoginOptions {
    scopes?: fb.UserField[];
    shouldFetchUserProfile?: boolean;
    onError?: (response: fb.StatusResponse) => void;
    onSuccess: (response: UserResponse) => void;
}

declare const FacebookLoginButton: react.ForwardRefExoticComponent<{
    component?: React.ComponentType<React.ButtonHTMLAttributes<HTMLButtonElement>>;
} & FacebookLoginOptions & react.RefAttributes<HTMLButtonElement>>;

declare const useFacebook: () => {
    loading: boolean;
};
declare const FacebookProvider: ({ appId, version, children, }: PropsWithChildren<Partial<fb.InitParams>>) => react_jsx_runtime.JSX.Element;

declare const useFacebookLogin: ({ onSuccess, onError, ...rest }: FacebookLoginOptions) => (opt?: fb.LoginOptions) => void;

export { FacebookProvider, FacebookLoginButton as default, useFacebook, useFacebookLogin };
