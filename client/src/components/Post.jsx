import { Link } from 'react-router-dom'
import { PF } from '../utils'


const Post = ({ post }) => {
	function createMarkup(c) {
        return { __html: c };
    }
	return (
		<div className="post">
			<Link to={`/post/${post._id}`} className="link">
				<div className="post__tag">{post.username}</div>
				{post.photo && (
					<img src={PF + post.photo} alt="Post" className="post__img" crossOrigin="true" />
				)}
				<div className="post__info">
					<div className="post__info--cats">
						{post?.categories.map(cat => (
							<span className="post__info--cat" key={cat}>
								{cat}
							</span>
						))}
					</div>
					<span className="post__title">{post.title}</span>
					<span className="post__date">{new Date(post.createdAt).toDateString()}</span>
				</div>
				<div dangerouslySetInnerHTML={createMarkup(post.desc)}></div>
				
			</Link>
		</div>
	)
}

export default Post
