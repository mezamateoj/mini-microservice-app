import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function CreateComment({ postId }: { postId: string }) {
	const [content, setContent] = useState('');

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
			content,
		});
		alert('Comment created successfully!');
		setContent('');
	};

	return (
		<div className="mb-8">
			<form
				action=""
				onSubmit={handleSubmit}
				className="flex flex-col p-2 justify-center items-center mt-5 gap-2"
			>
				<label htmlFor="" className="font-medium mr-auto text-sm">
					New Comment
				</label>
				<input
					type="text"
					placeholder="Comment"
					className="border-2 border-slate-300 p-1 rounded-md"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button className="rounded-md bg-green-500 text-white p-2">
					Submit
				</button>
			</form>
		</div>
	);
}
