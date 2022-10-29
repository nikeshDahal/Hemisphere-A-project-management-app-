// project imports
import services from 'utils/mockAdapter';

const customers = [
    { name: 'Joseph William 1', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 1 },
    { name: 'Ashy Handgun 2', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 2 },
    { name: 'Larry Doe 3', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 2 },
    { name: 'Sara Soudan 4', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 3 },
    { name: 'Joseph William 5', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 1 },
    { name: 'Aisha Handgun 6', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 3 },
    { name: 'Larky Doe 7', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 2 },
    { name: 'Sara Soupier 8', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 1 },
    { name: 'Joseph William 9', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 3 },
    { name: 'Anshan Handgun 10', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 1 },
    { name: 'Lardy Doe 11', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 1 },
    { name: 'Sara Soudan 12', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 3 },
    { name: 'Joseph William 13', email: 'Joseph@mail.com', location: 'Hong Kong, China', orders: 263, date: '12.07.2018', status: 2 },
    { name: 'Ashy Handgun 14', email: 'Akshay@mail.com', location: 'New York, USA', orders: 750, date: '12.07.2018', status: 2 },
    { name: 'Lars Doe 15', email: 'larry@mail.com', location: 'Hong Kong, China', orders: 1120, date: '12.07.2018', status: 1 },
    { name: 'Sara Souvenir 16', email: 'Sara@mail.com', location: 'New York, USA', orders: 975, date: '12.07.2018', status: 2 }
];

const orders = [
    { id: '790841', name: 'Joseph William 1', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 3 },
    { id: '790842', name: 'Anshan Handgun 2', company: 'Toronto', type: 'Paytm', qty: 5000, date: '12.07.2018', status: 2 },
    { id: '798699', name: 'Larry Doe 3', company: 'Toronto', type: 'Net Banking', qty: 2500, date: '12.07.2018', status: 1 },
    { id: '790752', name: 'Sara Soudan 4', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 1 },
    { id: '790955', name: 'Joseph William 5', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 2 },
    { id: '790785', name: 'Anshan Handgun 6', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 3 },
    { id: '800837', name: 'Larry Doe 7', company: 'Toronto', type: 'Paytm', qty: 2500, date: '12.07.2018', status: 3 },
    { id: '810365', name: 'Sara Soudan 8', company: 'Toronto', type: 'Net Banking', qty: 5000, date: '12.07.2018', status: 2 },
    { id: '810814', name: 'Sara Soudan 20', company: 'Toronto', type: 'Upi', qty: 2500, date: '12.07.2018', status: 1 },
    { id: '820385', name: 'Joseph William 9', company: 'Toronto', type: 'Net Banking', qty: 5000, date: '12.07.2018', status: 1 },
    { id: '820885', name: 'Anshan Handgun 10', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 1 },
    { id: '830390', name: 'Larry Doe 11', company: 'Toronto', type: 'Paytm', qty: 5000, date: '12.07.2018', status: 2 },
    { id: '830879', name: 'Sara Soudan 12', company: 'Toronto', type: 'Upi', qty: 2500, date: '12.07.2018', status: 3 },
    { id: '900111', name: 'Joseph William 13', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 3 },
    { id: '900836', name: 'Anshan Handgun 14', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 2 },
    { id: '900112', name: 'Larry Doe 15', company: 'Toronto', type: 'Paytm', qty: 5000, date: '12.07.2018', status: 2 },
    { id: '900871', name: 'Sara Soudan 16', company: 'Toronto', type: 'Upi', qty: 2500, date: '12.07.2018', status: 1 },
    { id: '910232', name: 'Joseph William 17', company: 'Toronto', type: 'Upi', qty: 5000, date: '12.07.2018', status: 2 },
    { id: '910886', name: 'Anshan Handgun 18', company: 'Toronto', type: 'Credit Card', qty: 2500, date: '12.07.2018', status: 3 },
    { id: '910232', name: 'Larry Doe 19', company: 'Toronto', type: 'Net Banking', qty: 5000, date: '12.07.2018', status: 2 }
];

