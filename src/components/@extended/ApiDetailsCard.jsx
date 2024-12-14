import { Card, CardContent, Typography, Grid, Chip, Divider, Box, IconButton } from '@mui/material';
import { cloneElement } from 'react';
import { useTheme } from '@mui/system';

export default function ApiDetailsCard({ apiDetails, requestForm, methodColors }) {
  const { id, name, description, method, url_slug, response_type, response_code, delay, response , full_mock_url} = apiDetails;
  const theme = useTheme(); // Access theme breakpoints for responsive styles
  

  return (
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontSize: {
                xs: '0.8rem', // For mobile screens
                sm: '0.9rem', // For tablets and smaller devices
                lg: '1.3rem' // For larger screens
              }
            }}
          >
            {name}
          </Typography>

          {/* Edit Icon */}
          <IconButton size="small" sx={{ color: theme.palette.text.primary }}>
            {cloneElement(requestForm, { editId: id })}
          </IconButton>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{
            fontSize: {
              xs: '0.875rem', // Mobile font size
              sm: '0.9rem', // Tablets
              lg: '0.9rem' // Larger screens
            }
          }}
        >
          {description || 'No description available'}
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: '0.875rem', // Mobile
                  sm: '0.9rem', // Tablets
                  lg: '0.9rem' // PC
                }
              }}
            >
              Method:
            </Typography>
            {/* Display method with different colors */}
            <Chip
              label={method}
              color={methodColors[method] || 'default'} // Default color if no match
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              URL Slug:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              {url_slug}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              Response Type:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              {response_type}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              Response Code:
            </Typography>
            <Chip label={response_code} color={getResponseCodeColor(response_code)} variant="outlined" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              Delay:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              {delay ? `${delay} ms` : 'No delay'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              URL:
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: {
                  xs: '0.875rem',
                  sm: '0.9rem',
                  lg: '0.9rem'
                }
              }}
            >
              {full_mock_url}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ marginY: 2 }} />

        {/* Response section in full width */}
        <Box>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            gutterBottom
            sx={{
              fontSize: {
                xs: '0.875rem',
                sm: '0.9rem',
                lg: '0.9rem'
              }
            }}
          >
            Response:
          </Typography>
          <Typography
            variant="body2"
            sx={{
              wordWrap: 'break-word',
              maxHeight: '300px',
              overflowY: 'auto',
              backgroundColor: '#f4f4f4',
              padding: 2,
              borderRadius: 1,
              fontSize: {
                xs: '0.875rem',
                sm: '0.9rem',
                lg: '0.9rem'
              }
            }}
          >
            {response || 'No response available'}
          </Typography>
        </Box>
      </CardContent>
  );
}

// Helper function to decide Chip color for response codes
const getResponseCodeColor = (code) => {
  if (code >= 400 && code < 500) return 'warning'; // 4xx errors
  if (code >= 500) return 'error'; // 5xx errors
  return 'success'; // 2xx success codes
};
