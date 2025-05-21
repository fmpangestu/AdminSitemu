/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login form state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle register form input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle login submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!loginForm.username || !loginForm.password) {
      setError("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://143.198.81.98:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the token in localStorage
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", loginForm.username);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!registerForm.username || !registerForm.password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        "http://143.198.81.98:3000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: registerForm.name,
            username: registerForm.username,
            password: registerForm.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Show success message and switch to login tab
      setSuccess(
        "Registration successful! Please login with your new account."
      );
      setActiveTab("login");

      // Clear register form
      setRegisterForm({
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-700">
          Mimin Sitemu
        </h1>
        <p className="text-center text-gray-500 mb-6">Admin Panel Dashboard</p>

        <Tabs
          defaultValue="login"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4 ">
            <TabsTrigger className="cursor-pointer" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="register">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                {success && (
                  <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert className="mb-4 bg-red-50 text-red-700 border-red-200">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="username">
                      Username
                    </label>
                    <Input
                      id="username"
                      name="username"
                      placeholder="Enter your username"
                      value={loginForm.username}
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="password">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Register to get access to the dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <Alert className="mb-4 bg-red-50 text-red-700 border-red-200">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium"
                      htmlFor="register-username"
                    >
                      Name
                    </label>
                    <Input
                      id="register-name"
                      name="name"
                      placeholder="Choose a name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium"
                      htmlFor="register-username"
                    >
                      Username
                    </label>
                    <Input
                      id="register-username"
                      name="username"
                      placeholder="Choose a username"
                      value={registerForm.username}
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium"
                      htmlFor="register-password"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Choose a password"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Password must be at least 6 characters
                    </p>
                  </div>

                  <div className="space-y-2 ">
                    <label
                      className="text-sm font-medium"
                      htmlFor="confirm-password"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                      />
                      <button
                        type="button"
                        className="absolute right-3 cursor-pointer top-1/2 transform -translate-y-1/2 text-gray-500"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
