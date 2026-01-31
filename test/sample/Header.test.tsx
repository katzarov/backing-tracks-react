import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../utils";
import { Header } from "@src/components/layout/Header";

describe("Header", () => {
  it("has app logo", async () => {
    const { getByAltText } = await renderWithProviders(<Header />);

    const appLogoLocator = getByAltText("App logo"); //.first().element()

    await expect.element(appLogoLocator).toBeInTheDocument();
  });
});
