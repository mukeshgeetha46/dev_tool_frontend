import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import { Link } from 'react-router-dom';
import JoyLink from '@mui/joy/Link';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';

export default function InteractiveCard({ color, title, value, link, addlink, icon }) {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card
        variant="outlined"
        orientation="horizontal"
        sx={{
          width: 320,
          '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
        }}
      >
        {/* <AspectRatio ratio="1" sx={{ width: 50 }}> */}
          {icon}
        {/* </AspectRatio> */}
        <CardContent>
          <Typography level="title-lg" id="card-description">
            {title}
          </Typography>
          <Typography level="body-sm" aria-describedby="card-description" mb={1}>
            <JoyLink overlay underline="none" sx={{ color: 'text.tertiary' }}>
              {value}
            </JoyLink>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
