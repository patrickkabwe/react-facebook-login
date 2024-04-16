import { act, render } from "@testing-library/react";
import { JSDOM } from "jsdom";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FacebookProvider } from "../src";

const TestApp = () => {
  return (
    <FacebookProvider appId="1234" version="v19.0">
      <div />
    </FacebookProvider>
  );
};

const mockFB = {
  init: vi.fn(),
};

describe("FacebookProvider", () => {
  let window;

  beforeEach(() => {
    const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>");
    window = dom.window;
    globalThis.document = window.document;
    globalThis.window = window;

    mockFB.init.mockClear();
    window.FB = mockFB;
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
});
