import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {BsFillChatFill, BsFillChatDotsFill, BsFillArchiveFill} from 'react-icons/bs'
import {HiMiniBuildingStorefront} from 'react-icons/hi2'

const useAppRoutes = () => {
	const location = useLocation();
	const routes = useMemo(() => [
        {
            path: 'chats',
            icon:  <BsFillChatFill/>,
            active: location.pathname === '/chats',
        },
        {
            path: 'markets',
            icon:  <HiMiniBuildingStorefront/>,
            active: location.pathname === '/markets',
        },
        {
            path: 'requests',
            icon:  <BsFillChatDotsFill/>,
            active: location.pathname === '/requests',
        },
        {
            path: 'archives',
            icon:  <BsFillArchiveFill/>,
            active: location.pathname === '/archives',
        },
    ], [location]);

	return routes;
};

export default useAppRoutes;
