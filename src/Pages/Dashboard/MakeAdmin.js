import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../Shared/Loading';

const MakeAdmin = () => {
	const [user, loading] = useAuthState(auth);
	const [admin, adminLoading] = useAdmin(user);

	const {data: users, isLoading, refetch} = useQuery('user', () => {
		return fetch(`https://blooming-sands-78734.herokuapp.com/user`,{
			headers:{
				authorization: `Bearer ${localStorage.getItem('access-token')}`
			}
		})
		.then(res => {
			console.log(res)
			if(res.status === 403){
				signOut(auth);
			} else{
				return res.json();
			}
		});
	})

	if(loading || isLoading){
		return <Loading></Loading>;
	}


	const handleMakeAdmin = (user) => {

		fetch(`https://blooming-sands-78734.herokuapp.com/makeAdmin/${user.email}`,{
			method: 'PUT',
			headers:{
				'content-type':'application/json',
				authorization: `Bearer ${localStorage.getItem('access-token')}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data) {
				refetch();
			}
		})
		
	}

	return (
		<div>
			<h2 className='text-center text-accent text-xl my-2 font-semibold'>Make Admin</h2>
			<div class="overflow-x-auto mx-4 mb-32 md:mb-10 lg:mb-10">

				<table class="table-compact w-full ">
					<thead className='bg-accent text-white'>
					<tr>
						<th></th>
						<th className='whitespace-nowrap'>Name</th> 
						<th className='whitespace-nowrap'>Email</th> 
						<th className='whitespace-nowrap'>Action</th>
					</tr>
					</thead> 
					<tbody className='bg-white'>
						{
							users?.map((user,index) => <tr key={user._id} className='border border-2'>
								<th className='text-center'>{index+1}</th>
								<td className='text-center'>{user.name}</td>
								<td className='text-center'>{user.email}</td>
								<td className='text-center'>
									{
										(user?.role === 'admin') ?
										<button  className='btn btn-success btn-sm text-white whitespace-nowrap'>Admin</button>
										:
										<button onClick={() => handleMakeAdmin(user)} className='btn btn-accent btn-sm text-white whitespace-nowrap'>Make Admin</button>
									}
								</td>
							</tr>)
						}	
						
					</tbody> 
				</table>
			</div>	
		</div>
	);
};

export default MakeAdmin;