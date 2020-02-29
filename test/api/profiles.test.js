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
it('POST-/profiles/:id ,should return a product document containing color and price profile',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id;
        const product1 =await request(app).post('/products')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),
            status     : '1',
            category   : categoryId
            })
        
        const productId = product1.body._id; 
        const profile1  =await request(app).post('/profiles')
                .send({
                    productId:productId,
                    color: 'black', 
                    price : 5000
            })      
        const productContainingProfile=await request(app).get(`/products/${productId}`)
        const profile = productContainingProfile.body.profile; 
        expect(profile.color).to.equal('black');
        expect(profile.price).to.equal(5000);
})

it('PUT-/profiles/:id ,should update color and price in profile of a product documents',async()=>{
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
    const profile1=await request(app).post('/profiles')
            .send({
                productId:productId,
                color: 'black', 
                price : 5000
        })        
    const productContainingProfile=await request(app).get(`/products/${productId}`)
    const profile   = productContainingProfile.body.profile;
    const profileId = productContainingProfile.body.profile._id;  
    expect(profile.color).to.equal('black');
    expect(profile.price).to.equal(5000);
    const productPut =await request(app).put(`/profiles/${profileId}`)
                .send({
                    color:'white',
                    price:1000
                })
    const productAfterPut=await request(app).get(`/products/${productId}`)
    const profileAfterPut = productAfterPut.body.profile; 
    expect(profileAfterPut.color).to.equal('white');
    expect(profileAfterPut.price).to.equal(1000);
})

it('DELETE-/profiles/:id ,should delete a profile of a product document and profile become null',async()=>{
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
    const profile1=await request(app).post('/profiles')
            .send({
                productId:productId,
                color: 'black', 
                price : 5000
        })        
    const productContainingProfile=await request(app).get(`/products/${productId}`)
    const profile   = productContainingProfile.body.profile;
    const profileId = productContainingProfile.body.profile._id;  
    expect(profile.color).to.equal('black');
    expect(profile.price).to.equal(5000);
    const profileDelete=await request(app).delete(`/profiles/${profileId}`)
    const productAfterDelete=await request(app).get(`/products/${productId}`)
    const productProfileAfterDelete = productAfterDelete.body.profile; 
    expect(productProfileAfterDelete).to.equal(null);
                      
})
})