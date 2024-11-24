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
  Badge,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const DirectMessage = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages] = useState([]); // This will be replaced with actual messages from your backend

  // Mock user data - replace with actual user data from your backend
  const [recipient] = useState({
    username: 'User ' + userId,
    walletAddress: '0x...' + userId,
    avatar: '',
    online: true,
  });

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
          {/* Chat Header */}
          <Box
            sx={{
              p: 2,
              borderBottom: 1,
              borderColor: 'divider',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
              color={recipient.online ? 'success' : 'error'}
            >
              <Avatar src={recipient.avatar} sx={{ mr: 2 }} />
            </Badge>
            <Box>
              <Typography variant="h6">{recipient.username}</Typography>
              <Typography variant="caption" color="text.secondary">
                {recipient.walletAddress}
              </Typography>
            </Box>
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
                      <Avatar
                        src={msg.sender === user?.walletAddress ? user?.avatar : recipient.avatar}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={msg.sender === user?.walletAddress ? 'You' : recipient.username}
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

export default DirectMessage;
