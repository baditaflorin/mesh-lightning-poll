import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature (component)", () => {
  it("renders the app name when connected", () => {
    const room = createMockRoom();
    render(<Feature room={room} config={config} />);
    expect(screen.getByRole("heading", { name: config.appName })).toBeInTheDocument();
    expect(screen.getByText("0 peers responded")).toBeInTheDocument();
  });

  it("shows a connecting state when room is null", () => {
    render(<Feature room={null} config={config} />);
    expect(screen.getByRole("button", { name: /Go for it/ })).toBeEnabled();
  });

  it("stores one local answer in the shared poll", () => {
    const room = createMockRoom({ peerId: "alex" });
    render(<Feature room={room} config={config} />);
    fireEvent.click(screen.getByRole("button", { name: /Go for it/ }));
    expect(screen.getByText("1 peer responded")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Change my answer" })).toBeInTheDocument();
  });
});
