import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
	const [title, setTitle] = useState('');

	const handleSubmit = async (e: React.SyntheticEvent) => {
		e.preventDefault();
		await axios.post('http://localhost:4000/posts', {
			title,
		});
		alert('Post created successfully!');
		setTitle('');
	};
	return (
		<div className="flex flex-col justify-center items-center mt-5 bg-slate-300 rounded-md w-2/6 h-[200px]">
			<form
				action=""
				className="flex flex-col items-center justify-center"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-2">
					<label
						className="text-center text-xl font-semibold"
						htmlFor=""
					>
						Title
					</label>
					<input
						className="border-2 border-slack-800"
						type="text"
						placeholder="Enter title post"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<button className="rounded-md font-medium mt-5 bg-green-500 p-2 text-white">
					Create
				</button>
			</form>
		</div>
	);
}
