import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import AuthRegister from "../AuthRegister";
import {BrowserRouter} from "react-router-dom";
import {strengthColor} from "../../../../utils/password-strength";

afterEach(() => {
    jest.clearAllMocks();
})

describe("register form should render", () => {
    test("First Name input should render", () => {
        render(<BrowserRouter><AuthRegister /></BrowserRouter>);
        const input = screen.getByPlaceholderText(/First Name/i);
        expect(input).toBeInTheDocument();
    })

    test("Last Name input should render", () => {
        render(<BrowserRouter><AuthRegister /></BrowserRouter>);
        const input = screen.getByPlaceholderText(/Last Name/i);
        expect(input).toBeInTheDocument();
    })


    test("Company input should render", () => {
        render(<BrowserRouter><AuthRegister /></BrowserRouter>);
        const input = screen.getByPlaceholderText(/Company/i);
        expect(input).toBeInTheDocument();
    })

    test("Email Address input should render", () => {
        render(<BrowserRouter><AuthRegister /></BrowserRouter>);
        const input = screen.getByPlaceholderText(/Email Address/i);
        expect(input).toBeInTheDocument();
    })

    test("Password input should render", () => {
        render(<BrowserRouter><AuthRegister /></BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        expect(input).toBeInTheDocument();
    })
})

describe("form button should render", () => {
    test("creat account button should render", () =>{
        render(<BrowserRouter><AuthRegister /></BrowserRouter>);
        const button = screen.getByText(/Create Account/i);
        expect(button).toBeInTheDocument();
    })

    test("Sign up with facebook twitter google button should be rendered", () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const buttonGoogle = screen.getByAltText("Google");
        const buttonTwitter = screen.getByAltText("Twitter");
        const buttonFacebook = screen.getByAltText("Facebook");
        expect(buttonGoogle).toBeInTheDocument();
        expect(buttonTwitter).toBeInTheDocument();
        expect(buttonFacebook).toBeInTheDocument();
    });
})

describe("form should work", () => {
    test("First name should change", () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/First Name/i);
        const testValue = "test";
        act(() => {
            fireEvent.change(input, {target: {value: testValue}});
        })
        expect(input.value).toBe(testValue);
    })

    test("Last Name should change", () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Last Name/i);
        const testValue = "test";
        act(() => {
            fireEvent.change(input, {target: {value: testValue}});
        })
        expect(input.value).toBe(testValue);
    })

    test("Company should change", () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Company/i);
        const testValue = "test";
        act(() => {
            fireEvent.change(input, {target: {value: testValue}});
        })
        expect(input.value).toBe(testValue);
    })

    test("Email Address should change", () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Email Address/i);
        const testValue = "test";
        act(() => {
            fireEvent.change(input, {target: {value: testValue}});
        })
        expect(input.value).toBe(testValue);
    })

    test("Password should change", () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        const testValue = "test";
        act(() => {
            fireEvent.change(input, {target: {value: testValue}});
        })
        expect(input.value).toBe(testValue);
    })
})

describe("form validation should work", () => {
    test("First Name required should work", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/First Name/i);
        fireEvent.focus(input);
        fireEvent.blur(input);
        await waitFor(() => {
            const errMess = screen.getByText(/First Name is required/i);
            expect(errMess).toBeInTheDocument();
        })
    })

    test("Last Name required should work", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Last Name/i);
        fireEvent.focus(input);
        fireEvent.blur(input);
        await waitFor(() => {
            const errMess = screen.getByText(/Last Name is required/i);
            expect(errMess).toBeInTheDocument();
        })
    })

    test("Email required should work", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Email/i);
        fireEvent.focus(input);
        fireEvent.blur(input);
        await waitFor(() => {
            const errMess = screen.getByText(/Email is required/i);
            expect(errMess).toBeInTheDocument();
        })
    })

    test("Error mess valid email should show when type invalid email", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Email/i);
        const email = "test";
        await userEvent.type(input, email);
        fireEvent.blur(input);
        const errMess = screen.getByText(/Must be a valid email/i);
        expect(errMess).toBeInTheDocument();
    })

    test("Password required should work", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        fireEvent.focus(input);
        fireEvent.blur(input);
        await waitFor(() => {
            const errMess = screen.getByText(/Password is required/i);
            expect(errMess).toBeInTheDocument();
        })
    })

    test("Form should validate when submit work",async() => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const passwordInput = screen.getByPlaceholderText(/Password/i);
        const emailInput = screen.getByPlaceholderText(/Email/i);
        const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
        const firstNameInput = screen.getByPlaceholderText(/First Name/i);
        fireEvent.change(passwordInput, "");
        fireEvent.change(emailInput, "");
        fireEvent.change(lastNameInput, "");
        fireEvent.change(firstNameInput, "");
        const button = screen.getByText(/Create Account/i);
        fireEvent.click(button);
        await waitFor(() => {
            const passwordInputMess = screen.getByText(/Password is required/i);
            const emailInputMess = screen.getByText(/Email is required/i);
            const lastNameInputMess = screen.getByText(/Last Name is required/i);
            const firstNameInputMess = screen.getByText(/First Name is required/i);
            expect(passwordInputMess).toBeInTheDocument();
            expect(emailInputMess).toBeInTheDocument();
            expect(lastNameInputMess).toBeInTheDocument();
            expect(firstNameInputMess).toBeInTheDocument();
        })
    })
})

describe("show password strength should work",() => {
    test("should show poor password", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        const email = "poor";
        await userEvent.type(input, email);
        const mess = screen.getByText(/Poor/i);
        expect(mess).toBeInTheDocument();
    })

    test("should show weak password", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        const email = "weekkkkk";
        await userEvent.type(input, email);
        const mess = screen.getByText(/Weak/i);
        expect(mess).toBeInTheDocument();
    })

    test("should show normal password", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        const email = "123456@";
        await userEvent.type(input, email);
        const mess = screen.getByText(/Normal/i);
        expect(mess).toBeInTheDocument();
    })

    test("should show good password", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        const email = "123456@A";
        await userEvent.type(input, email);
        const mess = screen.getByText(/Good/i);
        expect(mess).toBeInTheDocument();
    })

    test("should show strong password", async () => {
        render(<BrowserRouter>
            <AuthRegister/>
        </BrowserRouter>);
        const input = screen.getByPlaceholderText(/Password/i);
        const email = "12345678@Aa";
        await userEvent.type(input, email);
        const mess = screen.getByText(/strong/i);
        expect(mess).toBeInTheDocument();
    })
})