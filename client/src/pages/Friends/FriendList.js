import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Badge,
  Divider,
  Alert,
} from '@mui/material';
import {
  Message as MessageIcon,
  PersonAdd as PersonAddIcon,
  PersonRemove as PersonRemoveIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const FriendList = () => {
  const navigate = useNavigate();
  const { user, signMessage } = useAuth();
  const [openAddFriend, setOpenAddFriend] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Mock friends data - replace with actual friends data from your backend
  const [friends] = useState([
    {
      id: 1,
      username: 'Alice',
      walletAddress: '0x123...456',
      avatar: '',
      online: true,
    },
    {
      id: 2,
      username: 'Bob',
      walletAddress: '0x789...012',
      avatar: '',
      online: false,
    },
  ]);

  const handleAddFriend = async () => {
    try {
      setError('');
      if (!walletAddress) {
        setError('Please enter a wallet address');
        return;
      }

      // Sign message to verify ownership
      await signMessage('Add friend confirmation');

      // Here you would typically:
      // 1. Validate the wallet address
      // 2. Send a friend request through your smart contract
      // 3. Update the UI

      setSuccess('Friend request sent successfully!');
      setWalletAddress('');
      setOpenAddFriend(false);
    } catch (err) {
      setError(err.message || 'Failed to send friend request');
    }
  };

  const handleRemoveFriend = async (friendId) => {
    try {
      // Here you would typically:
      // 1. Sign a message to verify ownership
      // 2. Remove friend through your smart contract
      // 3. Update the UI
      
      setSuccess('Friend removed successfully!');
    } catch (err) {
      setError(err.message || 'Failed to remove friend');
    }
  };

  const handleMessage = (friendId) => {
    navigate(`/direct-message/${friendId}`);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Friends
          </Typography>
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => setOpenAddFriend(true)}
          >
            Add Friend
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper elevation={3}>
          <List>
            {friends.map((friend, index) => (
              <React.Fragment key={friend.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color={friend.online ? 'success' : 'error'}
                    >
                      <Avatar src={friend.avatar}>{friend.username[0]}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={friend.username}
                    secondary={friend.walletAddress}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="message"
                      onClick={() => handleMessage(friend.id)}
                      sx={{ mr: 1 }}
                    >
                      <MessageIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="remove friend"
                      onClick={() => handleRemoveFriend(friend.id)}
                      color="error"
                    >
                      <PersonRemoveIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                {index < friends.length - 1 && <Divider variant="inset" component="li" />}
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Add Friend Dialog */}
        <Dialog open={openAddFriend} onClose={() => setOpenAddFriend(false)}>
          <DialogTitle>Add Friend</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Wallet Address"
              type="text"
              fullWidth
              variant="outlined"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddFriend(false)}>Cancel</Button>
            <Button onClick={handleAddFriend} variant="contained">
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default FriendList;
