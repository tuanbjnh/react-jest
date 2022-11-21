// assets
import { DashboardOutlined, TableOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    TableOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'table',
            title: 'Table',
            type: 'item',
            url: '/table',
            icon: icons.TableOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
