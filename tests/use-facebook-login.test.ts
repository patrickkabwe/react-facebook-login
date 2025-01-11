import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { JSDOM } from "jsdom";
import { useFacebookLogin } from "../src";


describe("useFacebookLogin", () => {
    let window: Window & typeof globalThis;

    beforeEach(() => {
        const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
        window = dom.window;
        globalThis.document = window.document;
        globalThis.window = window;
        window.FB = {
            api: jest.fn(),
            init: jest.fn(),
            login: jest.fn().mockImplementation((cb) => {
                cb({ authResponse: { accessToken: "test" }, status: "connected" });
            }),
        } as any;
    });

    afterEach(() => {
        // @ts-ignore
        delete window.FB;
    });

    it("should return a function", () => {
        const { result } = renderHook(() =>
            useFacebookLogin({ onSuccess: () => { } })
        );
        expect(result.current).toBeInstanceOf(Function);
    });

    it("should call FB.login", () => {
        const { result } = renderHook(() =>
            useFacebookLogin({ onSuccess: () => { } })
        );
        result.current();
        expect(window.FB.login).toHaveBeenCalled();
    });

    it("should call success callback", () => {
        const onSuccess = jest.fn();
        const { result } = renderHook(() => useFacebookLogin({ onSuccess }));
        result.current();

        expect(onSuccess).toHaveBeenCalledWith({
            authResponse: { accessToken: "test" },
            status: "connected",
        });
    });


    it("should call success when fetch profile is true", () => {
        const onSuccess = jest.fn();
        // @ts-ignore
        window.FB.api.mockImplementation((path, fields, cb) => {
            if (path === "/me") {
                cb(
                    fields.fields.reduce((acc, field) => {
                        acc[field] = field;
                        return acc;
                    }, {})
                );
            }
        });

        const { result } = renderHook(() => useFacebookLogin({ onSuccess, shouldFetchUserProfile: true }));
        result.current();

        expect(onSuccess).toHaveBeenCalledWith({
            authResponse: { accessToken: "test" },
            status: "connected",
            email: "email",
            name: "name",
            picture: "picture",
        });
    });

    it("should call error callback", () => {
        const onError = jest.fn();
        const { result } = renderHook(() =>
            useFacebookLogin({ onSuccess: () => { }, onError })
        );

        window.FB.login = jest.fn().mockImplementation((cb) => {
            cb({ authResponse: null });
        });
        result.current();
        expect(onError).toHaveBeenCalled();
    });
});
