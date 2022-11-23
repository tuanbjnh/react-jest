import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import AuthLogin from "../AuthLogin";
import {BrowserRouter} from "react-router-dom";
import userEvent from '@testing-library/user-event'

jest.mock("axios", () => ({
    __esModule: true,

    default: {
        get: () => ({
            data: {id: 1, name: "John"},
        }),
    },
}));

beforeEach(() => {
    localStorage.clear();
})

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

test("login-button with facebook twitter google should be rendered", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonGoogle = screen.getByAltText("Google");
    const buttonTwitter = screen.getByAltText("Twitter");
    const buttonFacebook = screen.getByAltText("Facebook");
    expect(buttonGoogle).toBeInTheDocument();
    expect(buttonTwitter).toBeInTheDocument();
    expect(buttonFacebook).toBeInTheDocument();
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

test("username input should change", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const testValue = "test";
    act(() => {
        fireEvent.change(usernameInputEl, {target: {value: testValue}});
    })
    expect(usernameInputEl.value).toBe(testValue);
});

test("password input should change", () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);
    const testValue = "test";
    act(() => {
        fireEvent.change(passwordInputEl, {target: {value: testValue}});
    })
    expect(passwordInputEl.value).toBe(testValue);
});

test("Error mess valid email should show when type invalid email", async () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);

    const email = "test";
    await userEvent.type(usernameInputEl, email);
    fireEvent.blur(usernameInputEl);
    const errMess = screen.getByText(/Must be a valid email/i);
    expect(errMess).toBeInTheDocument();
});

test("Error mess required should show when type empty email", async () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    fireEvent.focus(usernameInputEl);
    fireEvent.blur(usernameInputEl);
    await waitFor(() => {
        const errMess = screen.getByText(/Email is required/i);
        expect(errMess).toBeInTheDocument();
    })
});

test("Error mess required should show when type empty password", async () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const usernameInputEl = screen.getByPlaceholderText(/Enter password/i);
    fireEvent.focus(usernameInputEl);
    fireEvent.blur(usernameInputEl);
    await waitFor(() => {
        const errMess = screen.getByText(/Password is required/i);
        expect(errMess).toBeInTheDocument();
    })
});

test("local storage have user info after login", async () => {
    render(<BrowserRouter>
        <AuthLogin/>
    </BrowserRouter>);
    const buttonEl = screen.getByTestId("login-button");
    const usernameInputEl = screen.getByPlaceholderText(/Enter email address/i);
    const passwordInputEl = screen.getByPlaceholderText(/Enter password/i);

    const testValue = "test";
    await act(() => {
        fireEvent.change(usernameInputEl, {target: {value: testValue}});
        fireEvent.change(passwordInputEl, {target: {value: testValue}});
        fireEvent.click(buttonEl);
        waitFor(() => {
            expect(localStorage.getItem("userinfo")).not.toBeUndefined();
        });
    })
});
