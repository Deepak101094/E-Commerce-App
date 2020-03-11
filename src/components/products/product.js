import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { CardActions } from '@material-ui/core';


const product = ({product}) => {
    return (
        <Card style= {{width: "250px" , height: "280px"}} key={product.id} >
        <imageURL />
        <p> {product.name} </p>
        <h4> {product.price} </h4>
        <CardContent>
        <span> {product.description} </span>
        </CardContent>
        <CardActions>
        <Button color="primary">Add Product</Button>
        </CardActions>     
      </Card>
    );
  }

export default product;