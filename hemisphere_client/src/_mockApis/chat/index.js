// project imports
import services from 'utils/mockAdapter';

// chat constant
const text1 = `Hi Good Morning!`;
const text2 = `Hey. Very Good morning. How are you?`;
const text3 = `Good. Thank you`;
const text4 = `I need your minute, are you available?`;

const text5 = `Hey man`;
const text6 = `Hi, Wats up?`;
const text7 = `Need your minute. are you available?`;
const text8 = `Sure. Let's meet.`;

// user list
const users = [
    {
        id: 1,
        name: 'Alene',
        company: 'ABC Pvt Ltd',
        role: 'Sr. Customer Manager',
        work_email: 'alene_work@company.com',
        personal_email: 'alene@company.com',
        work_phone: '380-293-0177',
        personal_phone: '380-293-0177',
        location: 'Port Narcos',
        avatar: 'avatar-1.png',
        status: 'Technical Department',
        lastMessage: '2h ago',
        birthdayText: 'happy Birthday Alene',
        unReadChatCount: 2,
        online_status: 'available'
    },
    {
        id: 2,
        name: 'Keefe',
        company: 'ABC Pvt Ltd',
        role: 'Dynamic Operations Officer',
        work_email: 'keefe_work@gmil.com',
        personal_email: 'keefe@gmil.com',
        work_phone: '253-418-5940',
        personal_phone: '253-418-5940',
        location: 'Afghanistan',
        avatar: 'avatar-2.png',
        status: 'Support Executive',
        lastMessage: '1:20 AM',
        birthdayText: 'happy Birthday Keefe',
        unReadChatCount: 3,
        online_status: 'available'
    },
    {
        id: 3,
        name: 'Lazaro',
        company: 'ABC Pvt Ltd',
        role: 'Resource Investigator',
        work_email: 'lazaro_work@gmil.com',
        personal_email: 'lazaro@gmil.com',
        work_phone: '283-029-1364',
        personal_phone: '283-029-1364',
        location: 'Albania',
        avatar: 'avatar-3.png',
        status: 'Resource Investigator',
        lastMessage: 'Yesterday',
        birthdayText: 'happy Birthday Lazaro',
        unReadChatCount: 1,
        online_status: 'available'
    },
    {
        id: 4,
        name: 'Hazle',
        company: 'ABC Pvt Ltd',
        role: 'Teamworker',
        work_email: 'hazle_work@gmil.com',
        personal_email: 'hazle@gmil.com',
        work_phone: '380-293-0177',
        personal_phone: '380-293-0177',
        location: 'Algeria',
        avatar: 'avatar-4.png',
        status: 'Teamworker',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Hazle',
        unReadChatCount: 0,
        online_status: 'do_not_disturb'
    },
    {
        id: 5,
        name: 'Herman Essertg',
        company: 'ABC Pvt Ltd',
        role: 'Co-ordinator',
        work_email: 'herman_essertg_work@gmil.com',
        personal_email: 'herman_essertg@gmil.com',
        work_phone: '253-418-5940',
        personal_phone: '253-418-5940',
        location: 'Andorra',
        avatar: 'avatar-5.png',
        status: 'Co-ordinator',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Herman',
        unReadChatCount: 0,
        online_status: 'do_not_disturb'
    },
    {
        id: 6,
        name: 'Wilhelmine Durrg',
        company: 'ABC Pvt Ltd',
        role: 'Monitor Evaluator',
        work_email: 'wilhelmine_durrg_work@gmil.com',
        personal_email: 'wilhelmine_durrg@gmil.com',
        work_phone: '380-293-0177',
        personal_phone: '380-293-0177',
        location: 'Angola',
        avatar: 'avatar-6.png',
        status: 'Monitor Evaluator',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Wilhelmine',
        unReadChatCount: 0,
        online_status: 'available'
    },
    {
        id: 7,
        name: 'Agilulf Fuxg',
        company: 'ABC Pvt Ltd',
        role: 'Specialist',
        work_email: 'agilulf_fuxg_work@gmil.com',
        personal_email: 'agilulf_fuxg@gmil.com',
        work_phone: '253-418-5940',
        personal_phone: '253-418-5940',
        location: 'Antigua and Barbuda',
        avatar: 'avatar-7.png',
        status: 'Specialist',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Agilulf',
        unReadChatCount: 0,
        online_status: 'available'
    },
    {
        id: 8,
        name: 'Adaline Bergfalks',
        company: 'ABC Pvt Ltd',
        role: 'Shaper',
        work_email: 'adaline_bergfalks_work@gmil.com',
        personal_email: 'adaline_bergfalks@gmil.com',
        work_phone: '253-118-5940',
        personal_phone: '253-118-5940',
        location: 'Argentina',
        avatar: 'avatar-6.png',
        status: 'Shaper',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Adaline',
        unReadChatCount: 0,
        online_status: 'offline'
    },
    {
        id: 9,
        name: 'Eadwulf Beckete',
        company: 'ABC Pvt Ltd',
        role: 'Implementer',
        work_email: 'eadwulf_beckete_work@gmil.com',
        personal_email: 'eadwulf_beckete@gmil.com',
        work_phone: '153-418-5940',
        personal_phone: '153-418-5940',
        location: 'Armenia',
        avatar: 'avatar-1.png',
        status: 'Implementer',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Eadwulf',
        unReadChatCount: 0,
        online_status: 'offline'
    },
    {
        id: 10,
        name: 'Midas',
        company: 'ABC Pvt Ltd',
        role: 'Leader',
        work_email: 'midas_work@gmil.com',
        personal_email: 'midas@gmil.com',
        work_phone: '252-418-5940',
        personal_phone: '252-418-5940',
        location: 'Australia',
        avatar: 'avatar-2.png',
        status: 'Leader',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Midas',
        unReadChatCount: 0,
        online_status: 'offline'
    },
    {
        id: 11,
        name: 'Uranus',
        company: 'ABC Pvt Ltd',
        role: 'Facilitator',
        work_email: 'uranus_work@gmil.com',
        personal_email: 'uranus@gmil.com',
        work_phone: '253-218-5940',
        personal_phone: '253-218-5940',
        location: 'Austria',
        avatar: 'avatar-3.png',
        status: 'Facilitator',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Uranus',
        unReadChatCount: 0,
        online_status: 'available'
    },
    {
        id: 12,
        name: 'Peahen',
        company: 'ABC Pvt Ltd',
        role: 'Coach',
        work_email: 'peahen_work@gmil.com',
        personal_email: 'peahen@gmil.com',
        work_phone: '253-418-1940',
        personal_phone: '253-418-1940',
        location: 'Azerbaijan',
        avatar: 'avatar-4.png',
        status: 'One of the Graces.',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Peahen',
        unReadChatCount: 0,
        online_status: 'do_not_disturb'
    },
    {
        id: 13,
        name: 'Menelaus',
        company: 'ABC Pvt Ltd',
        role: 'Facilitator',
        work_email: 'menelaus_work@gmil.com',
        personal_email: 'menelaus@gmil.com',
        work_phone: '053-418-5940',
        personal_phone: '053-418-5940',
        location: 'Bahamas',
        avatar: 'avatar-5.png',
        status: 'To stay',
        lastMessage: '4/25/2021',
        birthdayText: 'happy Birthday Menelaus',
        unReadChatCount: 0,
        online_status: 'offline'
    }
];

