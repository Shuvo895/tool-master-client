import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L1uMwEhWGffoCOsYYsc3mYlAJVFoMwTDvPBnHYC21yXYGEaba9WoturpZgT9xm1gwKCIWSVGXvcWWwsqlUueWnU00bIrGuDyv');

const Payment = () => {
	const {payment_id} = useParams();
	const [user, loading, error] = useAuthState(auth);


	const {data: toolsPayment, isLoading, } = useQuery(['orderPayment',payment_id], () => {
		return  fetch(`https://blooming-sands-78734.herokuapp.com/orders/${payment_id}`, {
			method: 'GET'
		})
		.then(res => {
			return res.json();
		});
	})

	if(isLoading || loading) {
		return <Loading></Loading>;
	}
	return (
		<div className='px-4 md:px-6 lg:px-6 mt-5 mb-32 md:mb-10 lg:mb-10'>

			<div class="card bg-white shadow-xl">
				<div class="card-body px-4 md:px-12 lg:px-12">
					<h2 class="card-title">Hey, {user?.displayName}</h2>
					<p>You have order: {toolsPayment.tools_name}</p>
					<p>Order Id: {toolsPayment._id}</p>
					<p>Quantity: {toolsPayment.quantity}</p>
					<p>Price per piece: ${toolsPayment.tools_price}</p>
					<p>You have to pay: ${parseInt(toolsPayment.quantity) * parseInt(toolsPayment.tools_price)}</p>

					<div class="card w-60 md:w-96 lg:w-96 bg-white shadow-xl mx-auto my-5">
						<div class="card-body">
							<Elements stripe={stripePromise}>
								<CheckoutForm price={parseInt(toolsPayment.quantity) * parseInt(toolsPayment.tools_price)}
								toolsPayment={toolsPayment}
								/>
							</Elements>
						</div>
					</div>
					
				</div>
			</div>
			
		</div>
	);
};

export default Payment;