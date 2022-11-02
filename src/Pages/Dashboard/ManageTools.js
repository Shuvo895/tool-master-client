import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import ManageToolsRow from './ManageToolsRow';

const ManageTools = () => {

	const {data:tools, isLoading, refetch} = useQuery('manageOrder', () => {
		return fetch('https://blooming-sands-78734.herokuapp.com/tools')
		.then(res => res.json());
	})

	if(isLoading) {
		return <Loading></Loading>;
	}
	return (
		<div>
			<h2 className='text-center text-accent text-xl my-2 font-semibold'>Manage Tools</h2>

			<div class="overflow-x-auto mx-4 mb-32 md:mb-10 lg:mb-10">

				<table class="table-compact w-full ">
					<thead className='bg-accent text-white'>
					<tr>
						<th></th>
						<th className='whitespace-nowrap'>Tools Image</th> 
						<th className='whitespace-nowrap'>Tools Name</th> 
						<th className='whitespace-nowrap'>Available Quantity</th> 
						<th className='whitespace-nowrap'>Minimum Quantity</th> 
						<th className='whitespace-nowrap' >Price Per Piece</th>
						<th className='whitespace-nowrap'>Tools Action</th>
					</tr>
					</thead> 
					<tbody className='bg-white'>
						{
							tools?.map((tool,index) => <ManageToolsRow 
								key={tool._id}
								tool={tool}
								index={index}
								refetch={refetch}
							></ManageToolsRow>)
						}	
						
					</tbody> 
					
				</table>
			</div>	
		</div>
	);
};

export default ManageTools;