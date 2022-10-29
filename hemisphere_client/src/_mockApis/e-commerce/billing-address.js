// project imports
import services from 'utils/mockAdapter';

// third-party
import { Chance } from 'chance';
import { v4 as UIDV4 } from 'uuid';

const chance = new Chance();

// billing address list
let address = [
    {
        id: 1,
        name: chance.name(),
        destination: 'home',
        building: chance.address({ short_suffix: true }),
        street: chance.address({ short_suffix: false }),
        city: chance.city(),
        state: chance.state({ full: true }),
        country: chance.country({ full: true }),
        post: chance.postcode(),
        phone: chance.phone(),
        isDefault: true
    },
    {
        id: 2,
        name: chance.name(),
        destination: 'office',
        building: chance.address({ short_suffix: true }),
        street: chance.address({ short_suffix: false }),
        city: chance.city(),
        state: chance.state({ full: true }),
        country: chance.country({ full: true }),
        post: chance.postcode(),
        phone: chance.phone(),
        isDefault: false
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/address/list').reply(200, { address });

services.onPost('/api/address/new').reply((request) => {
    try {
        const data = JSON.parse(request.data);
        const { name, destination, building, street, city, state, country, post, phone, isDefault } = data;
        const newAddress = {
            id: UIDV4(),
            name,
            destination,
            building,
            street,
            city,
            state,
            country,
            post,
            phone,
            isDefault
        };

        if (isDefault) {
            address = address.map((item) => {
                if (item.isDefault === true) {
                    return { ...item, isDefault: false };
                }
                return item;
            });
        }

        address = [...address, newAddress];

        return [200, { address }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/address/edit').reply((request) => {
    try {
        const data = JSON.parse(request.data);

        if (data.isDefault) {
            address = address.map((item) => {
                if (item.isDefault === true) {
                    return { ...item, isDefault: false };
                }
                return item;
            });
        }

        address = address.map((item) => {
            if (item.id === data.id) {
                return data;
            }
            return item;
        });

        return [200, { address }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});
