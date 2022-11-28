import {render, screen} from "@testing-library/react";
import AnalyticEcommerce from "../AnalyticEcommerce";

afterEach(() => {
    jest.clearAllMocks();
})

test("Analytic Ecommerce should render with prop", () => {
    render(<AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />);
    const titleElement = screen.getByText("Total Page Views");
    const countElement = screen.getByText("4,42,236");
    const percentageElement = screen.getByText("59.3%");
    const extraElement = screen.getByText("35,000");
    expect(titleElement).toBeInTheDocument();
    expect(countElement).toBeInTheDocument();
    expect(percentageElement).toBeInTheDocument();
    expect(extraElement).toBeInTheDocument();
})