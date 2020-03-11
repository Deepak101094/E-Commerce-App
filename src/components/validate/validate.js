const validate = formValue => {
    const error = {};
    if (!formValue.productName) {
      error.productName = "you must enter the product-name";
    }
    if (!formValue.description) {
      error.description = "you must enter product description";
    }
    if (!formValue.price) {
      error.price = "you must enter product-price";
    }
    if(!formValue.imageURL) {
      error.imageURL = "you must set your product-image"
    }
    return error;
  };
  
  export default validate;
  
  
  
  
  
  
  
  
  
  
  