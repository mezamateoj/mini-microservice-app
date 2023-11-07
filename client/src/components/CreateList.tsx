import React, { useEffect, useState } from 'react';
import CreateComment from './comments/CreateComment';
import DisplayComments from './comments/DisplayComments';

interface Post {
	id: string;
	title: string;
	comments: Array<object>;
}

export default function CreateList() {
	const [posts, setPosts] = useState<Post[]>([]);

	const fetchPosts = async () => {
		const response = await fetch('http://localhost:4002/posts');
		const data = await response.json();
		setPosts(data);
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const renderPosts = Object.values(posts);
	return (
		<div className="mt-5 flex items-center gap-3 mb-8 flex-wrap justify-center">
			{renderPosts.map((post) => (
				<div
					key={post.id}
					className="flex flex-col border-2 border-slate-200 rounded-md"
				>
					<div
						key={post.id}
						className="mt-2 border-b border-slate-400 p-1"
					>
						<h1 className="font-medium text-center text-xl">
							{post.title}
						</h1>
					</div>
					<div className="flex items-center justify-center flex-col gap-2 mt-3 flex-wrap p-2">
						<DisplayComments
							comments={post.comments}
							key={post.id}
						/>
					</div>
					<div className="flex items-center justify-center flex-col gap-2 mt-3">
						<CreateComment postId={post.id} key={post.id} />
					</div>
				</div>
			))}
		</div>
	);
}
