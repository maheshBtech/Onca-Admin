
import axios from 'axios';

export default class ProductService {

    getProductsSmall() {
        return axios.get('SubComponent/products-small.json').then(res => res.data.data);
    }

    getProducts() {
        return axios.get('SubComponent/products.json').then(res => res.data.data);
    }

    getProductsWithOrdersSmall() {
        return axios.get('SubComponent/products-orders-small.json').then(res => res.data.data);
    }
}
    