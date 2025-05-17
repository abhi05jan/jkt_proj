import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { store } from "../redux/store";
import { login } from "../redux/authSlice";
import toast from "react-hot-toast";
import { vi } from "vitest";

vi.mock("react-hot-toast");
vi.mock("../redux/authSlice");

describe("Login interactivity", () => {
    beforeEach(() => {
        (login as jest.Mock).mockResolvedValue({
            payload: { access_token: "token123", user_id: "1", username: "admin" },
        });
    });

    test("shows validation error for short username", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const usernameInput = screen.getByLabelText("Username");
        fireEvent.change(usernameInput, { target: { value: "ab" } });

        expect(screen.getByText("Username must be at least 3 characters")).toBeInTheDocument();
    });

    test("shows toast on successful login", async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </Provider>
        );

        const usernameInput = screen.getByLabelText("Username");
        const passwordInput = screen.getByLabelText("Password");
        const button = screen.getByRole("button", { name: /login/i });

        fireEvent.change(usernameInput, { target: { value: "admin" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(toast.success).toHaveBeenCalledWith("Login successful!");
        });
    });
});