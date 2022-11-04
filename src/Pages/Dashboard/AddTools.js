import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';

const AddTools = () => {
	const [user, loading, error] = useAuthState(auth);
	const [uploading, setUploading] = useState(false);



	const image_key = '0cd588ba1e152646a09f8f7beda7931c';
	let photo;
	const handleFile = event => {
		console.log(event.target.files[0]);
		photo = event.target.files[0];
		
	}

	const handleAddTool = event => {
		event.preventDefault();
		setUploading(true);
		const name = event.target.name.value;
		const description = event.target.description.value;
		const minQuantity = event.target.minQuantity.value;
		const availableQuantity = event.target.availableQuantity.value;
		const price = event.target.price.value;


		const formData = new FormData();
		formData.append('image', photo);
		console.log(formData);
		fetch(`https://api.imgbb.com/1/upload?key=${image_key}`,{
			method: 'POST',
			body: formData
		})
		.then(res => res.json())
		.then(data => {
			if(data.success){
				console.log(data);
				const img = data.data.url;
				const doc ={
					name: name,
					image: img,
					description: description ,
					min_quantity: minQuantity,
					available_quantity: availableQuantity,
					price: price
				}
				fetch(`https://blooming-sands-78734.herokuapp.com/addTool`,{
					method: 'POST',
					headers:{
						'content-type': 'application/json',
						authorization: `Bearer ${localStorage.getItem('access-token')}`
					},
					body: JSON.stringify(doc)
				})
				.then(res => res.json())
				.then(data => {
					if(data?.acknowledged){
						Swal.fire(
							'Successfully Added ✌',
							'',
							'success'
						  )
						  setUploading(false);
					}
				})
			}
			setUploading(false);
		})

		event.target.reset();

	}

	return (
		<div>
			<h2 className='text-center text-accent text-xl my-2 font-semibold'>Add Tools</h2>

			<div class="hero mb-32 md:mb-10 lg:mb-10">
				<div class="hero-content flex-col lg:flex-row-reverse">
					<div class="card flex-shrink-0 w-72 md:w-96 lg:w-96 shadow-2xl bg-white">
					<div class="card-body">
						<h1 className='text-xl font-bold'>Filup All Field</h1>
						<form onSubmit={handleAddTool}>
							<input name='name' type="text" placeholder="name" class="input input-bordered w-full max-w-xs mb-3" />
							<textarea name='description' type="text" placeholder="description" class="textarea textarea-bordered w-full max-w-xs mb-3" />
							<input name='minQuantity' type="number" placeholder="min quantity" class="input input-bordered w-full max-w-xs mb-3" />
							<input name='availableQuantity' type="number" placeholder="available quantity" class="input input-bordered w-full max-w-xs mb-3" />
							<input name='price' type="number" placeholder="price" class="input input-bordered w-full max-w-xs mb-3" />
							<input onBlur={handleFile} type="file" placeholder="tool photo" class="input input-bordered w-full max-w-xs mb-3 h-14 pt-3" />
							<button type='submit'  class="btn btn-primary text-white mr-2 w-full">Submit</button>
						</form>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddTools;