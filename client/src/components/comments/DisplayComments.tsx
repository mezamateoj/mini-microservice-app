interface Comment {
	id: string;
	content: string;
	status: string;
}

export default function DisplayComments({
	comments,
}: {
	comments: Array<Comment>;
}) {
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
