import React from 'react';
import Swal from 'sweetalert2';

const ManageToolsRow = ({tool, index, refetch}) => {

	const  handleToolDelete  = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: `Delete the Tool: ${tool.name}`,
			icon: 'question',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Proceed'
		  }).then((result) => {
			if (result.isConfirmed) {
				fetch(`https://blooming-sands-78734.herokuapp.com/tools/${tool._id}`, {
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
			<th>{index+1}</th>
			<td><img className='h-8' src={tool.image} alt="" /></td>
			<td>{tool.name}</td>
			<td>{tool.available_quantity}</td>
			<td>{tool.min_quantity}</td>
			<td>{tool.price}</td>
			<td className='flex justify-center'>
				<button onClick={handleToolDelete} className='btn btn-sm btn-accent text-white'>Delete</button>
			</td>
		</tr>
	);
};

export default ManageToolsRow;