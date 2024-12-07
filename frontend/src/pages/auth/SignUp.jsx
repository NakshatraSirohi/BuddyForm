import { useState } from "react";
import Button from "../../component/Button";
import fevicon1 from "../../assets/loginImg/loginImg.png";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { Link } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		rollNo: "",
		fullName: "",
		password: "",
	});
	const { mutate , isError, isPending, error} = useMutation( { 
		mutationFn : async( { email,rollNo , fullName, password})=>{
			try{
				const res = await fetch("/api/auth/signup", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email, rollNo, fullName, password }),
				});
				const data = await res.json();
				if(!res.ok) throw new Error(data.error || "Failed to create account");
				// console.log(data);
				return data;
			}catch(error){
				console.error(error);
				toast.error(error.message);
				throw error ;
			}
		},
		onSuccess: ()=>{
			toast.success("Account created successfully");
		}
		
	})
	const handleSubmit = (e) => {
		e.preventDefault();
		mutate(formData);
	};

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};


	return (
		<div className='flex h-screen '>
			<div className='flex-1 hidden lg:flex items-center  justify-center'>
			<Link to="/">
            <img
                    className="w-full  h-full object-cover "
                    src={fevicon1}
                    alt="buddyForum"
                  />
			</Link>
			</div>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' onSubmit={handleSubmit}>
                <img
                    className="w-24 lg:hidden object-cover"
                    src={fevicon1}
                    alt="buddyForum"
					href="/home"
                  />
					<h1 className='text-4xl font-extrabold text-n-1'>Join today.</h1>
					<label className='input border-n-1/10 rounded flex items-center  bg-n-8 gap-2'>
						<MdOutlineMail />
						<input
							type='email'
							className='grow'
							placeholder='Email'
							name='email'
							onChange={handleInputChange}
							value={formData.email}
						/>
					</label>
					<div className='flex gap-4 z-1 flex-wrap bg-n-8'>
						<label className='input border-n-1/10 rounded flex items-center gap-2 bg-n-8 flex-1'>
							<FaUser />
							<input
								type='text'
								className='grow'
								placeholder='Roll No in format: 2301430100___'
								name='rollNo'
								onChange={handleInputChange}
								value={formData.rollNo}
							/>
						</label>
						<label className='input border-n-1/10 rounded flex items-center gap-2 bg-n-8 flex-1'>
							<MdDriveFileRenameOutline />
							<input
								type='text'
								className='grow'
								placeholder='Full Name'
								name='fullName'
								onChange={handleInputChange}
								value={formData.fullName}
							/>
						</label>
					</div>
					<label className='input border-n-1/10 rounded flex items-center bg-n-8 gap-2'>
						<MdPassword />
						<input
							type='password'
							className='grow'
							placeholder='Password'
							name='password'
							onChange={handleInputChange}
							value={formData.password}
						/>
					</label>
                    <Button  className='animate-slideUp' white>
						{isPending ? "Loading...": "Sign up"}
                    </Button>
					{isError && <p className='text-red-500'>{error.message}</p>}

                    <p className='text-white text-lg'>Already have an account?</p>
                    <Button href="/login" className='animate-slideUp'>
                        Sign In
                    </Button>
				</form>
				
			</div>
		</div>
	);
};
export default SignUpPage;