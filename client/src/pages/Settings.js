import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  TextField,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';

const Settings = () => {
  const { user, signMessage } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEnabled: true,
    username: user?.username || '',
    email: user?.email || '',
  });

  const handleToggle = (setting) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      // Sign a message to verify ownership before updating settings
      await signMessage('Update settings confirmation');

      // Here you would typically make an API call to update user settings
      
      setSuccess('Settings updated successfully!');
    } catch (err) {
      setError(err.message || 'Failed to update settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Settings
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
          <Typography variant="h6" gutterBottom>
            Profile Settings
          </Typography>
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Username"
              value={settings.username}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, username: e.target.value }))
              }
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              value={settings.email}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, email: e.target.value }))
              }
              margin="normal"
            />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Application Settings
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="Notifications"
                secondary="Receive notifications for new messages and friend requests"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.notifications}
                  onChange={() => handleToggle('notifications')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Dark Mode"
                secondary="Toggle dark mode theme"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.darkMode}
                  onChange={() => handleToggle('darkMode')}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Sound"
                secondary="Enable sound notifications"
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={settings.soundEnabled}
                  onChange={() => handleToggle('soundEnabled')}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Save Changes'}
            </Button>
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom color="error">
            Danger Zone
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            These actions are irreversible. Please proceed with caution.
          </Typography>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              // Implement account deletion logic
            }}
          >
            Delete Account
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Settings;
