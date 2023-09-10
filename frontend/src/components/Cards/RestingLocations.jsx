//IT21013300
import  { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function RestingCard() {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div>
      <Card
        sx={{
          minWidth: 275,
          transition: 'transform 0.3s',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          cursor: 'pointer',
          borderRadius: 12,
        }}
        onMouseEnter={handleCardHover}
        onMouseLeave={handleCardHover}
      >
        <CardContent>
          <Typography sx={{ fontSize: 65 }} color="text.secondary" gutterBottom>
            Check available resting locations
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography variant="body2">
            Any Space?
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href="/hotel">
           Have A Look
          </Button>
        </CardActions>
        <br />
        <br />
      </Card>
    </div>
  );
}

export default RestingCard;
