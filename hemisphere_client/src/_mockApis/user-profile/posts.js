// project imports
import services from 'utils/mockAdapter';

// assets
import image1 from 'assets/images/profile/img-profile1.png';
import image2 from 'assets/images/profile/img-profile2.jpg';
import image4 from 'assets/images/profile/img-profile4.jpg';

// social profile
let posts = [
    {
        id: '#4POST_JONE_DOE',
        profile: {
            id: '#52JONE_DOE',
            avatar: 'img-user.png',
            name: 'John Doe',
            time: 'now'
        },
        data: {
            content: `Laboris non ad et aute sint aliquip mollit voluptate velit dolore magna fugiat ex.
            \n   Commodo amet veniam nostrud mollit quis sint qui nulla elit esse excepteur ullamco esse magna. Nisi duis aute est in mollit irure enim tempor in.`,
            images: [],
            likes: {
                like: false,
                value: 0
            },
            comments: []
        }
    },
    {
        id: '#1POST_JONE_DOE',
        profile: {
            id: '#52JONE_DOE',
            avatar: 'user-1.png',
            name: 'John Doe',
            time: '15 min ago'
        },
        data: {
            content:
                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. There are many variations of passages.',
            images: [
                {
                    img: image1,
                    featured: true
                }
            ],
            likes: {
                like: true,
                value: 102
            },
            comments: [
                {
                    id: '#3COMMENT_JONE_DOE',
                    profile: {
                        id: '#52JONE_DOE',
                        avatar: 'user-3.png',
                        name: 'Barney Thea',
                        time: '8 min ago '
                    },
                    data: {
                        comment: 'It is a long established fact that a reader will be distracted by the readable content of a page.',
                        likes: {
                            like: true,
                            value: 55
                        }
                    }
                },
                {
                    id: '#2COMMENT_JONE_DOE',
                    profile: {
                        id: '#52JONE_DOE',
                        avatar: 'user-4.png',
                        name: 'Maddison Wilber',
                        time: '5 min ago '
                    },
                    data: {
                        comment:
                            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.There are many variations of passages.',
                        likes: {
                            like: false,
                            value: 68
                        },
                        replies: [
                            {
                                id: '#1REPLY_JONE_DOE',
                                profile: {
                                    id: '#52JONE_DOE',
                                    avatar: 'user-5.png',
                                    name: 'John Doe',
                                    time: 'just now '
                                },
                                data: {
                                    comment: 'It is a long established fact that a reader will be distracted by the readable content.',
                                    likes: {
                                        like: true,
                                        value: 10
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    },
    {
        id: '#2POST_JONE_DOE',
        profile: {
            id: '#52JONE_DOE',
            avatar: 'user-2.png',
            name: 'John Doe',
            time: '15 min ago '
        },
        data: {
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page',
            images: [
                {
                    img: image2,
                    title: 'Image Title'
                },
                {
                    img: image4,
                    title: 'Painter'
                }
            ],
            likes: {
                like: false,
                value: 150
            },
            comments: [
                {
                    id: '#2COMMENT_JONE_DOE',
                    profile: {
                        id: '#52JONE_DOE',
                        avatar: 'user-3.png',
                        name: 'Barney Thea',
                        time: '15 min ago '
                    },
                    data: {
                        comment:
                            'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                        likes: {
                            like: true,
                            value: 65
                        },
                        replies: []
                    }
                }
            ]
        }
    },
    {
        id: '#3POST_JONE_DOE',
        profile: {
            id: '#52JONE_DOE',
            avatar: 'img-user.png',
            name: 'John Doe',
            time: '15 min ago '
        },
        data: {
            content: 'It is a long established fact that a reader will be distracted by the readable content of a page',
            images: [],
            video: 'vyJU9efvUtQ',
            likes: {
                like: true,
                value: 540
            }
        }
    }
];

// ==============================|| MOCK SERVICES ||============================== //

services.onGet('/api/posts/list').reply(200, { posts });

services.onPost('/api/posts/editComment').reply((config) => {
    try {
        const { key, id } = JSON.parse(config.data);

        posts = posts.filter((post) => {
            if (post.id === key) {
                const cComments = post.data.comments || [];
                post.data.comments = [id, ...cComments];
                return post;
            }
            return post;
        });

        return [200, { posts }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/comments/add').reply((config) => {
    try {
        const { postId, comment } = JSON.parse(config.data);

        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = posts[postIndex];
        const cComments = post.data.comments || [];
        post.data.comments = [comment, ...cComments];

        return [200, { posts: [...posts] }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/replies/add').reply((config) => {
    try {
        const { postId, commentId, reply } = JSON.parse(config.data);
        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = posts[postIndex];
        const cComments = post.data.comments || [];
        const commentIndex = cComments.findIndex((x) => x.id === commentId);
        const comment = cComments[commentIndex];
        /** comment.data.replies has to be defined */
        if (comment && comment.data && comment.data.replies) comment.data.replies = [...comment.data.replies, reply];
        return [200, { posts: [...posts] }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/posts/list/like').reply((config) => {
    try {
        const { postId } = JSON.parse(config.data);
        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = { ...posts[postIndex] };
        post.data = { ...post.data };
        post.data.likes = { ...post.data.likes };
        post.data.likes.like = !post.data.likes.like;
        post.data.likes.value = post.data.likes.like ? post.data.likes.value + 1 : post.data.likes.value - 1;
        posts[postIndex] = post;
        return [200, { posts: [...posts] }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/comments/list/like').reply((config) => {
    try {
        const { postId, commentId } = JSON.parse(config.data);
        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = posts[postIndex];
        const cComments = post.data.comments || [];
        const commentIndex = cComments.findIndex((x) => x.id === commentId);
        const comment = { ...cComments[commentIndex] };
        /** comment.data.likes has to be defined  */
        if (comment && comment.data && comment.data.likes) comment.data.likes.like = !comment.data.likes.like;
        if (comment && comment.data && comment.data.likes)
            comment.data.likes.value = comment.data.likes.like ? comment.data.likes.value + 1 : comment.data.likes.value - 1;
        if (post && post.data && post.data.comments) post.data.comments[commentIndex] = comment;
        return [200, { posts: [...posts] }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});

services.onPost('/api/replies/list/like').reply((config) => {
    try {
        const { postId, commentId, replayId } = JSON.parse(config.data);
        const postIndex = posts.findIndex((x) => x.id === postId);
        const post = posts[postIndex];
        const cComments = post.data.comments || [];
        const commentIndex = cComments.findIndex((x) => x.id === commentId);
        const comment = { ...cComments[commentIndex] };
        const replayIndex = comment?.data?.replies?.findIndex((x) => x.id === replayId);
        if (replayIndex !== undefined) {
            if (comment && comment.data && comment.data.replies) {
                const reply = { ...comment.data.replies[replayIndex] };
                if (reply && reply.data && reply.data.likes) {
                    reply.data.likes.like = !reply.data.likes.like;
                    reply.data.likes.value = reply.data.likes.like ? reply.data.likes.value + 1 : reply.data.likes.value - 1;
                }
                comment.data.replies[replayIndex] = reply;
                if (post && post.data && post.data.comments) post.data.comments[commentIndex] = comment;
            }
        }
        return [200, { posts: [...posts] }];
    } catch (err) {
        console.error(err);
        return [500, { message: 'Internal server error' }];
    }
});
