// Here all actions
// Note: Snippet for export const: enf

import Swal from 'sweetalert2';

import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from '../types/types';
import { noteLogout } from './notes';
import { finishLoading, startLoading } from './ui';

// action login:
export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
	},
});

// action login with email and password type async example:
export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());
		return firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
				dispatch(finishLoading());
			}) // then
			.catch((e) => {
				// console.log(e);
				dispatch(finishLoading());
				Swal.fire('Error', e.message, 'error');
			});
	};
};

// action with Email and Password
export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: name });
				dispatch(login(user.uid, user.displayName));
			})
			.catch((e) => {
				// console.log(e);
				Swal.fire('Error', e.message, 'error');
			});
	};
};

// action login with Google
export const startGoogleLogin = () => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			// .then( userCredential => {
			// console.log(userCredential);
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
				// console.log(user.uid);
				// console.log(user.displayName);
				// console.log(user.email);
				// console.log(user.photoURL);
				// // user.uid
				// user.displayName
				// user.email
				// user.photoURL
			});
	};
};

// Logout action:
export const startLogout = () => {
	return async (dispatch) => {
		await firebase.auth().signOut();
		dispatch(logout());
		dispatch(noteLogout());
	};
};
export const logout = () => ({
	type: types.logout,
});
