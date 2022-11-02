import React from 'react';
import './FAQ.css';
import Collapsible from 'react-collapsible';
import faq from '../../Assets/drawkit/faq.svg'

const FAQ = () => {
	return (
		<div data-aos="zoom-in" className='my-32'>


			<div className=' mx-5 md:mx-10 lg:mx-10'>
				<div class=" bg-white shadow-md mx-auto max-w-5xl rounded">
					<div class="card-body grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center">
						<div className='justify-self-center md:justify-self-center lg:justify-self-start'>
							<img className='w-72 md:w-80 lg:w-96' src={faq}/>
						</div>
						<div>
							<h2 className='text-center text-4xl md:text-4xl lg:text-5xl font-bold mb-3'>FAQ</h2>
							{/* <div tabindex="0" class="collapse collapse-plus border border-base-200 bg-white shadow-md rounded-box my-2">
							<div class="collapse-title text-sm md:text-xl lg:text-xl font-medium">
								Can I use Paypal for payment?
							</div>
							<div class="collapse-content">
								<p className='text-xs md:text-sm lg:text-sm'>Yeah,  You can use Paypal for paid your order, but minimum must be $100.</p>
							</div>
						</div>

						<div tabindex="0" class="collapse collapse-plus border border-base-200 bg-white shadow-md rounded-box my-2">
							<div class="collapse-title text-sm md:text-xl lg:text-xl font-medium">
								What is the minimum time for shipping my product?
							</div>
							<div class="collapse-content">
								<p className='text-xs md:text-sm lg:text-sm'>After clear your payment, You will get product in 7 Days.</p>
							</div>
						</div>

						<div tabindex="0" class="collapse collapse-plus border border-base-200 bg-white shadow-md rounded-box my-2">
							<div class="collapse-title text-sm md:text-xl lg:text-xl font-medium">
								I need the Product that is more the Available Quantity?
							</div>
							<div class="collapse-content">
								<p className='text-xs md:text-sm lg:text-sm'>If you need this product more the Available, you can mail use: toolsmaster@gmail.com</p>
							</div>
						</div> */}

							<div class="collapse collapse-arrow border-b-2 bg-base-100">
								<input type="checkbox" class="peer" />
								<div class="collapse-title bg-white font-semibold text-sm md:text-xl lg:text-xl text-gray-500">
									Can I use Paypal for payment?
								</div>
								<div class="collapse-content bg-white text-xs md:text-sm lg:text-md">
									<p>Yeah,  You can use Paypal for paid your order, but minimum must be $100.</p>
								</div>
							</div>

							<div class="collapse collapse-arrow border-b-2 bg-base-100">
								<input type="checkbox" class="peer" />
								<div class="collapse-title bg-white font-semibold text-sm md:text-xl lg:text-xl text-gray-500">
									What is the minimum time for shipping my product?
								</div>
								<div class="collapse-content bg-white text-xs md:text-sm lg:text-md">
									<p>After clear your payment, You will get product in 7 Days.</p>
								</div>
							</div>

							<div class="collapse collapse-arrow border-b-2 bg-base-100">
								<input type="checkbox" class="peer" />
								<div class="collapse-title bg-white font-semibold text-sm md:text-xl lg:text-xl text-gray-500">
									I need the Product that is more the Available Quantity?
								</div>
								<div class="collapse-content bg-white text-xs md:text-sm lg:text-md">
									<p>If you need this product more the Available, you can mail use: toolsmaster@gmail.com</p>
								</div>
							</div>

						</div>




					</div>
				</div>
			</div>

		</div>
	);
};

export default FAQ;