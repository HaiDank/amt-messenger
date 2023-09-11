import './App.css';
import { Routes, Route } from 'react-router-dom';
import Messenger from './pages/Messenger';
import Chats from './pages/Chats/Chats';
import NotFound from './pages/NotFound';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Messenger />}>
					<Route path='/chats' element={<Chats />} />
					<Route path='*' element={<NotFound/>}/>
				</Route>
			</Routes>
		</>
	);
}

export default App;
