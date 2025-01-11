/**
 * Retrieves the user profile from Facebook API.
 * @returns A promise that resolves to a UserResponse object containing the user's name, email, and picture.
 * @see {@link https://developers.facebook.com/docs/graph-api/reference/user}
 */
export const getUserProfile = (cb: (res: fb.UserResponse) => void) => {
    return window.FB.api<fb.UserField>(
        "/me",
        { fields: ["name", "email", "picture"], },
        (response) => {
            cb(response);
        }
    );
};
