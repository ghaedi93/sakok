process.env.NODE_ENV = 'test'; 
const expect = require('chai').expect; 
const request= require('supertest');

const app  = require('../../app');
const conn = require('../../db');
const faker= require('faker');

describe('/products',()=>{
    beforeEach((done)=>{
        conn.connect()
        .then(()=>done())
        .catch(err=>done(err))
    })

    afterEach((done)=>{
        conn.close()
        .then(()=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
it('GET-/products ,should contain 2 product documents after creating',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
            const categoryId = category1.body._id;
        const product1=await request(app).post('/products')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),
            status     : '1',
            category   : categoryId
            })
        const product2=await request(app).post('/products')
                .send({
                name       :faker.commerce.department(), 
                id         :faker.random.number(), 
                description:faker.commerce.productAdjective(),
                status     : '1',
                category   : categoryId
            })        
        let products=await request(app).get('/products')
                .set('Content-Type', 'application/json')
                .set('Acccept', 'application/json')
                .catch(err => { 
                    throw err; 
                })
        products = products.body; 
        expect(products.length).to.equal(2);
})

it('GET-/products?status=0 ,should contain 1 product documents after creating 2',async()=>{

    const category1=await request(app).post('/categories')
    .send({
        name       :faker.commerce.department(), 
        id         :faker.random.number(), 
        description:faker.commerce.productAdjective() 
    })
        const categoryId = category1.body._id;
    const product1=await request(app).post('/products')
        .send({
        name       :faker.commerce.department(), 
        id         :faker.random.number(), 
        description:faker.commerce.productAdjective(),
        status     : '1',
        category   : categoryId
        })
    const product2=await request(app).post('/products')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),
            status     : '0',
            category   : categoryId
        })        
    let products=await request(app).get('/products?status=0')
            .set('Content-Type', 'application/json')
            .set('Acccept', 'application/json')
            .catch(err => { 
                throw err; 
            })
    products = products.body; 
    expect(products.length).to.equal(1);

})
    
it('GET-/prodcuts/:id ,should fetch a category document based on its id',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id;
        const product1=await request(app).post('/products')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),
            status     : '1',
            category   : categoryId
          })       
        const productId = product1.body._id; 
        let products  =await request(app).get(`/products/${productId}`)
        products = products.body;
                expect(products).to.have.property('name')
                expect(products).to.have.property('id')
                expect(products).to.have.property('description')
                expect(products).to.have.property('status')
                expect(products).to.have.property('category')
    })

it('POST-/products ,should contain product properties like name , id , description',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),

        })
        const categoryId = category1.body._id;
        const product1   =await request(app).post('/products')
            .send({
                name        :faker.commerce.product(),
                id          :faker.random.number(),
                description :faker.commerce.productAdjective(),
                status      :'1',
                category    :categoryId
            })
        const product = product1.body; 
                expect(product).to.have.property('name')
                expect(product).to.have.property('id')
                expect(product).to.have.property('description')
                expect(product.category).to.equal(categoryId)
                expect(product.status).to.equal('1')
    
    })

it('PUT-/products/:id ,should update the products',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id; 
        const product1   =await request(app).post('/products')
            .send({
                name        :faker.commerce.product(),
                id          :faker.random.number(),
                description :faker.commerce.productAdjective(),
                status      :'1',
                category    :categoryId
            })
        const productId = product1.body._id; 
        const product1Put=await request(app).put(`/products/${productId}`)
                .send({
                    name        :'javad',
                    status      :'0',
                })
        const body = product1Put.body; 
                    expect(body.n).to.equal(1);
                    expect(body.nModified).to.equal(1);
                    expect(body.ok).to.equal(1);

    })

it('DELETE-/products/:id ,should delete a product after creating',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id; 
        const product1  =await request(app).post('/products')
            .send({
                name        :faker.commerce.product(),
                id          :faker.random.number(),
                description :faker.commerce.productAdjective(),
                status      :'1',
                category    :categoryId
            })
        const productId = product1.body._id; 
        const product1Delete = await request(app).delete(`/products/${productId}`)
        const body = product1Delete.body; 
                    expect(body.n).to.equal(1);
                    expect(body.deletedCount).to.equal(1);
                    expect(body.ok).to.equal(1);
                    
})

})