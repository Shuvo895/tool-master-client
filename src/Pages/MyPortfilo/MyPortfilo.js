import React from 'react';
import NavBar from '../Home/NavBar';
import profilePic from '../../Assets/images/Sakib_Profile2.png';
import Footer from '../Shared/Footer';

const MyPortfilo = () => {



	return (
		<div>
			<NavBar></NavBar>
			<h2 className='pt-24 pb-6 text-center text-3xl font-bold text-accent'>My Protfilo</h2>


			<div class="card bg-white shadow-xl mx-4 md:mx-10 lg:mx-10 mb-20">
				<div class="card-body px-5 md:px-12 lg:px-12">

					<div class="avatar mb-2 flex justify-center md:justify-start lg:justify-start">
						<div class="w-48 rounded-xl">
							<img src={profilePic} />
						</div>
					</div>
					<p><span className='font-bold'>Name:</span> Sakib Ahamed Khan</p>
					<p><span className='font-bold'>Email:</span> Sakibahamedkhan01@gmail.com</p>
					<p><span className='font-bold'>Education:</span> Computer Science & Engineering in BGC Trust University Bangladesh (Current)</p>
					<p className='mt-3'><span className='font-bold'>Technologies & Skills:</span>
						<ul className='list-disc ml-6'>
							<li>
								<span className='font-bold'>Expertise:</span> JavaScript, C, ES6, REST API, React, React Router, React Hook, Html5, CSS3, Bootstrap-5,Tailwind.
							</li>
							<li>
								<span className='font-bold'>Comfortable::</span> Node js, C++, MongoDB, Firebase, Express js.
							</li>
							<li>
								<span className='font-bold'>Tools:</span> GitHub, VS Code, Codeblocks, NetBeans, Heroku, Netlify, Postman, Draw.io, Android Studio, Chrome Dev Tools.
							</li>
						</ul>
					</p>
					<p className='mt-3'><span className='font-bold'>Projects:</span>
						<div className='my-2 ml-3'>
							<p className='whitespace-nowrap'>
								<span className='font-bold'>Laptop Stock</span> <a className='text-blue-600 underline' href='https://laptop-stock-d7521.web.app/' target='_blank'>Live Website Link</a>
							</p>
							<p className='font-bold ml-6'>Overview: </p>
							<ul className='list-disc ml-10'>
								<li>
									Product can be Deliver and Restock for the warehouse purpose.
								</li>
								<li>
									New Product can be adding and also you can delete the specific Product.
								</li>
								<li>
									User can see the list of Out Stock product, then user can restock this product.
								</li>
								<li>
									Every User can see the Product they added in Laptop Stock in My Items.
								</li>
								<li>
									<span className='font-bold'>Technology Used: </span>HTML, CSS, Bootstrap, React.js, React Router, Node.js, Express.js, MongoDB,Firebase.
								</li>
							</ul>
						</div>
						<div className='my-2 ml-3'>
							<p className='whitespace-nowrap'>
								<span className='font-bold'>Volunteer World</span> <a className='text-blue-600 underline' href='https://volunteer-world-74865.web.app/' target='_blank'>Live Website Link</a>
							</p>
							<p className='font-bold ml-6'>Overview: </p>
							<ul className='list-disc ml-10'>
								<li>
									Volunteer world give some Event to the Volunteer, then Volunteer register account in this and Join the Volunteer Event.
								</li>
								<li>
									Volunteer Can cancel the Specific Volunteer Event.
								</li>
								<li>
									In Donation Section Volunteer Can Donate Money for Event.
								</li>
								<li>
									Admin see the list of register and also can Add Event.
								</li>
								<li>
									Admin can see the list of all Events and can Delete any Specific Events.
								</li>
								<li>
									<span className='font-bold'>Technology Used: </span>HTML, CSS, Bootstrap, React.js, React Router, Node.js, Express.js, MongoDB, Firebase.
								</li>
							</ul>
						</div>
						<div className='my-2 ml-3'>
							<p className='whitespace-nowrap'>
								<span className='font-bold'>To Do App</span> <a className='text-blue-600 underline' href='https://to-do-app-1766b.web.app/' target='_blank'>Live Website Link</a>
							</p>
							<p className='font-bold ml-6'>Overview: </p>
							<ul className='list-disc ml-10'>
								<li>
									In this user can Add Task in Title with Details.
								</li>
								<li>
									User will show the list of task which he/she added.
								</li>
								<li>
									User can show the details of the specific task in Modal.
								</li>
								<li>
									User can set the task complete and also can delete the specific task.
								</li>
								<li>
									<span className='font-bold'>Technology Used: </span>HTML, CSS, Tailwind, Daisy UI, React.js, React Router, Node.js, Express.js, MongoDB, Firebase.
								</li>
							</ul>
						</div>
					</p>
					<button className='w-fit p-0 shadow-none'><a href='https://drive.google.com/file/d/12yeC6I8S1mNrijyCmIvQ09OPJsChOuLd/view?usp=sharing' className='btn btn-accent w-fit text-white' target='_blank'>Download My CV</a></button>
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
};

export default MyPortfilo;