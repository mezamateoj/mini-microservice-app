import CreateList from './components/CreateList';
import CreatePost from './components/CreatePost';

function App() {
	return (
		<div className="h-screen w-screen overflow-x-hidden">
			<div className="flex flex-col items-center justify-center mt-5">
				<h1 className="font-bold text-2xl">Create Post</h1>
				<CreatePost />
			</div>
			<div className="flex flex-col justify-center items-center mt-5">
				<h1 className="font-bold">Posts</h1>
				<CreateList />
			</div>
		</div>
	);
}

export default App;
