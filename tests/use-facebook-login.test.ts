import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, jest } from "bun:test";
import { useFacebookLogin } from "../src";
import { JSDOM } from "jsdom";

const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
window = dom.window;
globalThis.document = window.document;
globalThis.window = window;

describe("useFacebookLogin", () => {
  beforeEach(() => {
    window.FB = {
      init: jest.fn(),
      login: jest.fn().mockImplementation((cb) => {
        cb({ authResponse: { accessToken: "test" } });
      }),
    } as any;
  });

  afterEach(() => {
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
    const cb = result.current;
    cb();
    expect(window.FB.login).toHaveBeenCalled();
  });

  it("should call success callback", () => {
    const onSuccess = jest.fn();
    const { result } = renderHook(() => useFacebookLogin({ onSuccess }));
    const cb = result.current;
    cb();

    expect(onSuccess).toHaveBeenCalledWith({
      authResponse: { accessToken: "test" },
    });
  });

  it("should call error callback", () => {
    const onError = jest.fn();
    const { result } = renderHook(() =>
      useFacebookLogin({ onSuccess: () => { }, onError })
    );
    const cb = result.current;

    window.FB.login = jest.fn().mockImplementation((cb) => {
      cb({ authResponse: null });
    });
    cb();
    expect(onError).toHaveBeenCalled();
  });
});