const products = [
    { id: '790841', name: 'Samsung TV 32” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '790842', name: 'Iphone 11 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '798699', name: 'Samsung TV 34” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '790752', name: 'Iphone 12 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '790955', name: 'Samsung TV 36” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '790785', name: 'Iphone 13 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '800837', name: 'Samsung TV 38” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '810365', name: 'Iphone 14 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '810814', name: 'Samsung TV 40” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '820385', name: 'Iphone 15 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '820885', name: 'Samsung TV 42” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '830390', name: 'Iphone 16 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '830879', name: 'Samsung TV 44” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '900111', name: 'Iphone 17 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '900836', name: 'Samsung TV 46” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '900112', name: 'Iphone 18 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '900871', name: 'Samsung TV 48” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '910232', name: 'Iphone 19 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 },
    { id: '910886', name: 'Samsung TV 50” LED Retina', category: 'Television', price: 2500, date: '12.07.2018', qty: 5 },
    { id: '910232', name: 'Iphone 20 Pro Max', category: 'Television', price: 5000, date: '12.07.2018', qty: 2 }
];

const productreviews = [
    {
        name: 'Apple Watch Series 1',
        author: 'Joseph William',
        review: 'The Series 4 is a significant step...',
        rating: 3.5,
        date: '12.07.2018',
        status: 1
    },
    {
        name: 'Apple X2 2',
        author: 'Anshan Handgun',
        review: 'The Series 4 is a significant step...',
        rating: 5.0,
        date: '12.07.2018',
        status: 2
    },
    {
        name: 'Apple Watch Series 3',
        author: 'Larry Doe',
        review: 'The Series 4 is a significant step...',
        rating: 4.5,
        date: '12.07.2018',
        status: 2
    },
    {
        name: 'Apple Watch Series 4',
        author: 'Joseph William',
        review: 'The Series 4 is a significant step...',
        rating: 3.0,
        date: '12.07.2018',
        status: 3
    },
    {
        name: 'Apple X2 5',
        author: 'Anshan Handgun',
        review: 'The Series 4 is a significant step...',
        rating: 2.0,
        date: '12.07.2018',
        status: 2
    },
    {
        name: 'Apple X2 6',
        author: 'Larry Doe',
        review: 'The Series 4 is a significant step...',
        rating: 2.5,
        date: '12.07.2018',
        status: 1
    },
    {
        name: 'Apple Watch Series 7',
        author: 'Joseph William',
        review: 'The Series 4 is a significant step...',
        rating: 4.0,
        date: '12.07.2018',
        status: 3
    },
    {
        name: 'Apple X2 8',
        author: 'Anshan Handgun',
        review: 'The Series 4 is a significant step...',
        rating: 5.0,
        date: '12.07.2018',
        status: 3
    },
    {
        name: 'Apple Watch Series 9',
        author: 'Larry Doe',
        review: 'The Series 4 is a significant step...',
        rating: 4.0,
        date: '12.07.2018',
        status: 1
    },
    {
        name: 'Apple Watch Series 10',
        author: 'Joseph William',
        review: 'The Series 4 is a significant step...',
        rating: 3.5,
        date: '12.07.2018',
        status: 2
    },
    {
        name: 'Apple X2 11',
        author: 'Anshan Handgun',
        review: 'The Series 4 is a significant step...',
        rating: 1.0,
        date: '12.07.2018',
        status: 1
    },
    {
        name: 'Apple X2 12',
        author: 'Larry Doe',
        review: 'The Series 4 is a significant step...',
        rating: 1.5,
        date: '12.07.2018',
        status: 1
    },
    {
        name: 'Apple Watch Series 13',
        author: 'Joseph William',
        review: 'The Series 4 is a significant step...',
        rating: 2.5,
        date: '12.07.2018',
        status: 3
    },
    {
        name: 'Apple X2 14',
        author: 'Anshan Handgun',
        review: 'The Series 4 is a significant step...',
        rating: 5.0,
        date: '12.07.2018',
        status: 1
    },
    {
        name: 'Apple Watch Series 15',
        author: 'Larry Doe',
        review: 'The Series 4 is a significant step...',
        rating: 4.0,
        date: '12.07.2018',
        status: 2
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/customer/list').reply(200, { customers });

services.onGet('/api/customer/order/list').reply(200, { orders });

services.onGet('/api/customer/product/list').reply(200, { products });

services.onGet('/api/customer/product/reviews').reply(200, { productreviews });
