import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import AuthLogin from "../AuthLogin";
import {BrowserRouter} from "react-router-dom";

jest.mock("axios", () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: {id: 1, name: "John"},
        }),
    },
}));

afterEach(() => {
    jest.clearAllMocks();
})

test("username input should be rendered", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    expect(usernameInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
    render(
        <BrowserRouter>
            <AuthLogin/>
        </BrowserRouter>
    );
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);
    expect(passwordInputEl).toBeInTheDocument();
});

test("login-button should be rendered", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    expect(buttonEl).toBeInTheDocument();
});

test("username input should be empty", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    expect(usernameInputEl.value).toBe("");
});

test("password input should be empty", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);
    expect(passwordInputEl.value).toBe("");
});

test("login-button should be disabled", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    expect(buttonEl).toBeDisabled();
});

test("loading should not be rendered", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    expect(buttonEl).not.toHaveTextContent(/please wait/i);
});

test("error message should not be visible", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const errorEl = screen.getByTestId("error");
    expect(errorEl).not.toBeVisible();
});

test("username input should change", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const testValue = "test";

    fireEvent.change(usernameInputEl, {target: {value: testValue}});
    expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);
    const testValue = "test";

    fireEvent.change(passwordInputEl, {target: {value: testValue}});
    expect(passwordInputEl.value).toBe(testValue);
});

test("login-button should not be disabled when inputs exist", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, {target: {value: testValue}});
    fireEvent.change(passwordInputEl, {target: {value: testValue}});

    expect(buttonEl).not.toBeDisabled();
});

test("loading should be rendered when click", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, {target: {value: testValue}});
    fireEvent.change(passwordInputEl, {target: {value: testValue}});
    fireEvent.click(buttonEl);

    expect(buttonEl).toHaveTextContent(/please wait/i);
});

test("loading should not be rendered after fetching", async () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, {target: {value: testValue}});
    fireEvent.change(passwordInputEl, {target: {value: testValue}});
    fireEvent.click(buttonEl);

    await waitFor(() => expect(buttonEl).not.toHaveTextContent(/please wait/i));
});

test("user should be rendered after fetching", async () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);

    const testValue = "test";

    fireEvent.change(usernameInputEl, {target: {value: testValue}});
    fireEvent.change(passwordInputEl, {target: {value: testValue}});
    fireEvent.click(buttonEl);

    const userItem = await screen.findByText("John");

    expect(userItem).toBeInTheDocument();
});
