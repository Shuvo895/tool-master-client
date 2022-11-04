import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ReactStars from 'react-rating-stars-component';
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import { useQuery } from 'react-query';


const AddReview = () => {
	const [user, loading, error] = useAuthState(auth);
	const [star, setStar] = useState(0);

	
	const {data, isLoading, refetch} = useQuery('userProfileForReview', () => {
		return fetch(`https://blooming-sands-78734.herokuapp.com/profile/${user.email}`,{
			headers:{
				authorization: `Bearer ${localStorage.getItem('access-token')}`
			}
		})
		.then(res => res.json());
	})

	const ratingChanged = async(newRating) => {
		await setStar(newRating);
	};
	console.log('Now', data);
	const handleStar = event => {
		event.preventDefault();
		const reviewDetails = event.target.reviewDetails.value;
		console.log(reviewDetails, star);

		const doc = {
			review: reviewDetails,
			email: user.email,
			name: user.displayName,
			star: star,
			photo: data.photo,
		}

		fetch('https://blooming-sands-78734.herokuapp.com/addreview',{
			method:'POST',
			headers:{
				'content-type':'application/json'
			},
			body: JSON.stringify(doc)
		})
		.then(res => res.json())
		.then(data => {
			if(data?.acknowledged){
				Swal.fire(
					'Thanks for review us! 😍',
					'',
					'success'
				  )
			}
		})
		event.target.reset();
	}
	return (
		<div>
			<h2 className='text-center text-accent text-xl my-2 font-semibold'>Add A Review</h2>

			<div class="hero">
				<div class="hero-content flex-col lg:flex-row-reverse">
					<div class="card flex-shrink-0 w-72 md:w-96 lg:w-96 shadow-2xl bg-white">
					<div class="card-body">
						<h1 className='text-xl font-bold'>Rate this site</h1>
						<p className='text-sm'>Tell others what you thik</p>
						<form onSubmit={handleStar}>
							<div class="form-control">
							
							<textarea name='reviewDetails' type="text" placeholder="your review" class="textarea textarea-bordered" required/>
							</div>
							<ReactStars
								classNames='my-3 mx-auto'
								count={5}
								onChange={ratingChanged}
								size={40}
								isHalf={true}
								emptyIcon={<i className="far fa-star"></i>}
								halfIcon={<i className="fa fa-star-half-alt"></i>}
								fullIcon={<i className="fa fa-star"></i>}
								activeColor="#ffd700"
							/>


							<div class="form-control mt-2">
							<button type='submit' class="btn btn-primary text-white">Submit</button>
							</div>
						</form>
					</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddReview;