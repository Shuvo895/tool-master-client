import React from 'react';
import NavBar from '../Home/NavBar';
import Footer from '../Shared/Footer';

const Blogs = () => {
	return (
		<div>
			<NavBar></NavBar>

			<div className=''>
			<h2 className='pt-24 pb-6 text-center text-3xl font-bold text-accent'>Blogs</h2>

				<div class="card bg-white shadow-xl mx-4 md:mx-10 lg:mx-10 mb-20">
					<div class="card-body">
						<p><span className='font-bold'>Q:1</span> How will you improve the performance of a React Application?</p>
						<p><span className='font-bold'>Ans:</span> <br /> 1. First I need to reduce unnecessary code <br />
							2. Stop send unneeded this.props. <br />
							3. useEffect can create inifinite loop so that's why we need to use useEffect carefully. <br />
							4. Prevent unnecessary re-rendering. <br />
						</p>
					</div>
					<div class="card-body">
						<p><span className='font-bold'>Q:2</span>  What are the different ways to manage a state in a React application?</p>
						<p><span className='font-bold'>Ans:</span> <br /> 1. We manage state by locally in Local State, it can manage useState hook in React<br />
							2. Global state manage multiple compontent<br />
							3. Sever State we get data from server and send server into server from ui<br />
							4. Url state can send params path for different query. <br />
						</p>
					</div>

					<div class="card-body">
						<p><span className='font-bold'>Q:3</span> How does prototypical inheritance work?</p>
						<p><span className='font-bold'>Ans:</span> <br /> A prototypica inheritance work in js for add properties and method in objects. A object can inherit the properties and method of an another object 
						</p>
					</div>

					<div class="card-body">
						<p><span className='font-bold'>Q:4</span> Why you do not set the state directly in React. For example, if you have const [products, setProducts] = useState([]). Why you do not set products = [...] instead, you use the setProducts</p>
						<p><span className='font-bold'>Ans:</span> <br /> 
						When you directly set the State react can not re-render the compontent, but use the function of hook can re-render the compontent and change the state only. Don't need to render the whole component.
						</p>
					</div>
					<div class="card-body">
						<p><span className='font-bold'>Q:5</span> You have an array of products. Each product has a name, price, description, etc. How will you implement a search to find products by name?</p>
						<p><span className='font-bold'>Ans:</span> <br /> 
						By using filter and in filter all iterate you can check by includes.
						const search = prdoucts.filter(f => f.name.toLocaleLowerCase().includes((searchWord).toLocaleLowerCase()));
						</p>
					</div>
				</div>

			</div>
			<Footer></Footer>
		</div>
	);
};

export default Blogs;