import { signOut } from 'firebase/auth';
import React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import ManageAllOrderRow from './ManageAllOrderRow';

const ManageAllOrders = () => {
	const navigate = useNavigate();

	const {data:manageOrders, isLoading, refetch} = useQuery('manageOrder', () => {
		return fetch('https://blooming-sands-78734.herokuapp.com/manageOrder', {
			headers:{
				authorization: `Bearer ${localStorage.getItem('access-token')}`
			}
		})
		.then(async res =>{
			if(res.status === 403){
				alert('errorr');
				navigate('/login');
				await signOut(auth);
				
			} else{
				return res.json();
			}
			
		});
	})
	let manageOrderReverse;
	if(manageOrders !== undefined){
		manageOrderReverse = [...manageOrders];
		manageOrderReverse = manageOrderReverse.reverse();

	}
	
	if(isLoading){
		return <Loading></Loading>;
	}
	return (
		<div>
			<h2 className='text-center text-accent text-xl my-2 font-semibold'>Manage All Orders</h2>

			
			<div class="overflow-x-auto mx-4 mb-32 md:mb-10 lg:mb-10">

				<table class="table-compact w-full ">
					<thead className='bg-accent text-white'>
					<tr>
						<th></th>
						<th className='whitespace-nowrap'>Order Id</th> 
						<th className='whitespace-nowrap'>Orderer Email</th> 
						<th className='whitespace-nowrap'>Shipping Address</th> 
						<th className='whitespace-nowrap'>Tools Name</th> 
						<th className='whitespace-nowrap'>Quantity | Price</th> 
						<th className='whitespace-nowrap' >Pay Status</th> 
						<th className='whitespace-nowrap'>Order Action</th>
					</tr>
					</thead> 
					<tbody className='bg-white'>
						{
							manageOrderReverse?.map((order,index) => <ManageAllOrderRow 
								key={order._id}
								order={order}
								index={index}
								refetch={refetch}
							></ManageAllOrderRow>)
						}	
						
					</tbody> 
					<tfoot>
					{/* <tr>
						<th></th> 
						<th>Name</th> 
						<th>Job</th> 
						<th>company</th> 
						<th>location</th> 
						<th>Last Login</th> 
						<th>Favorite Color</th>
					</tr> */}
					</tfoot>
				</table>
			</div>			
		</div>
	);
};

export default ManageAllOrders;