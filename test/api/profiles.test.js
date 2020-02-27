process.env.NODE_ENV = 'test'; 
const expect = require('chai').expect; 
const request= require('supertest');

const app  = require('../../app');
const conn = require('../../db');
const faker= require('faker');

describe('/products',()=>{
    before((done)=>{
        conn.connect()
        .then(()=>done())
        .catch(err=>done(err))
    })

    after((done)=>{
        conn.close()
        .then(()=>{
            done()
        })
        .catch(err=>{
            done(err)
        })
    })
it('POST-/profiles ,should return a product document containing color and price profile',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        .then(res=>{
            const categoryId = res.body._id;
            request(app).post('/products')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),
            status     : '1',
            category   : categoryId
            })
            .then(res=>{
                const productId = res.body._id; 
                request(app).post('/profiles')
                .send({
                    productId:productId,
                    color: 'black', 
                    price : 5000
            })        
            .then(res=>{
                request(app).get(`/products/${productId}`)
                .then(res=>{
                    const profile = res.body.profile; 
                    expect(profile.color).to.equal('black');
                    expect(profile.price).to.equal(5000);
                    done(); 
                })
            })
        })
    })
    .catch(err=>done(err))
})

it('PUT-/profiles/:id ,should update color and price in profile of a product documents',(done)=>{
    request(app).post('/categories')
    .send({
        name       :faker.commerce.department(), 
        id         :faker.random.number(), 
        description:faker.commerce.productAdjective() 
    })
    .then(res=>{
        const categoryId = res.body._id;
        request(app).post('/products')
        .send({
        name       :faker.commerce.department(), 
        id         :faker.random.number(), 
        description:faker.commerce.productAdjective(),
        status     : '1',
        category   : categoryId
        })
        .then(res=>{
            const productId = res.body._id; 
            request(app).post('/profiles')
            .send({
                productId:productId,
                color: 'black', 
                price : 5000
        })        
        .then(res=>{
            request(app).get(`/products/${productId}`)
            .then(res=>{
                const profile   = res.body.profile;
                const profileId = res.body.profile._id;  
                expect(profile.color).to.equal('black');
                expect(profile.price).to.equal(5000);
                request(app).put(`/profiles/${profileId}`)
                .send({
                    color:'white',
                    price:1000
                })
                .then(res=>{
                    request(app).get(`/products/${productId}`)
                    .then(res=>{
                        const profile = res.body.profile; 
                        expect(profile.color).to.equal('white');
                        expect(profile.price).to.equal(1000);
                        done(); 
                        })
                        .catch(err=>done(err))
                    })
                })
            })
        })
    })
})

it('DELETE-/profiles/:id ,should delete a profile of a product document and profile become null',(done)=>{
    request(app).post('/categories')
    .send({
        name       :faker.commerce.department(), 
        id         :faker.random.number(), 
        description:faker.commerce.productAdjective() 
    })
    .then(res=>{
        const categoryId = res.body._id;
        request(app).post('/products')
        .send({
        name       :faker.commerce.department(), 
        id         :faker.random.number(), 
        description:faker.commerce.productAdjective(),
        status     : '1',
        category   : categoryId
        })
        .then(res=>{
            const productId = res.body._id; 
            request(app).post('/profiles')
            .send({
                productId:productId,
                color: 'black', 
                price : 5000
        })        
        .then(res=>{
            request(app).get(`/products/${productId}`)
            .then(res=>{
                const profile   = res.body.profile;
                const profileId = res.body.profile._id;  
                expect(profile.color).to.equal('black');
                expect(profile.price).to.equal(5000);
                request(app).delete(`/profiles/${profileId}`)
                .then(res=>{
                    request(app).get(`/products/${productId}`)
                    .then(res=>{
                        const profile = res.body.profile; 
                        expect(profile).to.equal(null);
                        done(); 
                        })
                        .catch(err=>done(err))
                    })
                })
            })
        })
    })
})

})