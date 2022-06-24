const request = require('supertest')('http://localhost:8080');
const expect = require('chai').expect;
const should  = require("chai").should();

let cookie;

describe("POST /login", function () {
    it("log user in and redirect to landing", async function () {
    let userData = { username: "", password: "" };
    const response = await request.post("/api/auth/login")
    .send(userData);
    console.log('response body', response.body);

      cookie = response.headers['set-cookie']
      expect(response.status).to.eql(302);
      expect(response.header['location']).to.eql('/productos');
    });
});


describe('GET /products', () => {
    it("Get all products", async () => {
        let response = await request.get('/productos').set('Cookie', cookie);
        console.log('response body', response.body);
        expect(response.status).to.eql(200);
    });
});

describe('POST new product', () => {
    it("Add product to list", async () => {
        let newProduct = {
            title: 'This is a product',
            price: '204',
            thumbnail: 'https://images.twinkl.co.uk/tr/raw/upload/u/ux/lightbulb-1875247-1920_ver_1.jpg'
        };
        
        let response = await request.post('/productos').send(newProduct);
        console.log('response body', response.body)
        expect(response.status).to.eql(200)
    });
});