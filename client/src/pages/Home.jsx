import { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import { Context } from '../context/Context'
import {
	Header,
	Footer,
	LoadingIndicator,
	Posts,
	Sidebar,
	SidebarUsers,
} from '../includes/components'


const Home = () => {
	const [posts, setPosts] = useState([])
	const [isFetching, setIsFetching] = useState(false)
	const { user } = useContext(Context)
	const backend=process.env.REACT_APP_BACKEND_URL
	const { search } = useLocation()

	useEffect(() => {
		const fetchPosts = async () => {
			setIsFetching(true)
			await axios.get(`${backend}/api/posts/${search}`).then(res => {
				setPosts(res.data.reverse())
				setIsFetching(false)
			})
		}
		fetchPosts()
	}, [search])

	return (
		<>
			<Header />
			<div className="home" id="home">
				{isFetching ? <LoadingIndicator /> : <Posts posts={posts} />}
				{user && <>{search.includes('userId') ? <SidebarUsers /> : <Sidebar />}</>}
			</div>
			<Footer />
		</>
	)
}

export default Home
