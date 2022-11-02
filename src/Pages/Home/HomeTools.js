import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import HomeTool from './HomeTool';
import AOS from 'aos';

const HomeTools = () => {
	const [tools, setTools] = useState([]);
	const [loading, setLoading] = useState(true);
	let toolWithSkip;
	useEffect( () =>{
		fetch('https://blooming-sands-78734.herokuapp.com/tools')
		.then(res => res.json())
		.then(data => {
			setTools(data);
			setLoading(false);
		})
	},[]);

	if(loading){
		return <Loading></Loading>;
	}


	let toolWthReverse = [...tools];
	toolWthReverse = toolWthReverse.reverse();

	
	// toolWithSkip = toolWthReverse.slice(0,6);

	return (
		<>
			{
				toolWthReverse ?
				<div className='my-20 mx-auto px-6 md:px-10 lg:px-10 max-w-screen-2xl z-0 relative'>
					<h2 className='text-center text-4xl md:text-4xl lg:text-5xl font-bold mb-4'>Our Tools</h2>
					<p className='text-center text-xl text-slate-400 mb-10 md:mb-10 lg:mb-10'>Chose your favourite tools</p>

					<div   className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 justify-items-center'>
						{
							toolWthReverse.map(tool => <HomeTool
								key={tool._id}
								tool={tool}
							></HomeTool>)
						}
					</div>
				</div>
				:
				<Loading></Loading>
			}
		</>
		
	);
};

export default HomeTools;