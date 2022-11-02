import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, Link } from 'react-router-dom';
import auth from '../../firebase.init';
import './Navbar.css';

const HomeNavBar = () => {
	const [user, loading, error] = useAuthState(auth);
    const [navStyle, setNavStyle] = useState(false);
 
    const changeNavBackground = () => {
		if(window.scrollY >= 30){
			setNavStyle(true);
		} else{
			setNavStyle(false);
		}
	}
    window.addEventListener('scroll', changeNavBackground);

	const menuItems = <>
		<li className={`text-white font-semibold ${navStyle? 'hover:text-primary' :''}`}><NavLink to='/'>Home</NavLink></li>
		<li className={`text-white font-semibold ${navStyle? 'hover:text-primary' :''}`}><NavLink to='/blogs'>Blogs</NavLink></li>
		<li className={`text-white font-semibold ${navStyle? 'hover:text-primary' :''}`}><NavLink to='/myPortfilo'>My Portfilo</NavLink></li>
		{
			user?
			<>
				<li className={`text-white font-semibold ${navStyle? 'hover:text-primary' :''}`}><NavLink to='/dashboard'>Dashboard</NavLink></li>
				<li className={`text-white font-semibold ${navStyle? 'hover:text-primary' :''}`}><p onClick={() => signOut(auth)}>Logout</p></li>
			</>
			:
			<li className='text-white font-semibold'><NavLink to='/login'>Login</NavLink></li>
		}
	</>
	return (
		<div class={`navbar ${navStyle ? 'bg-gradient-to-r from-accent to-neutral' : 'bg-transparent'} sticky top-0 z-50 `}>
			<div class="navbar-start">
				<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" className='text-white'/></svg>
				</label>
				<ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-accent w-52">
					{
						menuItems
					}
				</ul>
				</div>
				<Link to='/' class="btn btn-ghost normal-case text-xl hidden lg:flex  text-white font-bold">Tools Master</Link>
			</div>
			<div class="navbar-end hidden lg:flex">
				<ul class="menu menu-horizontal p-0">
					{
						menuItems
					}
				</ul>
			</div>
			<div className='navbar-end lg:hidden'>
				<Link to='/' class="btn btn-ghost normal-case text-xl text-white font-bold">Tools Master</Link>
			</div>
			
		</div>
	);
};

export default HomeNavBar;