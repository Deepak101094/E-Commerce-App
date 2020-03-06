import react, {  Component } from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../store/action/fetch-products-action';

class Products extends Component {
    componentDidMount () {
        const {fetchProducts} = this.props;
        fetchProducts();
    }
    render() {
        return (
            <div>
            <h1> this is from Products Component</h1>
            </div>
        );
    }
};

export default connect(null, {fetchProducts} )(Products);