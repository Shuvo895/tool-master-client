import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import auth from '../../firebase.init';
import NavBar from '../Home/NavBar';
import Loading from '../Shared/Loading';
import { RiAddFill } from 'react-icons/ri';
import { IoMdRemove } from 'react-icons/io'
import Footer from '../Shared/Footer';
import { toast } from 'react-toastify';
import useAdmin from '../../Hooks/useAdmin';
import Swal from 'sweetalert2';

const PurchasePage = () => {
	const { tool_Id } = useParams();
	const [data, setData] = useState({});
	const [user, loading, error] = useAuthState(auth);
	const [quantity, setQuantity] = useState(0);
	const [fetcing, setFetcing] = useState(true);
	const [btnDisable, setBtnDisable] = useState(false);
	const [admin, adminLoading] = useAdmin(user);


	// const {data, isLoading} = useQuery('toolOne', () => {
	//  return	fetch(`https://blooming-sands-78734.herokuapp.com/tools/${tool_Id}`,{
	// 		method: 'GET'
	// 	})
	// 	.then(res => res.json())
	// }) 
	useEffect(() => {
		fetch(`https://blooming-sands-78734.herokuapp.com/tools/${tool_Id}`)
			.then(res => res.json())
			.then(data => {
				setData(data);
				setQuantity(parseInt(data.min_quantity));
				setFetcing(false);
			})
	}, [])

	if (loading || fetcing || adminLoading) {
		return <Loading></Loading>;
	}

	const handleChange = (event) => {
		const value = event.target.value;
		if (parseInt(value) > parseInt(data.available_quantity)) {
			setBtnDisable(true);
		} else if (parseInt(value) < parseInt(data.min_quantity)) {
			setBtnDisable(true);
		} else if (parseInt(value) === 0) {
			setBtnDisable(true);
		}
		else {
			setBtnDisable(false);
		}

		if (value) {
			setQuantity(parseInt(value));
		} else {
			setQuantity(0);
			setBtnDisable(true);
		}
	}

	const handlePurchase = (event) => {
		event.preventDefault();
		// alert(`
		// 	quantity: ${quantity}
		// 	name: ${user.displayName}
		// 	email: ${user.email}
		// 	phone: ${event.target.phone.value}
		// 	address: ${event.target.address.value}
		// `);
		if (!admin) {
			const doc = {
				name: user.displayName,
				email: user.email,
				phone: event.target.phone.value,
				address: event.target.address.value,
				quantity: quantity,
				tools_name: data.name,
				tools_image: data.image,
				tools_price: data.price,
				tools_id: data._id
			}
			Swal.fire({
				title: 'Are you sure?',
				text: `Order this Tool: ${data.name}`,
				icon: 'question',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Order'
			}).then((result) => {
				if (result.isConfirmed) {
					fetch('https://blooming-sands-78734.herokuapp.com/orders', {
						method: 'POST',
						headers: {
							'content-type': 'application/json'
						},
						body: JSON.stringify(doc)
					})
						.then(res => res.json())
						.then(data => {
							console.log(data);
							if (data.acknowledged) {
								// toast.success('Successfully added to order');
								Swal.fire({
									icon: 'success',
									title: 'Congratulations',
									text: 'Successfully added to order',
									footer: ''
								})
							}
							event.target.reset();
						})
				}
			})

		} else {
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'You can not make Order because you are Admin!',
				footer: ''
			})
		}

	}

	return (
		<div>
			<NavBar></NavBar>
			<h2 className='pt-24 pb-6 text-center text-3xl font-bold text-accent'>Purchase Page</h2>
			<div className='pb-16 px-4 md:px-10 lg:px-16'>
				<div class="grid grid-cols-1 lg:grid-cols-2 bg-white shadow-xl justify-center items-center">
					<div class='mx-auto p-5 md:p-10 lg:p-14'>
						<figure className=''><img className='py-5 h-48' src={data.image} alt="Shoes" /></figure>
						<h1 class='card-title mb-5'>{data?.name}</h1>
						<p className='mb-2'><span className='font-semibold'>Available: </span>{data.available_quantity}</p>
						<p className='mb-2'><span className='font-semibold'>Minimum Order: </span>{data.min_quantity}</p>
						<p className='mb-2'><span className='font-semibold'>Price: </span>${data.price}</p>
						<p className='text-justify mb-2'><span className='font-semibold'>Description: </span>{data.description}</p>
					</div>
					<div class="p-10 justify-self-center">
						{/* <h2 class="card-title font-bold text-2xl">Place Your Order</h2> */}
						<form onSubmit={handlePurchase} className='my-5'>
							<input readOnly value={user?.displayName} type="text" placeholder="Name" class="w-60 md:w-96 lg:w-96 input input-bordered   bg-white mb-3 block" />
							<input readOnly value={user?.email} type="text" placeholder="Email" class="w-60 md:w-96 lg:w-96 input input-bordered bg-white mb-3 block" />
							<input name='phone' type="number" placeholder="Phone Number" class="w-60 md:w-96 lg:w-96 input input-bordered  bg-white mb-3 block" required />
							<input name='address' type="text" placeholder="Order Shipped Address" class="w-60 md:w-96 lg:w-96 input input-bordered  bg-white mb-3 block" required />
							<div className='flex justify-center items-center my-5'>
								<button onClick={() => {
									let finalQuantity = quantity + 1;
									if (finalQuantity > parseInt(data.available_quantity)) {
										finalQuantity--;
									} else if (finalQuantity < parseInt(data.min_quantity)) {
									} else {
										setBtnDisable(false);
									}
									setQuantity(finalQuantity);
								}} type='button' class="btn btn-rounded text-3xl text-white">
									<RiAddFill></RiAddFill>
								</button>
								<input value={quantity ? quantity : `0`} onChange={handleChange} type="text" placeholder="Type here" class="w-20 md:w-32 lg:w-32 input input-bordered bg-white mx-3 text-center" />
								<button onClick={() => {
									let finalQuantity = quantity - 1;
									if (finalQuantity < parseInt(data.min_quantity)) {
										finalQuantity++;
									}
									else if (finalQuantity > parseInt(data.available_quantity)) {
									} else {
										setBtnDisable(false);
									}
									setQuantity(finalQuantity);
								}} type='button' class="btn btn-rounded text-3xl text-white">
									<IoMdRemove></IoMdRemove>
								</button>
							</div>
							<h2 className='text-center font-semibold mb-3'>Total Price: ${quantity * parseInt(data.price)}</h2>

							<button disabled={btnDisable} type="submit" className={`${btnDisable ? 'btn-accent' : 'bg-gradient-to-r from-primary to-secondary border-none'} btn w-fit px-16 block mx-auto text-white `}>{btnDisable ? 'Check Limit of Purchase' : 'Purchase'}</button>
						</form>

					</div>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
};

export default PurchasePage;