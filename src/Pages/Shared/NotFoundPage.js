import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFound from '../../Assets/images/404.jpg';

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		// <div class="hero" style={{backgroundImage: `url(${NotFound})`}}>
		// 	<div class="hero-overlay bg-opacity-10"></div>
	  	// </div>
		  <div className='flex flex-col justify-center items-center h-screen bg-white'>
			  <img className='w-2/4' src={NotFound} alt="" />
			  <button onClick={() => {
				  navigate('/')
			  }} className='btn btn-accent mt-5 text-white'>Back home</button>
		  </div> 
	);
};

export default NotFoundPage;