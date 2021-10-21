import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Button } from "@mui/material";
import axios from "axios";

export default function ItemCard(props) {
  const [count, setCount] = React.useState(1);

  const addItemToCart = () => {
    axios
      .post("https://fakestoreapi.com/carts", {
        userId: 1,
        date: "2020-02-03",
        products: [{ productId: props.productId, quantity: 1 }],
      })
      .then((response) => {
        alert("Add to cart item id " + response.data._id);
        console.log(response.data);
      });
  };
  return (
    <Card
      sx={{
        height: "440px",
        width: "230px",
        maxWidth: 345,
        margin: "14px",
        marginLeft: "5px",
        // display: "flex",
        // justifyContent: "center",
        padding: "5px",
      }}
    >
      <CardHeader
        sx={{
          padding: "10px",
        }}
        title={props.title.substring(0, 23)}
        subheader={"$" + props.price}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.category}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <RemoveCircleOutlineIcon
            onClick={() => {
              setCount(count > 1 ? count - 1 : 1);
            }}
          />
        </IconButton>
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
          {count}
        </Avatar>
        <IconButton aria-label="share">
          <AddCircleOutlineIcon
            onClick={() => {
              setCount(count > 0 ? count + 1 : 1);
            }}
          />
        </IconButton>
        <Button
          style={{ fontSize: "10px" }}
          variant="contained"
          size="small"
          onClick={() => {
            addItemToCart();
          }}
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}
