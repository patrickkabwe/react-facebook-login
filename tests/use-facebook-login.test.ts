import { renderHook } from "@testing-library/react";
import { afterAll, describe, expect, it, vi } from "vitest";
import { useFacebookLogin } from "../src";

window.FB = {
  init: vi.fn(),
  login: vi.fn().mockImplementation((cb) => {
    cb({ authResponse: { accessToken: "test" } });
  }),
} as any;

describe("useFacebookLogin", () => {
  afterAll(() => {
    //  @ts-ignore
    delete window.FB;
  });

  it("should return a function", () => {
    const { result } = renderHook(() =>
      useFacebookLogin({ onSuccess: () => {} })
    );
    expect(result.current).toBeInstanceOf(Function);
  });

  it("should call FB.login", () => {
    const { result } = renderHook(() =>
      useFacebookLogin({ onSuccess: () => {} })
    );
    const cb = result.current;
    cb();
    expect(window.FB.login).toHaveBeenCalled();
  });

  it("should call success callback", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useFacebookLogin({ onSuccess }));
    const cb = result.current;
    cb();

    expect(onSuccess).toHaveBeenCalledWith({
      authResponse: { accessToken: "test" },
    });
  });

  it("should call error callback", () => {
    const onError = vi.fn();
    const { result } = renderHook(() =>
      useFacebookLogin({ onSuccess: () => {}, onError })
    );
    const cb = result.current;
    FB.login = vi.fn().mockImplementation((cb) => {
      cb({ authResponse: null });
    });
    cb();
    expect(onError).toHaveBeenCalled();
  });
});
