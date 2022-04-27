import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authStore";
import { CarsContext } from "../store/carsStore";
import { MyRentalsContext } from "../store/myRentalsStore";

const MyRentalsPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (!user.token) {
    navigate("/login");
  }
  const { cars } = useContext(CarsContext);
  const { rentals, removeRental } = useContext(MyRentalsContext);

  return (
    <div>
      <Grid container spacing={2}>
        {rentals.map((rental) => {
          const car = cars.find(({ id }) => id === rental.carId);
          return (
            <Grid item xs={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={car.photoUrl}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {`${car.brand} - ${car.model}`}
                  </Typography>

                  <Typography gutterBottom variant="h5" component="div">
                    {`${rental.from} - ${rental.to}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => removeRental(rental)}>
                    Undo rental
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default MyRentalsPage;
