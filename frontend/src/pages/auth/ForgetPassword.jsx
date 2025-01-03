import { useState } from "react";
import Button from "../../component/Button";
import Section from "../../component/Section";
import Heading from "../../component/Heading";
import toast from "react-hot-toast";
const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/forgetPassword", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Failed to send reset email");
            }
            toast.success("Password reset email sent!");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Section  >
            <div className="container relative z-2">
                <Heading
                className="md:max-w-md lg:max-w-2xl"
                title="Enter Your Email to retrieve the Password"
                />
            <div className="flex justify-center flex-wrap gap-8 mb-10">
                <form
                    className="block relative p-2.5 bg-no-repeat bg-[length:100%_100%] max-w-[21rem] md:max-w-[22rem] group"
                    onSubmit={handleForgotPassword}
                >
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 mb-4 w-full"
                        required
                    />
                    <Button className="mt-8 justify-center align-center" white type="submit">
                        Send Reset Link
                    </Button>
                </form>
                </div>
            </div>
        </Section>
    );
};
export default ForgotPasswordPage;
