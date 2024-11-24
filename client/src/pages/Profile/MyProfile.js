import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  Grid,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const MyProfile = () => {
  const { user, signMessage } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || '',
    walletAddress: user?.walletAddress || '',
    avatar: user?.avatar || '',
  });

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Sign a message to verify ownership before updating profile
      await signMessage('Update profile confirmation');

      // Here you would typically make an API call to update user profile
      
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData({
      username: user?.username || '',
      email: user?.email || '',
      bio: user?.bio || '',
      walletAddress: user?.walletAddress || '',
      avatar: user?.avatar || '',
    });
    setIsEditing(false);
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Profile
        </Typography>

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

        <Paper elevation={3} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            {!isEditing ? (
              <IconButton onClick={() => setIsEditing(true)} color="primary">
                <EditIcon />
              </IconButton>
            ) : (
              <Box>
                <IconButton
                  onClick={handleSave}
                  color="primary"
                  disabled={loading}
                >
                  <SaveIcon />
                </IconButton>
                <IconButton
                  onClick={handleCancel}
                  color="error"
                  disabled={loading}
                >
                  <CancelIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Avatar
                src={profileData.avatar}
                sx={{ width: 150, height: 150, margin: 'auto', mb: 2 }}
              />
              {isEditing && (
                <Button variant="outlined" component="label">
                  Upload Avatar
                  <input type="file" hidden accept="image/*" />
                </Button>
              )}
            </Grid>

            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  label="Username"
                  value={profileData.username}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={profileData.email}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  disabled={!isEditing}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Bio"
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  disabled={!isEditing}
                  margin="normal"
                  multiline
                  rows={3}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Wallet Address
                </Typography>
                <Chip
                  label={`${profileData.walletAddress.slice(
                    0,
                    6
                  )}...${profileData.walletAddress.slice(-4)}`}
                  variant="outlined"
                />
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Activity Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Messages Sent
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Friends
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={4}>
                <Paper elevation={1} sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="h4">0</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Groups
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default MyProfile;
