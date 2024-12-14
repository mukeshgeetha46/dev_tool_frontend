import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import Dashboard from 'layout/Dashboard';

const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// newly added
const MockServerForm = Loadable(lazy(() => import('pages/api-tools/mock-server/form')));
const MockServerList = Loadable(lazy(() => import('pages/api-tools/mock-server/list')));
const ProjectForm = Loadable(lazy(() => import('pages/api-tools/project/form')));
const ProjectList = Loadable(lazy(() => import('pages/api-tools/project/list')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <Dashboard />,
  children: [
    // {
    //   path: '/',
    //   element: <DashboardDefault />
    // },
    {
      path: 'color',
      element: <Color />
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
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    // newly added below
    {
      path: 'mockserver-list',
      element: <MockServerList />
    },
    {
      path: 'mockserver-create',
      element: <MockServerForm />
    },
    {
      path: 'mockserver-update',
      element: <MockServerForm update={true} />
    },
    {
      path: 'project-list',
      element: <ProjectList />
    },
    {
      path: 'project-create',
      element: <ProjectForm />
    },
    {
      path: 'project-update',
      element: <ProjectForm update={true} />
    }
  ]
};

export default MainRoutes;
