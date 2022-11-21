import { lazy } from 'react';

// project import
import Loadable from '../components/Loadable';
import MainLayout from '../layout/MainLayout';
import Table from '../pages/extra-pages/Table';
import TableDetail from '../pages/extra-pages/TableDetail';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'table',
            children: [
                {
                    path: '',
                    element: <Table />
                },
                {
                    path: ':id',
                    element: <TableDetail />
                }
            ]
        }
    ]
};

export default MainRoutes;
