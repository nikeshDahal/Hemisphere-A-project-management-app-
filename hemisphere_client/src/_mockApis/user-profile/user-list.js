// project imports
import services from 'utils/mockAdapter';

// asset
import Avatar1 from 'assets/images/users/avatar-1.png';
import Avatar2 from 'assets/images/users/avatar-2.png';
import Avatar3 from 'assets/images/users/avatar-3.png';

// user list
const usersS1 = [
    {
        id: '01',
        avatar: 'user-1.png',
        name: 'Curtis',
        verify: 1,
        email: 'wiegand@hotmail.com',
        location: 'Saucerize',
        friends: 834,
        followers: 3645,
        status: 'Active'
    },
    {
        id: '02',
        avatar: 'user-2.png',
        name: 'Xavier',
        verify: 1,
        email: 'tyrell86@company.com',
        location: 'South Bradfordstad',
        friends: 634,
        followers: 2345,
        status: 'Pending'
    },
    {
        id: '03',
        avatar: 'user-3.png',
        name: 'Lola',
        verify: 1,
        email: 'aufderhar56@yahoo.com',
        location: 'North Tannermouth',
        friends: 164,
        followers: 9345,
        status: 'Rejected'
    },
    {
        id: '04',
        avatar: 'user-4.png',
        name: 'Milton',
        verify: 1,
        email: 'dikinson49@hotmail.com',
        location: 'North Anika',
        friends: 684,
        followers: 3654,
        status: 'Pending'
    },
    {
        id: '05',
        avatar: 'user-5.png',
        name: 'Lysanne',
        verify: 0,
        email: 'zack.turner49@company.com',
        location: 'Betteland',
        friends: 842,
        followers: 5863,
        status: 'Active'
    },
    {
        id: '06',
        avatar: 'user-6.png',
        name: 'Bonita',
        verify: 1,
        email: 'keebler57@company.com',
        location: 'Alexburgh',
        friends: 543,
        followers: 8965,
        status: 'Rejected'
    },
    {
        id: '07',
        avatar: 'user-7.png',
        name: 'Retta',
        verify: 1,
        email: 'mathew92@yahoo.com',
        location: 'East Bryceland',
        friends: 871,
        followers: 9321,
        status: 'Active'
    },
    {
        id: '08',
        avatar: 'user-8.png',
        name: 'Zoie',
        verify: 1,
        email: 'hulda1@hotmail.com',
        location: 'Beattytown',
        friends: 354,
        followers: 1686,
        status: 'Pending'
    },
    {
        id: '09',
        avatar: 'user-9.png',
        name: 'Easton',
        verify: 1,
        email: 'hilpert66@hotmail.com',
        location: 'North Pedromouth',
        friends: 546,
        followers: 9562,
        status: 'Active'
    },
    {
        id: '10',
        avatar: 'user-10.png',
        name: 'Brianne',
        verify: 1,
        email: 'noe45@hotmail.com',
        location: 'New Alexanderborough',
        friends: 1482,
        followers: 10865,
        status: 'Active'
    }
];

const usersS2 = [
    {
        image: Avatar1,
        name: 'Elnora',
        designation: 'Lead Marketing Facilitator',
        badgeStatus: 'active',
        subContent: 'We need to generate the virtual CSS hard drive!',
        email: 'Reid_OConnell4@yahoo.com',
        phone: '506-654-1653',
        location: 'Saucerize',
        progressValue: '78%'
    },
    {
        image: Avatar2,
        name: 'Hirohito',
        designation: 'Investor Creative Liaison',
        badgeStatus: 'active',
        subContent: 'If we synthesize the protocol, we can get to the RSS circuit through.',
        email: 'Conner22@hotmail.com',
        phone: '673-157-1670',
        location: 'Port Narcos',
        progressValue: '78%'
    },
    {
        image: Avatar3,
        name: 'Kathie',
        designation: 'Human Accountability Strategist',
        badgeStatus: 'inactive',
        subContent: 'We need to generate the virtual CSS hard drive!',
        email: 'Dangelo40@company.com',
        phone: '506-654-1653',
        location: 'Saucerize',
        progressValue: '78%'
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/user-list/s1/list').reply(200, { users_s1: usersS1 });

services.onGet('/api/user-list/s2/list').reply(200, { users_s2: usersS2 });
