import React from 'react';
import { useQuery } from 'react-query';
import ReactStars from "react-rating-stars-component";
import Loading from '../Shared/Loading';

const Review = () => {

	const { data: reviews, isLoading, refetch } = useQuery('review', () => {
		return fetch('https://blooming-sands-78734.herokuapp.com/review')
			.then(res => res.json());
	})
	if (isLoading) {
		return <Loading></Loading>;
	}

	let reviewLimit = [...reviews];
	reviewLimit = reviewLimit.reverse();
	reviewLimit = reviewLimit.slice(0, 3);

	return (
		<div className='my-20 mx-auto px-6 md:px-10 lg:px-10 max-w-screen-2xl'>
			<h2 className='text-center text-4xl md:text-4xl lg:text-5xl font-bold mb-10'>Our Clients</h2>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 '>
				{
					reviewLimit?.map(review => <div class="card w-full bg-white rounded shadow-md max-w-xs justify-self-center"
						key={review._id}
					>
						<div class="items-center text-center p-2 md:p-3 lg:p-4">
							<div class="avatar online my-3">
								<div class="w-24 rounded-full">
									<img className='' src={review.photo} />
								</div>
							</div>

							<h2 class="card-title text-sm md:text-md lg:text-md text-center block mx-auto">❝ {review.review} ❞</h2>
							<p>― {review.name}</p>
							<div className='flex justify-center'>
								<ReactStars
									count={5}
									size={24}
									value={review.star}
									activeColor="#ffd700"
									edit={false}
								/>
							</div>
						</div>
					</div>)
				}
			</div>
		</div>
	);
};

export default Review;