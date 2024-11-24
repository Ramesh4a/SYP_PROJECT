import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
  Stack,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Zoom,
  Fade,
  InputAdornment,
  Chip,
  Avatar,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Security as SecurityIcon,
  Speed as SpeedIcon,
  Lock as LockIcon,
  Message as MessageIcon,
  Devices as DevicesIcon,
  Help as HelpIcon,
  Email as EmailIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ArrowForward as ArrowForwardIcon,
  GitHub as GitHubIcon,
  Twitter as TwitterIcon,
  Language as LanguageIcon,
  Storage as StorageIcon,
} from '@mui/icons-material';
import { useAuth } from '../../hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { connectWallet } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    try {
      setLoading(true);
      setError('');
      const success = await connectWallet();
      if (success) {
        navigate('/');
      } else {
        setError('Failed to connect wallet. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while connecting your wallet.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: 'Secure Messaging',
      description: 'End-to-end encrypted communication',
      icon: <LockIcon sx={{ fontSize: 32 }} />,
    },
    {
      title: 'Wallet Authentication',
      description: 'Login with your blockchain wallet',
      icon: <WalletIcon sx={{ fontSize: 32 }} />,
    },
    {
      title: 'Decentralized',
      description: 'No central server or authority',
      icon: <StorageIcon sx={{ fontSize: 32 }} />,
    },
  ];

  const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Messages/Day', value: '1M+' },
    { label: 'Countries', value: '150+' },
  ];

  const logos = [
    { icon: <GitHubIcon />, link: 'https://github.com' },
    { icon: <TwitterIcon />, link: 'https://twitter.com' },
    { icon: <img src="/ethereum.svg" alt="Ethereum" style={{ width: 24, height: 24 }} />, link: 'https://ethereum.org' },
    { icon: <img src="/metamask.svg" alt="MetaMask" style={{ width: 24, height: 24 }} />, link: 'https://metamask.io' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 50%, #01579b 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '200%',
          height: '200%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md">
        <Box sx={{ 
          display: 'flex', 
          gap: 3, 
          alignItems: 'stretch', 
          flexWrap: { xs: 'wrap', md: 'nowrap' },
          '& > *': {
            flex: { xs: '1 1 100%', md: '1 1 50%' },
            height: '450px',
            maxWidth: 400,
          }
        }}>
          {/* Left side - Login Card */}
          <Paper
            elevation={24}
            sx={{
              p: 2.5,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Main Content */}
            <Stack spacing={2} alignItems="center" sx={{ flex: 1, justifyContent: 'center' }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(90deg, #1976d2, #2196f3)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Welcome to DecentralChat
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 0.5 }}>
                  Experience secure messaging
                </Typography>
              </Box>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    width: '100%',
                    borderRadius: 2,
                    '& .MuiAlert-icon': { alignItems: 'center' },
                    py: 0.5
                  }}
                >
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleConnect}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={24} /> : <WalletIcon sx={{ fontSize: 24 }} />}
                endIcon={<ArrowForwardIcon sx={{ fontSize: 24 }} />}
                sx={{
                  height: 56,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  background: 'linear-gradient(90deg, #1976d2, #2196f3)',
                  boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, #1565c0, #1976d2)',
                  },
                }}
              >
                {loading ? 'Connecting...' : 'Connect with MetaMask'}
              </Button>

              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ width: '100%', justifyContent: 'center' }}
              >
                <Typography variant="body1" color="text.secondary">
                  New to blockchain?
                </Typography>
                <Button
                  variant="text"
                  size="large"
                  onClick={() => window.open('https://metamask.io/download/', '_blank')}
                  sx={{ textTransform: 'none', fontSize: '1rem' }}
                >
                  Get MetaMask
                </Button>
              </Stack>

              {/* Social Proof */}
              <Box sx={{ width: '100%' }}>
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  {stats.map((stat) => (
                    <Box
                      key={stat.label}
                      sx={{ textAlign: 'center' }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="body1"
                        color="text.secondary"
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Stack>

            {/* Logos Section */}
            <Box>
              <Stack
                direction="row"
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                {logos.map((logo, index) => (
                  <IconButton
                    key={index}
                    onClick={() => window.open(logo.link, '_blank')}
                    sx={{
                      color: 'text.secondary',
                      transition: 'all 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    {logo.icon}
                  </IconButton>
                ))}
              </Stack>
            </Box>
          </Paper>

          {/* Right side - Features */}
          <Paper
            elevation={24}
            sx={{
              p: 2.5,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              borderRadius: 3,
              position: 'relative',
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Stack spacing={2} sx={{ height: '100%' }}>
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                Why Choose DecentralChat?
              </Typography>

              <Stack spacing={2}>
                {features.map((feature, index) => (
                  <Zoom
                    key={feature.title}
                    in={true}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Card
                      sx={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, '&:last-child': { pb: 1.5 } }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: '8px',
                            background: 'rgba(255, 255, 255, 0.2)',
                            display: 'flex',
                            color: 'white',
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ color: 'white' }}>
                            {feature.title}
                          </Typography>
                          <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                            {feature.description}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Zoom>
                ))}
              </Stack>

              {/* Trust Indicators */}
              <Stack
                direction="row"
                spacing={1}
                justifyContent="center"
                sx={{ mt: 'auto', pb: 1 }}
              >
                <Chip
                  label="Open Source"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    height: 32,
                  }}
                />
                <Chip
                  label="Audited"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '1rem',
                    height: 32,
                  }}
                />
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
