const validate = formValue => {
    const error = {};
    if (!formValue.productName) {
      error.productName = "enter the product-name";
    }
    if (!formValue.description) {
      error.description = "enter product description";
    }
    if (!formValue.price) {
      error.price = "enter product-price";
    }
    if(!formValue.imageURL) {
      error.imageURL = "set your product-image"
    }
    return error;
  };
  
  export default validate;
  
  
  
  
  
  
  
  
  
  
  