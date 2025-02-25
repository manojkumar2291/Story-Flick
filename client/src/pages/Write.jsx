import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { Editor } from '@tinymce/tinymce-react'

import { Context } from '../context/Context'
import { animation } from '../animations/write'
const backend = process.env.REACT_APP_BACKEND_URL

const Write = () => {
	const [title, setTitle] = useState('')
	const [desc, setDesc] = useState('')
	const [cats, setCats] = useState([])
	const [file, setFile] = useState(null)
	const { user } = useContext(Context)
	const history = useHistory()

	const handleCats = e => {
		const text = e.target.value
		const filtered = text
			.trim()
			.toLowerCase()
			.split(/\W/)
			.filter(c => c)
		setCats(filtered)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const newPost = {
			username: user.username,
			userId: user._id,
			categories: cats,
			title,
			desc,
		}
		if (file) {
			const data = new FormData()
			const filename = user.username + Date.now()
			data.append('name', filename)
			data.append('file', file)
			newPost.photo = filename
			try {
				await axios.post(`${backend}/api/upload`, data)
			} catch (err) {}
		}
		try {
			const res = await axios.post(`${backend}/api/posts`, newPost)
			toast.success('Post created!', { position: 'bottom-center', className: 'toast' })
			history.replace(`/post/${res.data._id}`)
		} catch (err) {
			toast.error('Post creation failed!', { position: 'bottom-center', className: 'toast' })
		}
	}

	useEffect(() => {
		animation()
	}, [])

	return (
		<div className="write">
			<Toaster />
			<h3 className="write__heading">Create a new post</h3>
			{file && (
				<img src={URL.createObjectURL(file)} alt="Post" className="write__img" crossOrigin="true" />
			)}
			<form className="write__form" onSubmit={handleSubmit}>
				<div className="write__form--group">
					<label htmlFor="fileInput">
						<i className=" write__icon fas fa-plus"></i>
					</label>
					<input
						type="file"
						id="fileInput"
						style={{ display: 'none' }}
						onChange={e => setFile(e.target.files[0])}
					/>
					<input
						type="text"
						placeholder="Title"
						className="write__input title"
						onChange={e => setTitle(e.target.value)}
						autoFocus
						required
					/>
				</div>

				<div className="write__form--group">
					<input
						type="text"
						placeholder="Categories eg. music, life"
						className="write__input cats"
						onChange={handleCats}
					/>
				</div>
				<div className="write__form--group">
					<Editor
						apiKey="jhuqx86me8jwj2in8roh9w68j1hafs5bl56v8u4wccjv8d7r"
						init={{
							height: 600,
							width:1000,
							menubar: false,
							plugins: [
								'advlist autolink lists link image charmap print preview anchor',
								'searchreplace visualblocks code fullscreen',
								'insertdatetime media table paste code help wordcount'
							],
							toolbar:
								'undo redo | formatselect | bold italic backcolor | \
								alignleft aligncenter alignright alignjustify | \
								bullist numlist outdent indent | removeformat | help'
						}}
						value={desc}
						onEditorChange={(content) => setDesc(content)}
					/>
				</div>
				<button className="write__submit" type="submit">
					Publish
				</button>
			</form>
		</div>
	)
}

export default Write
