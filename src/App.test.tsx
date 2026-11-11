import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("VN Studio landing page", () => {
  it("renders the primary story and product navigation", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Make every choice");
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("mean something.");
    expect(screen.getByRole("tablist", { name: "Explore the VN Studio workflow" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Write/ })).toHaveAttribute("aria-selected", "true");
  });

  it("changes the interactive workflow with pointer and keyboard input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const branchTab = screen.getByRole("tab", { name: /Branch/ });
    await user.click(branchTab);

    expect(branchTab).toHaveAttribute("aria-selected", "true");
    expect(await screen.findByText("Give every choice a consequence.")).toBeInTheDocument();
    expect(await screen.findByAltText(/visual story-flow graph/)).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    const animateTab = screen.getByRole("tab", { name: /Animate/ });
    expect(animateTab).toHaveAttribute("aria-selected", "true");
    expect(animateTab).toHaveFocus();
  });

  it("opens and closes the mobile navigation accessibly", async () => {
    const user = userEvent.setup();
    render(<App />);

    const menuButton = screen.getByRole("button", { name: "Open navigation menu" });
    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    const mobileNavigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    await user.click(within(mobileNavigation).getByRole("link", { name: /Studio/ }));
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("expands FAQ answers", async () => {
    const user = userEvent.setup();
    render(<App />);

    const question = screen.getByText("Do I need to know how to code?");
    const details = question.closest("details");
    expect(details).not.toHaveAttribute("open");

    await user.click(question);
    expect(details).toHaveAttribute("open");
    expect(details).toHaveTextContent(/VN Studio is built around visual scene cards/);
  });

  it("protects every external project link", () => {
    const { container } = render(<App />);
    const externalLinks = container.querySelectorAll('a[target="_blank"]');

    expect(externalLinks.length).toBeGreaterThan(0);
    externalLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "https://github.com/dhruva3010/vn-studio");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
