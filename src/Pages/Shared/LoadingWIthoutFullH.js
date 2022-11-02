import React from 'react';
import ReactLoading from 'react-loading';

const LoadingWIthoutFullH = () => {
	return (
		<div className='flex justify-center items-center'>
			<ReactLoading type='spokes' color='#0F2640' height={50} width={50} />
		</div>
	);
};

export default LoadingWIthoutFullH;