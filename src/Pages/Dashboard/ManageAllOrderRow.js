import React from 'react';
import Swal from 'sweetalert2';

const ManageAllOrderRow = ({order, index, refetch}) => {

	const handleShipping = () => {
		
		Swal.fire({
			title: 'Are you sure?',
			text: `Shipping the order: ${order.tools_name} of ${order.email}`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Proceed'
		  }).then((result) => {
			if (result.isConfirmed) {
				fetch(`https://blooming-sands-78734.herokuapp.com/manageOrder/${order._id}`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('access-token')}`
				}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);
					refetch();
				})
			}
		  })
	}
	
	const handleOrderDelete = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `Delete the order: ${order.tools_name} of ${order.email}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Proceed'
		  }).then((result) => {
			if (result.isConfirmed) {
				fetch(`https://blooming-sands-78734.herokuapp.com/manageOrder/${order._id}`, {
					method: 'DELETE',
					headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${localStorage.getItem('access-token')}`
					}
				})
				.then(res => res.json())
				.then(data => {
					console.log(data);
					refetch();
				})
			}
		  })


		
	}
	return (
		<tr className='border border-2'>
			<th></th> 
			<td>{order._id}</td> 
			<td>{order.email}</td> 
			<td>
				<div className='w-60'>
					<p>{order.address}</p>
				</div>
			</td> 
			<td className='whitespace-nowrap'>{order.tools_name}</td>
			<td>({order.quantity}) | (${parseInt(order.quantity) * parseInt(order.tools_price)})</td> 
			<td>{
				(order?.paid)?
					<>
						{
							(order?.shipping) ?
							<button className='btn btn-sm btn-success text-white'>Shipped</button>
							:
							<button onClick={() => handleShipping()} className='btn btn-sm btn-error text-white'>Pending</button>
						}
					</>
				:
				<button className='btn btn-warning btn-sm text-white'>Unpaid</button>
			}</td> 
			<td>
				{
					(order?.paid)?
					<button  className='btn btn-sm btn-info text-white whitespace-nowrap'>Already paid</button>
					:
					<button onClick={() => handleOrderDelete()} className='btn btn-sm btn-primary text-white'>Delete</button>
				}
			</td>
		</tr>
	);
};

export default ManageAllOrderRow;