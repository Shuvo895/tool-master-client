import React from 'react';

const Partners = () => {
	return (
		<div className='mx-5 md:mx-8 lg:mx-10 my-10 md:my-32 lg:my-32'>
			<h2 className='text-center text-4xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-10 lg:mb-10'>Our Partners</h2>

			<div class="card bg-white shadow-md rounded  overflow-x-auto px-3 md:px-10 lg:px-10 py-10">
				<div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 justify-center items-center justify-items-center py-6 gap-5'>
					<p className='text-2xl md:text-3xl lg:text-3xl italic font-bold text-slate-500 hover:text-primary hover:drop-shadow-2xl cursor-pointer hover:mt-[-10px] ease-in-out duration-300'>Facebook</p>
					<p className='text-2xl md:text-3xl lg:text-3xl italic font-bold text-slate-500 hover:text-primary hover:drop-shadow-2xl cursor-pointer hover:mt-[-10px] ease-in-out duration-300'>Google</p>
					<p className='text-2xl md:text-3xl lg:text-3xl italic font-bold text-slate-500 hover:text-primary hover:drop-shadow-2xl cursor-pointer hover:mt-[-10px] ease-in-out duration-300'>Paypal</p>
					<p className='text-2xl md:text-3xl lg:text-3xl italic font-bold text-slate-500 hover:text-primary hover:drop-shadow-2xl cursor-pointer hover:mt-[-10px] ease-in-out duration-300'>Payoneer</p>
				</div>
			</div>
		</div>
	);
};

export default Partners;