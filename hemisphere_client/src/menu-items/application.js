// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconUserCheck, IconFiles, IconUserPlus, IconFilePlus, IconList } from '@tabler/icons';

// constant
const icons = {
    IconUserCheck,
    // IconBasket,
    // IconMessages,
    // IconLayoutKanban,
    // IconMail,
    // IconCalendar,
    // IconNfc,
    IconFiles,
    IconUserPlus,
    IconFilePlus,
    IconList
};

// ==============================|| APPLICATION MENU ITEMS ||============================== //

const application = {
    id: 'application',
    title: <FormattedMessage id="application" />,
    type: 'group',
    children: [
        {
            id: 'users',
            title: <FormattedMessage id="users" />,
            type: 'collapse',
            icon: icons.IconUserCheck,
            children: [
                {
                    id: 'user-create',
                    title: <>Add New User</>,
                    type: 'item',
                    icon: icons.IconUserPlus,
                    url: '/users/add-user'
                },

                {
                    id: 'card1',
                    title: <>Users List</>,
                    type: 'item',
                    icon: icons.IconList,
                    url: '/users/users-list'
                }
            ]
        },

        {
            id: 'projects',
            title: <FormattedMessage id="Projects" />,
            type: 'collapse',
            icon: icons.IconFiles,
            children: [
                {
                    id: 'project-create',
                    title: <>Add New Project</>,
                    type: 'item',
                    icon: icons.IconFilePlus,
                    url: '/project/add-project'
                },
                {
                    id: 'project-listing',
                    title: <>Projects List</>,
                    type: 'item',
                    icon: icons.IconList,
                    url: '/project/project-list'
                }
            ]
        }
    ]
};

export default application;
