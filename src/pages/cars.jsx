import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/authStore";
import { CarsContext } from "../store/carsStore";
import { MyRentalsContext } from "../store/myRentalsStore";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const CarsPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  if (!user.token) {
    navigate("/login");
  }
  const { cars } = useContext(CarsContext);
  const [selectedCar, setSelectedCar] = useState();

  const openConfirmDialog = (car) => {
    console.log("cox");
    setSelectedCar(car);
  };

  return (
    <div>
      <Grid container spacing={2}>
        {cars.map((car) => {
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
                    {`price - ${car.pricePerDay}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => openConfirmDialog(car)}>
                    Rent
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {selectedCar && (
        <RentCarDialog
          car={selectedCar}
          onCancel={() => setSelectedCar(undefined)}
        />
      )}
    </div>
  );
};

const RentCarDialog = ({ car, onCancel }) => {
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  const timeDiff = to.getTime() - from.getTime();
  const days = Math.round(timeDiff / (1000 * 3600 * 24));
  const { insertRental } = useContext(MyRentalsContext);
  const { user } = useContext(AuthContext);

  return (
    <Dialog open={true}>
      <DialogTitle>Rent a {`${car.brand} ${car.model}`}</DialogTitle>
      <DialogContent
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          paddingTop: "20px",
        }}
      >
        <DesktopDatePicker
          label="From"
          inputFormat="dd/MM/yyyy"
          value={from}
          onChange={setFrom}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDatePicker
          label="to"
          inputFormat="dd/MM/yyyy"
          value={to}
          onChange={setTo}
          renderInput={(params) => <TextField {...params} />}
        />
        <Typography>{`price - ${(days + 1) * car.pricePerDay} RON`}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onCancel}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            insertRental(
              {
                carId: car.id,
                from,
                to,
              },
              user,
              (days + 1) * car.pricePerDay
            );
            onCancel();
          }}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default CarsPage;
