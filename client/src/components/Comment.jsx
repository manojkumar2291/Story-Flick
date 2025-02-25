import { useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'

import { Context } from '../context/Context'
import { PF } from '../utils'
const backend=process.env.REACT_APP_BACKEND_URL

const Comment = ({ comment }) => {
	const { user } = useContext(Context)

	const handleDelete = async () => {
		try {
			await axios.delete(`${backend}/comments/${comment._id}`).then(() => window.location.reload())
			toast.success('Comment has been deleted!', { position: 'bottom-center', className: 'toast' })
		} catch (err) {
			toast.error('Comment deleting failed!', { position: 'bottom-center', className: 'toast' })
		}
	}

	const handleConfirm = () => {
		confirmAlert({
			title: 'Delete?',
			message: 'Are you sure to delete this post?',
			buttons: [
				{
					label: 'Yes',
					onClick: () => handleDelete(),
				},
				{
					label: 'No',
					onClick: () => null,
				},
			],
		})
	}

	return (
		<div className="comment">
			<Toaster />
			<div className="comment__info">
				<div className="comment__info--left">
					<img src={PF + comment.commentedUserProfile} alt="" crossOrigin="true" />
					<span>{comment.commentedUsername}</span>
				</div>
				<div className="comment__info--right">
					<span>{new Date(comment.createdAt).toDateString()}</span>
					<i className="comment__icon far fa-edit edit"></i>
					{(comment.postUserId === user?._id ||
						comment.commentedUserId === user?._id ||
						user?.admin) && (
						<i className="comment__icon far fa-trash-alt delete" onClick={handleConfirm}></i>
					)}
				</div>
			</div>
			<p>{comment.comment}</p>
		</div>
	)
}

export default Comment
