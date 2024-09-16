//IT21013300
import  { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function ParkingCard() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div>
      <Card
        sx={{
          minWidth: 275,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease',
          borderRadius: 12,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent>
          <Typography sx={{ fontSize: 65 }} color="text.secondary" gutterBottom>
           Parking Space?
          </Typography>
          <Typography variant="h5" component="div"></Typography>
          <Typography variant="body2">
            Hustle in Finding a Parking Space
            <br />
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href="/travel">
           Lets Have Look
          </Button>
        </CardActions>
        <br></br>
        <br></br>
      </Card>
    </div>
  );
}

export default ParkingCard;
