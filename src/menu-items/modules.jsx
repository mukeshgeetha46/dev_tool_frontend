// assets
import { DashboardOutlined } from '@ant-design/icons';
import { ProjectIcon,
  MockServerIcon
 } from 'components/Icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

export const mock = {
  id: 'group-api',
  title: 'API-Tools',
  type: 'group',
  children: [
    {
      id: 'project-list',
      title: 'Projects',
      type: 'item',
      url: '/project-list',
      icon: ProjectIcon,
      breadcrumbs: true
    },
    {
      id: 'mock-server',
      title: 'Mock Server',
      type: 'item',
      url: '/mockserver-list',
      icon: MockServerIcon,
      breadcrumbs: true
    }
  ]
};
