import React, { useState } from 'react';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Box,
    CardContent,
    ClickAwayListener,
    Divider,
    Grid,
    IconButton,
    Menu,
    MenuItem,
    Popper,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';
import Picker, { SKIN_TONE_MEDIUM_DARK } from 'emoji-picker-react';

// project imports
import UserDetails from './UserDetails';
import ChatDrawer from './ChatDrawer';
import ChartHistory from './ChartHistory';
import AvatarStatus from './AvatarStatus';
import { openDrawer } from 'store/slices/menu';
import MainCard from 'ui-component/cards/MainCard';
import Avatar from 'ui-component/extended/Avatar';
import { appDrawerWidth as drawerWidth, gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getUser, getUserChats, insertChat } from 'store/slices/chat';

// assets
import AttachmentTwoToneIcon from '@mui/icons-material/AttachmentTwoTone';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import VideoCallTwoToneIcon from '@mui/icons-material/VideoCallTwoTone';
import CallTwoToneIcon from '@mui/icons-material/CallTwoTone';
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone';
import MoodTwoToneIcon from '@mui/icons-material/MoodTwoTone';
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';

const avatarImage = require.context('assets/images/users', true);

// drawer content element
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    paddingLeft: open ? theme.spacing(3) : 0,
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
    }),
    marginLeft: `-${drawerWidth}px`,
    [theme.breakpoints.down('lg')]: {
        paddingLeft: 0,
        marginLeft: 0
    },
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.shorter
        }),
        marginLeft: 0
    })
}));

// ==============================|| APPLICATION CHAT ||============================== //

const ChatMainPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('lg'));

    const dispatch = useDispatch();

    // handle right sidebar dropdown menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClickSort = (event) => {
        setAnchorEl(event?.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    // set chat details page open when user is selected from sidebar
    const [emailDetails, setEmailDetails] = React.useState(false);
    const handleUserChange = () => {
        setEmailDetails((prev) => !prev);
    };

    // toggle sidebar
    const [openChatDrawer, setOpenChatDrawer] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpenChatDrawer((prevState) => !prevState);
    };

    // close sidebar when widow size below 'md' breakpoint
    React.useEffect(() => {
        setOpenChatDrawer(!matchDownSM);
    }, [matchDownSM]);

    const [user, setUser] = useState({});
    const [data, setData] = React.useState([]);
    const chatState = useSelector((state) => state.chat);

    React.useEffect(() => {
        setUser(chatState.user);
    }, [chatState.user]);

    React.useEffect(() => {
        setData(chatState.chats);
    }, [chatState.chats]);

    React.useEffect(() => {
        // hide left drawer when email app opens
        dispatch(openDrawer(false));
        dispatch(getUser(1));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        dispatch(getUserChats(user.name));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    // handle new message form
    const [message, setMessage] = useState('');
    const handleOnSend = () => {
        const d = new Date();
        setMessage('');
        const newMessage = {
            from: 'User1',
            to: user.name,
            text: message,
            time: d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setData((prevState) => [...prevState, newMessage]);
        dispatch(insertChat(newMessage));
    };

    const handleEnter = (event) => {
        if (event?.key !== 'Enter') {
            return;
        }
        handleOnSend();
    };

    // handle emoji
    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji);
    };

    const [anchorElEmoji, setAnchorElEmoji] = React.useState(); /** No single type can cater for all elements */
    const handleOnEmojiButtonClick = (event) => {
        setAnchorElEmoji(anchorElEmoji ? null : event?.currentTarget);
    };

    const emojiOpen = Boolean(anchorElEmoji);
    const emojiId = emojiOpen ? 'simple-popper' : undefined;
    const handleCloseEmoji = () => {
        setAnchorElEmoji(null);
    };

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Box sx={{ display: 'flex' }}>
            <ChatDrawer openChatDrawer={openChatDrawer} handleDrawerOpen={handleDrawerOpen} setUser={setUser} />
            <Main theme={theme} open={openChatDrawer}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs zeroMinWidth sx={{ display: emailDetails ? { xs: 'none', sm: 'flex' } : 'flex' }}>
                        <MainCard
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? 'dark.main' : 'grey.50'
                            }}
                        >
                            <Grid container spacing={gridSpacing}>
                                <Grid item xs={12}>
                                    <Grid container alignItems="center" spacing={0.5}>
                                        <Grid item>
                                            <IconButton onClick={handleDrawerOpen} size="large">
                                                <MenuRoundedIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Grid container spacing={2} alignItems="center" sx={{ flexWrap: 'nowrap' }}>
                                                <Grid item>
                                                    <Avatar alt={user.name} src={user.avatar && avatarImage(`./${user.avatar}`).default} />
                                                </Grid>
                                                <Grid item sm zeroMinWidth>
                                                    <Grid container spacing={0} alignItems="center">
                                                        <Grid item xs={12}>
                                                            <Typography variant="h4" component="div">
                                                                {user.name}{' '}
                                                                {user.online_status && <AvatarStatus status={user.online_status} />}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography variant="subtitle2">Last seen {user.lastMessage}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item sm zeroMinWidth />
                                        <Grid item>
                                            <IconButton size="large">
                                                <CallTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="large">
                                                <VideoCallTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleUserChange} size="large">
                                                <ErrorTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton onClick={handleClickSort} size="large">
                                                <MoreHorizTwoToneIcon />
                                            </IconButton>
                                            <Menu
                                                id="simple-menu"
                                                anchorEl={anchorEl}
                                                keepMounted
                                                open={Boolean(anchorEl)}
                                                onClose={handleCloseSort}
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right'
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right'
                                                }}
                                            >
                                                <MenuItem onClick={handleCloseSort}>Name</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Date</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Ratting</MenuItem>
                                                <MenuItem onClick={handleCloseSort}>Unread</MenuItem>
                                            </Menu>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ mt: theme.spacing(2) }} />
                                </Grid>
                                <PerfectScrollbar
                                    style={{ width: '100%', height: 'calc(100vh - 440px)', overflowX: 'hidden', minHeight: 525 }}
                                >
                                    <CardContent>
                                        <ChartHistory
                                            theme={theme}
                                            handleUserDetails={handleUserChange}
                                            handleDrawerOpen={handleDrawerOpen}
                                            user={user}
                                            data={data}
                                        />
                                    </CardContent>
                                </PerfectScrollbar>
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="center">
                                        <Grid item>
                                            <IconButton
                                                ref={anchorElEmoji}
                                                aria-describedby={emojiId}
                                                onClick={handleOnEmojiButtonClick}
                                                size="large"
                                            >
                                                <MoodTwoToneIcon />
                                            </IconButton>
                                            <Popper
                                                id={emojiId}
                                                open={emojiOpen}
                                                anchorEl={anchorElEmoji}
                                                disablePortal
                                                popperOptions={{
                                                    modifiers: [
                                                        {
                                                            name: 'offset',
                                                            options: {
                                                                offset: [-20, 20]
                                                            }
                                                        }
                                                    ]
                                                }}
                                            >
                                                <ClickAwayListener onClickAway={handleCloseEmoji}>
                                                    <>
                                                        {emojiOpen && (
                                                            <MainCard elevation={8} content={false}>
                                                                <Picker
                                                                    onEmojiClick={onEmojiClick}
                                                                    skinTone={SKIN_TONE_MEDIUM_DARK}
                                                                    disableAutoFocus
                                                                />
                                                            </MainCard>
                                                        )}
                                                    </>
                                                </ClickAwayListener>
                                            </Popper>
                                        </Grid>
                                        <Grid item xs zeroMinWidth>
                                            <TextField
                                                fullWidth
                                                label="Type a Message"
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                onKeyPress={handleEnter}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <IconButton size="large">
                                                <AttachmentTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <IconButton color="primary" onClick={handleOnSend} size="large">
                                                <SendTwoToneIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </MainCard>
                    </Grid>
                    {emailDetails && (
                        <Grid item sx={{ margin: { xs: '0 auto', md: 'initial' } }}>
                            <Box sx={{ display: { xs: 'block', sm: 'none', textAlign: 'right' } }}>
                                <IconButton onClick={handleUserChange} sx={{ mb: -5 }} size="large">
                                    <HighlightOffTwoToneIcon />
                                </IconButton>
                            </Box>
                            <UserDetails user={user} />
                        </Grid>
                    )}
                </Grid>
            </Main>
        </Box>
    );
};

export default ChatMainPage;
