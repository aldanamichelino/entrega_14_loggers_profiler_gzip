const axios = require('axios');

const loginUser = (data) => {
    try {
        return axios.post('http://localhost:8080/api/auth/login', data);
    } catch (error) {
        throw new Error(error.message);
    }
}

const getProducts = () => {
    try {

        return axios.get('http://localhost:8080/productos', { auth: {
            username: "",
            password: ""
          }});
    } catch (error) {
        throw new Error(error.message);
    }
}

const createProduct = (data) => {
    try {
        return axios.post(`http://localhost:8080/productos`, data, { auth: {
            username: "",
            password: ""
          }});
    } catch (error) {
        throw new Error(error.message);
    }
}


(async () => {
    try {
        console.log('login');
        const login = await loginUser({ username: "", password: "" });
        console.log('loginstatus', login.status);

        if (login.data.success) {
            console.log('✔');
        } else {
            console.log('Error');
        }


        console.log('Get products');
        const products = await getProducts();
        console.log(products.data);

        if (products.data.success) {
            console.log('✔');
        } else {
            console.log('Error');
        }

        console.log('Add a new product');
        const createdProduct = await createProduct({
                title: 'This is a product',
                price: '204',
                thumbnail: 'https://images.twinkl.co.uk/tr/raw/upload/u/ux/lightbulb-1875247-1920_ver_1.jpg'
        });
        console.log(createdProduct.data);

        if (createdProduct.data.success && createdProduct.data.data._id) {
            console.log('✔');
        } else {
            console.log('Error');
        }


    } catch (error) {
        throw new Error(error.message);
    }
})() 