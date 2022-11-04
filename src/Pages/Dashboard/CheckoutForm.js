import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import LoadingWIthoutFullH from '../Shared/LoadingWIthoutFullH';

const CheckoutForm = ({price, toolsPayment}) => {
	const stripe = useStripe();
	const elements = useElements();
	const [cError, setCError] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [success, setSuccess] = useState('');
	const [transactionId, setTransactionId] = useState('');
	const [load, setLoad] = useState(false);
	const [disableBtn, setDisableBtn] = useState(false);

	useEffect( () => {
		fetch('https://blooming-sands-78734.herokuapp.com/create-payment-intent',{
			method:'POST',
			headers: {
				'content-type':'application/json'
			},
			body: JSON.stringify({price})
		})
		.then(res => res.json())
		.then(data => {
			if(data?.clientSecret){
				setClientSecret(data.clientSecret);
			}
		})
	}, [price]);


	const handleSubmit = async(event) => {
		event.preventDefault();
		setDisableBtn(true);
		
		if(!stripe || !elements){
			setDisableBtn(false);
			return;
		}
		const card = elements.getElement(CardElement);

		if (card == null) {
			setDisableBtn(false);
			return;
		}

		const {error,paymentMethod} = await stripe.createPaymentMethod({
			type:'card',
			card,
		})

		if(error){
			setDisableBtn(false);
			setCError(error?.message);
		} else{
			setDisableBtn(false);
			setCError('');
		}

		setLoad(true);
		setDisableBtn(true);
		const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
			clientSecret,
			{
			  payment_method: {
				card: card,
				billing_details: {
				  name: toolsPayment?.name,
				  email: toolsPayment?.email, 
				},
			  },
			},
		);
		if(intentError){
			setCError(intentError?.message);
			setSuccess('');
			setLoad(false);
			setDisableBtn(false);
		} else{
			setCError('');
			setTransactionId(paymentIntent.id);
			setSuccess(`Congrats! Your payment $${price} is paid.`);

			const paymentDoc = {
				order_id: toolsPayment._id,
				transactionId: paymentIntent.id
			}
			console.log(paymentDoc);
			fetch(`https://blooming-sands-78734.herokuapp.com/paymentOrders/${toolsPayment._id}`,{
				method: 'PATCH',
				headers:{
					'content-type':'application/json'
				},
				body: JSON.stringify(paymentDoc)
			})
			.then(res => res.json())
			.then(data => {
				setLoad(false);
				Swal.fire({
					icon: 'success',
					title: 'Great',
					text: `You have paid this order $${price} and buyed (${toolsPayment.tools_name}), ${toolsPayment.quantity} pieces`,
					footer: ''
				})
				// setDisableBtn(false);
			})
			setLoad(false);
			// setDisableBtn(false);
		}
	}
	// if(load){
	// 	return <LoadingWIthoutFullH></LoadingWIthoutFullH>;
	// }

	return (
		<div>
			<form onSubmit={handleSubmit}
				className='overflow-x-auto'
			>
				<CardElement
					options={{
					style: {
						base: {
						fontSize: '16px',
						color: '#424770',
						'::placeholder': {
							color: '#aab7c4',
						},
						},
						invalid: {
						color: '#9e2146',
						},
					},
					}}
				/>
				<button className='btn btn-success btn-sm mt-6 text-white px-4' type="submit" disabled={!stripe || !clientSecret || disableBtn}>
					Pay
				</button>
			</form>
			{
				cError && <p className='text-red-500 mt-3'>{cError}</p>
			}
			{
				success && <p className='text-green-500 mt-3'>{success}</p>
			}
			{
				success && <p className='mt-2'>Your Transaction Id: <span className='text-blue-700'>{transactionId}</span></p>
			}
			
		</div>
	);
};

export default CheckoutForm;