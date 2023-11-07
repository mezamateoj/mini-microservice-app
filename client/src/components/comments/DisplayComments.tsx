import React, { useEffect, useState } from 'react';

interface Comment {
	id: string;
	content: string;
}

export default function DisplayComments({
	comments,
}: {
	comments: Array<Comment>;
}) {
	// const [comments, setComments] = useState<Comment[]>([]);

	// const getComments = async () => {
	// 	const response = await fetch(
	// 		`http://localhost:4001/posts/${postId}/comments`
	// 	);
	// 	const data = await response.json();
	// 	setComments(data);
	// };

	// useEffect(() => {
	// 	getComments();
	// }, []);

	return (
		<div className="">
			{comments.map((comment) => (
				<div
					key={comment.id}
					className="flex flex-col gap-2 border-b border-b-slate-100"
				>
					<li className="list-none text-sm font-light">
						{comment.status === 'pending'
							? 'awaiting moderation'
							: comment.status === 'rejected'
							? 'comment moderated'
							: comment.content}
					</li>
				</div>
			))}
		</div>
	);
}
