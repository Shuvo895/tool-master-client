import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import banner1 from '../../Assets/images/banner1.jpg';
import banner2 from '../../Assets/images/banner3.jpg';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../Shared/Loading';
import './HomeBanner.css';

const HomeBanner = () => {
	const [user, loading, error] = useAuthState(auth);
	const [admin, adminLoading] = useAdmin(user);
	const navigate = useNavigate();

	if (loading || (user && adminLoading)) {
		return <Loading></Loading>
	}
	
	return (
		<div class="hero min-h-screen mt-[-66px] z-0" style={{ backgroundImage: `url(${banner2}) ` }}>

			
			<div class="hero-overlay bg-opacity-25"></div>
			<div class="hero-content text-center text-neutral-content">
				<div class="max-w-md">
					<h1 class="mb-5 text-5xl font-bold text-white">Tools Need?</h1>
					<p class="mb-5 text-white">We provide the best quality tools all over the world</p>
					{
						user ?
							<>
								{admin && <button onClick={() => {
									navigate('/dashboard/addTool');
								}} class="animated-button1"><span></span>
								<span></span>
								<span></span>
								<span></span>Add an new Tool</button>}
								{!admin && <button onClick={() => {
									navigate('/dashboard/myorders');
								}} class=" animated-button1"><span></span>
								<span></span>
								<span></span>
								<span></span>Explore All Order</button>}
							</>
							:
							<button onClick={() => {
								navigate('/login');
							}} class="animated-button1"><span></span>
							<span></span>
							<span></span>
							<span></span>Get Started</button>
					}
				</div>
			</div>
		</div>
	);
};

export default HomeBanner;