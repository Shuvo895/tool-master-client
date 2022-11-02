import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import MyOrderRow from './MyOrderRow';

const MyOrders = () => {
	const [user, loading, error] = useAuthState(auth);
	const {data:orders,isLoading,  refetch} = useQuery(['myorders', user], () => {
		return fetch(`https://blooming-sands-78734.herokuapp.com/myorders/${user.email}`,{
			method: 'GET'
		})
		.then(res => {
			console.log('res: ',res);
			return res.json();
		})
	})
	if(loading || !orders) {
		return <Loading></Loading>;
	}
	let ordersInReverse = [];
	ordersInReverse = [...orders];
	ordersInReverse = ordersInReverse.reverse();

	return (
		<div>
			<h2 className='text-center text-accent text-xl my-2 font-semibold'>My Orders</h2>
			<div class="overflow-x-auto mx-4 mb-32 md:mb-10 lg:mb-10">

				<table class="table-compact w-full ">
					<thead className='bg-accent text-white'>
					<tr>
						<th></th>
						<th className='whitespace-nowrap'>Tools Image</th> 
						<th className='whitespace-nowrap'>Tools Name</th> 
						<th className='whitespace-nowrap'>Shipping Address</th> 
						<th className='whitespace-nowrap'>Quantity | Price</th> 
						<th className='whitespace-nowrap' >Pay Status</th> 
						<th className='whitespace-nowrap'>Order Action</th>
					</tr>
					</thead> 
					<tbody className='bg-white'>
						{
							ordersInReverse.map((order,index) => <MyOrderRow 
								key={order._id}
								order={order}
								index={index}
								refetch={refetch}
							></MyOrderRow>)
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

export default MyOrders;