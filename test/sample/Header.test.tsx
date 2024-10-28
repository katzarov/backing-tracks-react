import { screen } from "@testing-library/react";
import { renderWithProviders } from "../utils";
import { Header } from "@src/components/layout/Header";

describe("Header", () => {
  it("renders and displays the name of the app", async () => {
    renderWithProviders(<Header />);

    expect(screen.getByAltText("App logo")).toBeInTheDocument();
  });
});
