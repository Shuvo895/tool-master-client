import { async } from '@firebase/util';
import React, { useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import { BiShowAlt, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';
import Loading from '../Shared/Loading';
import SocialGoogle from './SocialGoogle';


const Login = () => {
	const { register, formState: { errors }, handleSubmit } = useForm();
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const [showModal , setShowModal] = useState(false);
	const [
		signInWithEmailAndPassword,
		user,
		loading,
		error,
	  ] = useSignInWithEmailAndPassword(auth);
	
	const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);

	let errorElement;
	const [token] = useToken();
	
	if(error){
		errorElement = <div>
			<p className='label-text-alt text-red-600 mb-1 ml-1'>{error?.message}</p>
		</div>
	}
	
	if(token) {
		return navigate('/');
	}
	
	if(loading || sending){
		return <Loading></Loading>;
	}

	

	const handleResetPassword =  async (event) => {
		console.log(event);
		event.preventDefault();
		const email = event.target.email.value;
		await sendPasswordResetEmail(email);
		toast.success(`Reset Password mail sended to ${email}`);
		setShowModal(false);
		event.target.reset();
	}

	const onSubmit =async data => {
		errorElement=''
		await signInWithEmailAndPassword(data.email, data.password);
	}

	const handleAdminDemoLogin = async() => {
		await signInWithEmailAndPassword('sakibkhancrs2@gmail.com', '123456')
	}
	const handleUserDemoLogin = async() => {
		await signInWithEmailAndPassword('sakibkhancrs1@gmail.com', '123456')
	}
	return (
		<div className='flex justify-center flex-col items-center my-10 md:my-20 lg:my-20 px-8'>
			<h2 onClick={()=> navigate('/')} className='text-3xl font-black mb-8 cursor-pointer'>Tools Master</h2>
			
			<form onSubmit={handleSubmit(onSubmit)} className='px-4'>
				<div class="card flex-shrink-0 w-full md:w-screen lg:w-screen max-w-sm shadow-lg bg-white pt-3">
					<div className='flex justify-center mt-3'>
						<button onClick={() => handleAdminDemoLogin()} type='button' className='btn btn-success text text-dark text-xs mr-3 w-28 md:w-32 lg:w-32 px-1'>Admin Demo Account</button>
						<button onClick={() => handleUserDemoLogin()} type='button' className='btn btn-info text text-dark text-xs  w-28 md:w-32 lg:w-32 px-1'>User Demo Account</button>
					</div>
					<div class="card-body">
						<h2 className='text-xl font-bold text-center'>Sign in to your account</h2>
						<div class="form-control">
							<label class="label">
								<span class="label-text">Email</span>
							</label>
							<input type="text" class="input input-bordered bg-white" 
							{...register('email', {
								required:{
									value: true,
									message: 'Email must be Required'
								},
								pattern: {
									value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
									message: 'Email is Invaild'
								}
							})}
							/>
							<label class="label">
								{errors.email?.type === 'required' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
								{errors.email?.type === 'pattern' && <span class="label-text-alt text-red-500">{errors.email.message}</span>}
							</label>
						</div>
						<div class="form-control">
						<label class="label">
								<span class="label-text">Password</span>
								<span class="label-text-alt ">
									{
										show?
										<div onClick={()=>{
											setShow(!show)
										}} className='flex items-center text-blue-700 font-semibold'>
											<p>Hide</p><BiShowAlt className='mt-1 ml-2'></BiShowAlt>
										</div>
										:
										<div onClick={() =>{
											setShow(!show)
										}} className='flex items-center text-blue-700 font-semibold'>
											<p>Show</p><BiHide className='mt-1 ml-2'></BiHide>
										</div>

									}
								</span>
							</label>
							<input type={ show ? 'text' : 'password'}  class="input input-bordered bg-white" 
							{...register('password', {
								required:{
									value: true,
									message: 'Password must be Required'
								},
								minLength: {
									value: 6,
									message: 'Password must be 6 Character or longer'
								}
							})}
							/>
							<label class="label">
								{errors.password?.type === 'required' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
								{errors.password?.type === 'minLength' && <span class="label-text-alt text-red-500">{errors.password.message}</span>}
							</label>
							<label class="label">
								<div  type='div' onClick={() => setShowModal(true)} text-red-500 class="label-text-alt link link-hover shadow-none">Forgot password?</div>
							</label>
						</div>
						{
							errorElement
						}
						<div class="form-control mt-2">
							<button type='submit' class="btn btn-accent text-white">Login</button>
						</div>
						<p className='label-text-alt ml-1 text-center'>Don't have an account? <Link to='/signup' className='text-blue-800 underline'>Sign up</Link></p>
						
						

						<div class="divider">OR</div>

						<SocialGoogle></SocialGoogle>
					</div>
				</div>
			</form>
			{/* modal */}
			<input checked={showModal} type="checkbox"  class="modal-toggle" />
			<div class="modal modal-bottom sm:modal-middle">
				<div class="modal-box py-10">
					<h2 className='text-center text-2xl font-semibold mb-5'>Reset your password</h2>
					
  						<button onClick={() => setShowModal(false)} class="btn btn-sm btn-circle absolute right-2 top-2 btn-error text-white">✕</button>
				
					<form onSubmit={handleResetPassword} className='flex flex-col justify-center items-center'>
						<input name='email' type="email" className='input input-bordered w-60 mb-4' placeholder='Enter your Email' required/>
						<div>
							{/* <button type='button' className='btn btn-primary mr-2 text-white' onClick={() => setShowModal(false)} class="btn">Cancel</button> */}
							<button className='btn btn-accent text-white' type='submit' >Reset Password</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;