interface BaseFacebookLoginOptions {
  scopes?: fb.UserField[];
  onError?: (response: fb.StatusResponse) => void;
}

export interface FacebookLoginWithUserProfile extends BaseFacebookLoginOptions {
  shouldFetchUserProfile?: true;
  onSuccess: (response: fb.UserResponse) => void;
}

export interface FacebookLoginWithoutUserProfile extends BaseFacebookLoginOptions {
  shouldFetchUserProfile?: false;
  onSuccess: (response: fb.StatusResponse) => void;
}

export type UseFacebookLoginOptions =
  | FacebookLoginWithUserProfile
  | FacebookLoginWithoutUserProfile;

export type FacebookLoginProps = {
  component?: React.ComponentType<
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >;
} & UseFacebookLoginOptions;

export interface FacebookLoginContext {
  loading: boolean;
}
