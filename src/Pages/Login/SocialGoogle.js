import React from 'react';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import useToken from '../../Hooks/useToken';

const SocialGoogle = () => {
	const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	const [token] = useToken();

	if(loading || gLoading) {
		return <p className='text-center'>Loading...</p>;
	}
	if(token) {
		return navigate('/');
	}

	const handleGoogleLogin = () => {
		signInWithGoogle();
	}

	return (
		<div className='w-full'>
			<button onClick={handleGoogleLogin} class="btn btn-error btn-outline w-full">Continue with Google</button>
		</div>
	);
};

export default SocialGoogle;