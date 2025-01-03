import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../component/Button";
import Section from "../../component/Section";
import Heading from "../../component/Heading";

const ResetPasswordPage = () => {
    const { token } = useParams(); // Extract token from the URL
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Validate the token when the component mounts
    useEffect(() => {
        const validateToken = async () => {
            try {
                const res = await fetch(`/api/auth/validateToken/${token}`);
                const data = await res.json();

                if (!res.ok || !data.valid) {
                    toast.error("Invalid or expired token.");
                    navigate("/forgetPassword");
                }
            } catch (error) {
                toast.error("Error validating token.",error.message);
                navigate("/forgetPassword");
            }
        };

        validateToken();
    }, [token, navigate]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        try {
            const res = await fetch("/api/auth/resetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to reset password");
            }

            toast.success("Password reset successful!");
            navigate("/login"); // Redirect to login page
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Section>
            <div className="container relative z-2">
                <Heading
                    className="md:max-w-md lg:max-w-2xl"
                    title="Reset Your Password"
                />
                <div className="flex justify-center flex-wrap gap-8 mb-10">
                    <form
                        className="block relative p-2.5 bg-no-repeat bg-[length:100%_100%] max-w-[21rem] md:max-w-[22rem] group"
                        onSubmit={handleResetPassword}
                    >
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border p-2 mb-4 w-full"
                            required
                        />
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border p-2 mb-4 w-full"
                            required
                        />
                        <Button className="mt-8 justify-center align-center" white type="submit">
                            Reset Password
                        </Button>
                    </form>
                </div>
            </div>
        </Section>
    );
};

export default ResetPasswordPage;
