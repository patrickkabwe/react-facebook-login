import { act, fireEvent, render } from "@testing-library/react";
import { beforeEach, describe, expect, it, jest } from "bun:test";
import { JSDOM } from "jsdom";
import React from "react";
import FacebookLoginButton, { FacebookProvider } from "../src";

const TestApp = () => {
    return (
        <FacebookProvider appId="1234" version="v19.0">
            <FacebookLoginButton onSuccess={(res) => {}} />
        </FacebookProvider>
    );
};

const mockFB = {
    init: jest.fn(),
    login: jest.fn(),
    api: jest.fn(),
};

describe("FacebookLoginButton", () => {
    let window;

    beforeEach(() => {
        const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
        window = dom.window;
        globalThis.document = window.document;
        globalThis.window = window;

        mockFB.init.mockClear();
        mockFB.login.mockClear();
        window.FB = mockFB;
        globalThis.FB = mockFB as any;
    });

    it("should render children", () => {
        const { container } = render(<TestApp />);
        expect(container.firstChild).not.toBeNull();
    });

    it("should load Facebook SDK and initialize it with the correct configuration", async () => {
        render(<TestApp />);

        const script = document.querySelector<HTMLScriptElement>(
            'script[src="https://connect.facebook.net/en_US/sdk.js"]'
        );

        expect(script).toBeTruthy();

        // @ts-ignore
        act(script?.onload);

        expect(window.FB.init).toHaveBeenCalledWith({
            appId: "1234",
            version: "v19.0",
            xfbml: true,
        });

        expect(window.FB.init).toHaveBeenCalledTimes(1);
    });

    it("should call FB.login", () => {
        const { getByText } = render(<TestApp />);
        const button = getByText("Login with Facebook");

        fireEvent.click(button);
        expect(FB.login).toHaveBeenCalled();
    });

    it("should call success callback", () => {
        // @ts-ignore
        FB.login.mockImplementation((cb) => {
            cb({
                authResponse: {
                    accessToken: "1234",
                },
                status: "connected",
            });
        });

        const onSuccess = jest.fn();

        const { getByText } = render(
            <FacebookProvider appId="1234" version="v19.0">
                <FacebookLoginButton onSuccess={onSuccess} />
            </FacebookProvider>
        );
        const button = getByText("Login with Facebook");

        fireEvent.click(button);

        expect(onSuccess).toHaveBeenCalled();
    });

    it("should call success callback with user profile", () => {
        // @ts-ignore
        FB.login.mockImplementation((cb) => {
            cb({
                authResponse: {
                    accessToken: "1234",
                },
                status: "connected",
            });
        });
        // @ts-ignore
        FB.api.mockImplementation((path, fields, cb) => {
            if (path === "/me") {
                cb(
                    fields.fields.reduce((acc, field) => {
                        acc[field] = field;
                        return acc;
                    }, {})
                );
            }
        });

        const onSuccess = jest.fn();

        const { getByText } = render(
            <FacebookProvider appId="1234" version="v19.0">
                <FacebookLoginButton
                    onSuccess={onSuccess}
                    shouldFetchUserProfile={true}
                />
            </FacebookProvider>
        );
        const button = getByText("Login with Facebook");

        fireEvent.click(button);

        expect(onSuccess).toHaveBeenCalledWith({
            authResponse: {
                accessToken: "1234",
            },
            status: "connected",
            name: "name",
            email: "email",
            picture: "picture",
        });
    });

    it("should render text children as custom component", () => {
        const { getByText } = render(
            <FacebookProvider appId="1234" version="v19.0">
                <FacebookLoginButton onSuccess={() => {}}>
                    Custom Button
                </FacebookLoginButton>
            </FacebookProvider>
        );

        const button = getByText("Custom Button");
        expect(button).toBeTruthy();
        expect(button.textContent).toBe("Custom Button");
    });

    it("should render element children as custom component", () => {
        const CustomComponent = () => (
            <span data-testid="custom-button">Custom Button</span> // must be any other element than button
        );

        const { getByTestId } = render(
            <FacebookProvider appId="1234" version="v19.0">
                <FacebookLoginButton onSuccess={() => {}}>
                    <CustomComponent />
                </FacebookLoginButton>
            </FacebookProvider>
        );

        const button = getByTestId("custom-button");
        expect(button).toBeTruthy();
        expect(button.textContent).toBe("Custom Button");
    });
});
