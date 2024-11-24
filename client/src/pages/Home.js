import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Divider,
  Box,
  IconButton,
  TextField,
  Button,
  CircularProgress,
  Badge,
  Chip,
} from '@mui/material';
import {
  Message as MessageIcon,
  Send as SendIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useAuth } from '../hooks/useAuth';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [recentChats, setRecentChats] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulated data - replace with actual API calls
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setRecentChats([
          {
            id: 1,
            name: 'Alice',
            lastMessage: 'Hey, how are you?',
            timestamp: '2 min ago',
            unread: 2,
            avatar: '',
            online: true,
          },
          {
            id: 2,
            name: 'Blockchain Dev Group',
            lastMessage: 'New smart contract deployed!',
            timestamp: '1 hour ago',
            unread: 5,
            isGroup: true,
            avatar: '',
            online: true,
          },
          {
            id: 3,
            name: 'Bob',
            lastMessage: "Let's discuss the project",
            timestamp: '2 hours ago',
            unread: 0,
            avatar: '',
            online: false,
          },
        ]);

        setOnlineFriends([
          { id: 1, name: 'Alice', avatar: '', walletAddress: '0x123...456' },
          { id: 4, name: 'Charlie', avatar: '', walletAddress: '0x789...012' },
          { id: 5, name: 'David', avatar: '', walletAddress: '0x345...678' },
        ]);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChatClick = (chatId, isGroup) => {
    navigate(isGroup ? `/group-chat/${chatId}` : `/direct-message/${chatId}`);
  };

  const handleNewChat = () => {
    navigate('/friends');
  };

  const handleNewGroup = () => {
    navigate('/create-group');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 64px)', // Subtract navbar height
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ mt: 4, mb: 4, height: 'calc(100vh - 128px)' }}>
      <Grid container spacing={3} sx={{ height: '100%' }}>
        {/* Left Sidebar - Recent Chats */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Recent Chats</Typography>
              <Box>
                <IconButton color="primary" onClick={handleNewChat}>
                  <PersonIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleNewGroup}>
                  <GroupIcon />
                </IconButton>
              </Box>
            </Box>
            <List sx={{ overflow: 'auto', flexGrow: 1 }}>
              {recentChats.map((chat, index) => (
                <React.Fragment key={chat.id}>
                  <ListItem
                    button
                    onClick={() => handleChatClick(chat.id, chat.isGroup)}
                    sx={{ py: 2 }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color={chat.online ? 'success' : 'error'}
                      >
                        <Avatar src={chat.avatar}>
                          {chat.isGroup ? <GroupIcon /> : chat.name[0]}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="subtitle1" component="span">
                            {chat.name}
                          </Typography>
                          {chat.isGroup && (
                            <Chip
                              size="small"
                              label="Group"
                              sx={{ ml: 1 }}
                              color="primary"
                              variant="outlined"
                            />
                          )}
                        </Box>
                      }
                      secondary={
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {chat.lastMessage}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Typography variant="caption" color="text.secondary">
                          {chat.timestamp}
                        </Typography>
                        {chat.unread > 0 && (
                          <Chip
                            size="small"
                            label={chat.unread}
                            color="primary"
                            sx={{ mt: 0.5, height: 20, minWidth: 20 }}
                          />
                        )}
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  {index < recentChats.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              p: 4,
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
            }}
          >
            <Box sx={{ textAlign: 'center', maxWidth: 600 }}>
              <Typography variant="h4" gutterBottom>
                Welcome to DecentralChat
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                Start a new conversation or continue where you left off. Your messages are secure and decentralized.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  startIcon={<PersonIcon />}
                  onClick={handleNewChat}
                  sx={{ mr: 2 }}
                >
                  New Chat
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<GroupIcon />}
                  onClick={handleNewGroup}
                >
                  Create Group
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Sidebar - Online Friends */}
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                p: 2,
                borderBottom: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Typography variant="h6">Online Friends</Typography>
              <IconButton color="primary" onClick={() => navigate('/friends')}>
                <AddIcon />
              </IconButton>
            </Box>
            <List sx={{ overflow: 'auto', flexGrow: 1 }}>
              {onlineFriends.map((friend, index) => (
                <React.Fragment key={friend.id}>
                  <ListItem button onClick={() => handleChatClick(friend.id, false)}>
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                        color="success"
                      >
                        <Avatar src={friend.avatar}>{friend.name[0]}</Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.name}
                      secondary={
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {friend.walletAddress}
                        </Typography>
                      }
                    />
                    <IconButton edge="end" onClick={() => handleChatClick(friend.id, false)}>
                      <MessageIcon />
                    </IconButton>
                  </ListItem>
                  {index < onlineFriends.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
