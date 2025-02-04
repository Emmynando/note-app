import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-fetch-mock";
import Login from "@/app/login/page";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/UserReducer";
import { Provider } from "react-redux";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { toast } from "react-toastify";

// ✅ Create a mock Redux store
const store = configureStore({
  reducer: {
    auth: userReducer,
  },
});

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));
// mock for raeact toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Login", () => {
  beforeEach(() => {
    // reset mock before each test
    fetchMock.resetMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render login form", () => {
    // Arrange
    // Wrap with Provider and Router
    render(
      <Provider store={store}>
        <MemoryRouterProvider>
          <Login />
        </MemoryRouterProvider>
      </Provider>
    );

    // ACT AND ASSERT
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should allow user to log in successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        id: "123",
        message: "Login Successful",
        email: "test@example.com",
        accessToken: "token_abc",
      })
    );

    render(
      <Provider store={store}>
        <MemoryRouterProvider>
          <Login />
        </MemoryRouterProvider>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/auth/login"),
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        })
      );
    });

    // Check if success message is displayed
    // await waitForElementToBeRemoved(toast.error);
    expect(toast.success).toHaveBeenCalledWith("Login Successful");
  });
});
