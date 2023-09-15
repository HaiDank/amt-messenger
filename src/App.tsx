import './App.css';
import { Routes, Route } from 'react-router-dom';
import Messenger from './pages/Messenger';
import Chats from './pages/Chats/Chats';
import NotFound from './pages/NotFound';
import Martket from './pages/Marketplace/Market';
import Archive from './pages/Archive/Archive';
import Request from './pages/Request/Request';
import Test from './pages/Test';

function App() {
	return (
		<>
			<Routes>
				<Route path='/' element={<Messenger />}>
					<Route path='/chats' element={<Chats />} />
					<Route path='markets' element={<Martket/>}/>
					<Route path='archives' element={<Archive/>}/>
					<Route path='requests' element={<Request/>}/>
					<Route path='*' element={<NotFound/>}/>
				</Route>
				<Route path='test' element={<Test/>}/>
			</Routes>
		</>
	);
}

export default App;
