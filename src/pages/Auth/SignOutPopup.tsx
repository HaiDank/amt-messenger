import { Button, Modal } from 'antd';
import React from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppRedux';
import { mySignOut, updateUserStatus } from '../../state/userSlice';
import { auth } from '../../config/firebase';
import { addChatapp } from '../../state/chat/chatappSlice';
import { loadMessages, setChosenChatbox } from '../../state/chat/messageSlice';

type SignOutPopupPropsType = {
	open: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignOutPopup: React.FC<SignOutPopupPropsType> = ({
	open,
	setOpenModal,
}) => {

	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user)

	const handleCancel = () => {
		if (setOpenModal) {
			setOpenModal(false);
		}
	};

	const handleConfirm = () => {
		if (auth.currentUser) {
			signOut(auth)
				.then(() => {
					dispatch(mySignOut());
					console.log('User signed out');
					dispatch(updateUserStatus());
				console.log('usersignout', user)
					dispatch(addChatapp([]));
					dispatch(loadMessages([]))
					dispatch(setChosenChatbox(null))

					navigate('/login', {replace: true})
				})
				.catch((error: Error) => {
					console.error('Error signing out:', error);
				});

		}
	};

	return (
		<Modal
			open={open}
			onCancel={handleCancel}
			destroyOnClose
			maskClosable={false}
			closeIcon={false}
			footer={null}
		>
			<section className='overflow-hidden rounded-md shadow-sm '>
				<div className='flex items-center justify-center p-8 mb-8'>
					<h1 className='text-2xl font-semibold text-black'>
						Are you sure you want to log out?
					</h1>
				</div>
				<div className='flex justify-center gap-2 p-4 pt-8 bg-neutral-200'>
					<Button
						key='submit'
						type='primary'
						onClick={handleConfirm}
						className='w-1/2 bg-blue-600'
					>
						Log out
					</Button>
					<Button key='back' onClick={handleCancel} className='w-1/2'>
						Cancel
					</Button>
				</div>
			</section>
		</Modal>
	);
};

export default SignOutPopup;