// chat history
const chatHistories = [
    { id: 1, from: 'User1', to: 'Alene', text: text1, time: '11:23 AM' },
    { id: 2, from: 'Alene', to: 'User1', text: text2, time: '11:23 AM' },
    { id: 3, from: 'User1', to: 'Alene', text: text3, time: '11:23 AM' },
    { id: 4, from: 'Alene', to: 'User1', text: text4, time: '11:23 AM' },

    { id: 5, from: 'User1', to: 'Keefe', text: text5, time: '11:24 AM' },
    { id: 6, from: 'Keefe', to: 'User1', text: text6, time: '11:24 AM' },
    { id: 7, from: 'User1', to: 'Keefe', text: text7, time: '11:24 AM' },
    { id: 8, from: 'Keefe', to: 'User1', text: text8, time: '11:24 AM' },

    { id: 9, from: 'User1', to: 'Lazaro', text: text1, time: '11:25 AM' },
    { id: 10, from: 'Lazaro', to: 'User1', text: text2, time: '11:25 AM' },
    { id: 11, from: 'User1', to: 'Lazaro', text: text3, time: '11:25 AM' },
    { id: 12, from: 'Lazaro', to: 'User1', text: text4, time: '11:25 AM' },

    { id: 13, from: 'User1', to: 'Hazle', text: text5, time: '11:26 AM' },
    { id: 14, from: 'Hazle', to: 'User1', text: text6, time: '11:26 AM' },
    { id: 15, from: 'User1', to: 'Hazle', text: text7, time: '11:26 AM' },
    { id: 16, from: 'Hazle', to: 'User1', text: text8, time: '11:26 AM' },

    { id: 17, from: 'User1', to: 'Herman Essertg', text: text1, time: '11:27 AM' },
    { id: 18, from: 'Herman Essertg', to: 'User1', text: text2, time: '11:27 AM' },
    { id: 19, from: 'User1', to: 'Herman Essertg', text: text3, time: '11:27 AM' },
    { id: 20, from: 'Herman Essertg', to: 'User1', text: text4, time: '11:27 AM' },

    { id: 21, from: 'User1', to: 'Wilhelmine Durrg', text: text5, time: '11:28 AM' },
    { id: 22, from: 'Wilhelmine Durrg', to: 'User1', text: text6, time: '11:28 AM' },
    { id: 23, from: 'User1', to: 'Wilhelmine Durrg', text: text7, time: '11:28 AM' },
    { id: 24, from: 'Wilhelmine Durrg', to: 'User1', text: text8, time: '11:28 AM' },

    { id: 25, from: 'User1', to: 'Agilulf Fuxg', text: text1, time: '11:29 AM' },
    { id: 26, from: 'Agilulf Fuxg', to: 'User1', text: text2, time: '11:29 AM' },
    { id: 27, from: 'User1', to: 'Agilulf Fuxg', text: text3, time: '11:29 AM' },
    { id: 28, from: 'Agilulf Fuxg', to: 'User1', text: text4, time: '11:29 AM' },

    { id: 29, from: 'User1', to: 'Adaline Bergfalks', text: text5, time: '11:30 AM' },
    { id: 30, from: 'Adaline Bergfalks', to: 'User1', text: text6, time: '11:30 AM' },
    { id: 31, from: 'User1', to: 'Adaline Bergfalks', text: text7, time: '11:30 AM' },
    { id: 32, from: 'Adaline Bergfalks', to: 'User1', text: text8, time: '11:30 AM' },

    { id: 33, from: 'User1', to: 'Eadwulf Beckete', text: text1, time: '11:31 AM' },
    { id: 34, from: 'Eadwulf Beckete', to: 'User1', text: text2, time: '11:31 AM' },
    { id: 35, from: 'User1', to: 'Eadwulf Beckete', text: text3, time: '11:31 AM' },
    { id: 36, from: 'Eadwulf Beckete', to: 'User1', text: text4, time: '11:31 AM' },

    { id: 37, from: 'User1', to: 'Midas', text: text5, time: '11:32 AM' },
    { id: 38, from: 'Midas', to: 'User1', text: text6, time: '11:32 AM' },
    { id: 39, from: 'User1', to: 'Midas', text: text7, time: '11:32 AM' },
    { id: 40, from: 'Midas', to: 'User1', text: text8, time: '11:32 AM' },

    { id: 41, from: 'User1', to: 'Uranus', text: text1, time: '11:33 AM' },
    { id: 42, from: 'Uranus', to: 'User1', text: text2, time: '11:33 AM' },
    { id: 43, from: 'User1', to: 'Uranus', text: text3, time: '11:33 AM' },
    { id: 44, from: 'Uranus', to: 'User1', text: text4, time: '11:33 AM' },

    { id: 45, from: 'User1', to: 'Peahen', text: text5, time: '11:34 AM' },
    { id: 46, from: 'Peahen', to: 'User1', text: text6, time: '11:34 AM' },
    { id: 47, from: 'User1', to: 'Peahen', text: text7, time: '11:34 AM' },
    { id: 48, from: 'Peahen', to: 'User1', text: text8, time: '11:34 AM' },

    { id: 49, from: 'User1', to: 'Menelaus', text: text1, time: '11:35 AM' },
    { id: 50, from: 'Menelaus', to: 'User1', text: text2, time: '11:35 AM' },
    { id: 51, from: 'User1', to: 'Menelaus', text: text3, time: '11:35 AM' },
    { id: 52, from: 'Menelaus', to: 'User1', text: text4, time: '11:35 AM' }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/chat/users').reply(200, { users });

services.onPost('/api/chat/users/id').reply((config) => {
    try {
        const { id } = JSON.parse(config.data);
        const index = users.findIndex((x) => x.id === id);
        return [200, users[index]];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/chat/filter').reply(async (config) => {
    try {
        const { user } = JSON.parse(config.data);
        const result = chatHistories.filter((item) => item.from === user || item.to === user);
        return [200, result];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/chat/insert').reply((config) => {
    try {
        const { from, to, text, time } = JSON.parse(config.data);
        const result = chatHistories.push({ from, to, text, time });
        return [200, result];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/chat/users/modify').reply((config) => {
    try {
        const user = JSON.parse(config.data);
        if (user.id) {
            const index = users.findIndex((u) => u.id === user.id);
            if (index > -1) {
                users[index] = { ...users[index], ...user };
            }
        } else {
            users.push({ ...user, id: users.length + 1 });
        }
        return [200, []];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});
