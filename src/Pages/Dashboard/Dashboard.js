import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import NavBar from '../Home/NavBar';
import { BsLayoutSidebarInset } from 'react-icons/bs';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../Shared/Loading';

const Dashboard = () => {
	const [user, loading] = useAuthState(auth);
	const [checked, setChecked] = useState(false);
	const [admin, adminLoading] = useAdmin(user);

	// if(adminLoading || loading) {
	// 	return <Loading></Loading>;
	// }


	return (
		<div>
			<NavBar></NavBar>
			{
				(adminLoading || loading) ?
					<Loading></Loading>
					:
					<div class="drawer drawer-mobile pt-16">
						<input id="dashboard-sidebar" type="checkbox" onClick={() => {
							setChecked(true);
						}} onBlur={() => {
							setChecked(false);
						}} checked={checked} className="drawer-toggle" />
						<div className="drawer-content flex flex-col">
							<div className='flex items-center justify-end mt-3'>
								<label htmlFor="dashboard-sidebar" className="lg:hidden mr-6 text-2xl text-accent"><BsLayoutSidebarInset /></label>
							</div>
							<h2 className='text-3xl font-bold text-accent px-6'>Dashboard</h2>
							<Outlet></Outlet>


						</div>

						<div class="drawer-side">
							<label for="my-drawer-2" class="drawer-overlay"></label>
							<ul class="menu p-4 overflow-y-auto w-52 bg-accent text-white">
								<li><Link to='/dashboard'>My Profile</Link></li>
								{
									!admin && <>
										<li><Link to='/dashboard/myorders'>My Orders</Link></li>
										<li><Link to='/dashboard/review'>Add A Review</Link></li>
									</>
								}
								{
									admin && <>
										<li><Link to='/dashboard/manageAllOrders'>Manage All Orders</Link></li>
										<li><Link to='/dashboard/addTool'>Add A Tool</Link></li>
										<li><Link to='/dashboard/makeAdmin'>Make Admin</Link></li>
										<li><Link to='/dashboard/manageTools'>Manage Tools</Link></li>
									</>
								}
							</ul>

						</div>
					</div>
			}

		</div>
	);
};

export default Dashboard;