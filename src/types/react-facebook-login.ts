export interface FacebookLoginWithUserProfile {
  shouldFetchUserProfile?: true;
  scopes?: fb.UserField[];
  onSuccess: (response: fb.UserResponse) => void;
  onError?: (response: fb.StatusResponse) => void;
}

export interface FacebookLoginWithoutUserProfile {
  shouldFetchUserProfile?: false;
  scopes?: fb.UserField[];
  onSuccess: (response: fb.StatusResponse) => void;
  onError?: (response: fb.StatusResponse) => void;
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
