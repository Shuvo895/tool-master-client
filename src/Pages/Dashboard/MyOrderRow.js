import React, { createFactory } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyOrderRow = ({order, index, refetch}) => {
	
	const HandleOrderCancel = () => {
		// const {data} = useQuery('ancelOrder', () => {
		// 	return fetch(`https://blooming-sands-78734.herokuapp.com/myorders/${order._id}`,{
		// 		method: 'DELETE',
		// 		headers:{
		// 			'content-type':'application/json'
		// 		}
		// 	})
		// 	.then(res => {
		// 		console.log(res);
		// 		res.json();
		// 	});
		// })
		Swal.fire({
			title: 'Are you sure?',
			text: `Cancel the order: ${order.tools_name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Proceed'
		  }).then((result) => {
			if (result.isConfirmed) {
				fetch(`https://blooming-sands-78734.herokuapp.com/myorders/${order._id}`,{
					method: 'DELETE',
					headers:{
						'content-type':'application/json'
					}
				})
				.then(res => {
					console.log(res);
					return res.json();
				})
				.then(data => {
					if(data?.acknowledged){
						refetch();
					}
				})
			
			  Swal.fire(
				'Deleted!',
				`Your Order ${order.tools_name} is canceled`,
				'success'
			  )
			}
		  })
		
	}

	return (
		<tr className='border border-2'>
			<th>{index+1}</th>
			<td>
				{/* <img className='w-' src={order.tools_image} alt="" /> */}
				<div class="avatar">
					<div class="w-16 rounded">
						<img src={order.tools_image} alt="Tailwind-CSS-Avatar-component" />
					</div>
				</div>	
			</td> 
			<td>{order.tools_name}</td> 
			<td className=''>
				<div className='w-96'>
					<p className='overflow-x-auto'>{order.address}</p>
				</div>
			</td>
			<td>({order.quantity}) | (${parseInt(order.quantity) * parseInt(order.tools_price)})</td> 
			<td>
				{(order.paid)?<button disabled className='btn btn-success btn-sm px-3 text-white'>Paid</button> :
					<Link to={`/dashboard/payment/${order._id}`}><button className='whitespace-nowrap btn btn-success btn-sm px-3 text-white py-1'>Pay Now</button></Link>
				}
			</td> 
			<td>
				{
					(order.paid) ?
					<div className='text-center'>
						{
							(order?.shipping)?
							<button className='btn btn-success btn-sm px-3 py-1 text-white'>Shipped</button>
							:
							<button className='btn btn-primary btn-sm px-3 py-1 text-white'>Processing</button>
						}
						<p className='whitespace-nowrap text-green-500 pt-2'>TrxID: {order.transactionId}</p>
					</div>
					
					:
					<div className='flex justify-center'>
						<button onClick={HandleOrderCancel} className='btn btn-neutral btn-sm px-3 text-white '>Cancel</button>
					</div>
				}
			</td>
		</tr>
	);
};

export default MyOrderRow;