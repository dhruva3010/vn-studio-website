import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import DocsApp from "./DocsApp";

describe("VN Studio documentation", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "/docs.html");
  });

  it("renders all fourteen detailed guides", () => {
    const { container } = render(<DocsApp />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Everything you need");
    expect(container.querySelectorAll(".doc-section")).toHaveLength(14);
    expect(screen.getByRole("heading", { name: "Publish for Windows and Web" })).toBeInTheDocument();
  });

  it("searches guide content and navigates to a result", async () => {
    const user = userEvent.setup();
    render(<DocsApp />);

    const search = screen.getByRole("searchbox", { name: "Search documentation" });
    await user.type(search, "Web export");
    const results = screen.getByRole("region", { name: "Documentation search results" });
    const publishResult = within(results).getByRole("button", { name: /Publish for Windows and Web/ });
    await user.click(publishResult);

    expect(window.location.hash).toBe("#publish");
    expect(search).toHaveValue("");
    expect(screen.getByRole("heading", { name: "Publish for Windows and Web" })).toBeInTheDocument();
  });

  it("reports when no guides match a search", async () => {
    const user = userEvent.setup();
    render(<DocsApp />);

    await user.type(screen.getByRole("searchbox", { name: "Search documentation" }), "no-such-guide");
    expect(screen.getByText(/No guides match/)).toBeInTheDocument();
  });

  it("copies setup commands to the clipboard", async () => {
    const user = userEvent.setup();
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    render(<DocsApp />);

    await user.click(screen.getAllByRole("button", { name: "Copy code" })[0]);
    expect(writeText).toHaveBeenCalledWith(".\\scripts\\setup-godot.ps1");
    expect(await screen.findByText("Copied")).toBeInTheDocument();
  });

  it("supports keyboard search and mobile guide navigation", async () => {
    const user = userEvent.setup();
    render(<DocsApp />);

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.getByRole("searchbox", { name: "Search documentation" })).toHaveFocus();

    const menuButton = screen.getByRole("button", { name: "Browse guides" });
    await user.click(menuButton);
    const mobileNavigation = screen.getByRole("complementary", { name: "Mobile documentation navigation" });
    await user.click(within(mobileNavigation).getByRole("link", { name: "Variables and story logic" }));

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(window.location.hash).toBe("#story-logic");
  });
});
