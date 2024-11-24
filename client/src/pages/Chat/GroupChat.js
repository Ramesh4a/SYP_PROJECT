import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  AvatarGroup,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Send as SendIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  ExitToApp as ExitToAppIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const GroupChat = () => {
  const { groupId } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages] = useState([]); // This will be replaced with actual messages from your backend
  const [anchorEl, setAnchorEl] = useState(null);

  // Mock group data - replace with actual group data from your backend
  const [group] = useState({
    name: 'Group ' + groupId,
    description: 'A blockchain discussion group',
    members: [
      { id: 1, username: 'User 1', avatar: '' },
      { id: 2, username: 'User 2', avatar: '' },
      { id: 3, username: 'User 3', avatar: '' },
    ],
  });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      // Here you would typically:
      // 1. Sign the message with the user's wallet
      // 2. Send the signed message to your smart contract
      // 3. Update the UI with the new message
      
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
          {/* Group Chat Header */}
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AvatarGroup max={3} sx={{ mr: 2 }}>
                {group.members.map((member) => (
                  <Avatar key={member.id} src={member.avatar}>
                    {member.username[0]}
                  </Avatar>
                ))}
              </AvatarGroup>
              <Box>
                <Typography variant="h6">{group.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {group.members.length} members
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <PersonAddIcon fontSize="small" />
                </ListItemIcon>
                Add Member
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Group Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                <ListItemIcon>
                  <ExitToAppIcon fontSize="small" color="error" />
                </ListItemIcon>
                Leave Group
              </MenuItem>
            </Menu>
          </Box>

          {/* Messages List */}
          <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
            <List>
              {messages.map((msg, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    alignItems="flex-start"
                    sx={{
                      flexDirection: msg.sender === user?.walletAddress ? 'row-reverse' : 'row',
                    }}
                  >
                    <ListItemAvatar>
                      <Avatar src={msg.avatar}>{msg.senderName[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.sender === user?.walletAddress ? 'You' : msg.senderName}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {msg.content}
                          </Typography>
                          <Typography
                            component="span"
                            variant="caption"
                            sx={{ display: 'block' }}
                          >
                            {new Date(msg.timestamp).toLocaleString()}
                          </Typography>
                        </React.Fragment>
                      }
                      sx={{
                        textAlign: msg.sender === user?.walletAddress ? 'right' : 'left',
                      }}
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Message Input */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              borderTop: 1,
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              fullWidth
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ mr: 1 }}
            />
            <IconButton type="submit" color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default GroupChat;
