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
    it('GET-/products ,should contain 2 product documents after creating',(done)=>{
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
                request(app).post('/products')
                .send({
                name       :faker.commerce.department(), 
                id         :faker.random.number(), 
                description:faker.commerce.productAdjective(),
                status     : '1',
                category   : categoryId
            })        
            .then(res=>{
                request(app).get('/products')
                .then(res=>{
                    const products = res.body; 
                    expect(products.length).to.equal(2);
                    done(); 
                    })
                })
        })
    })
    .catch(err=>done(err))
})

it('GET-/products?status=0 ,should contain 1 product documents after creating 2',(done)=>{
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
        status     : '0',
        category   : categoryId
        })
        .then(res=>{
            request(app).post('/products')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),
            status     : '1',
            category   : categoryId
        })        
        .then(res=>{
            request(app).get('/products?status=0')
            .then(res=>{
                const products = res.body
                expect(products.length).to.equal(1);
                done(); 
                })
                .catch(err=>done(err))
            })
    })
})
.catch(err=>done(err))
})
    
it('GET-/prodcuts/:id ,should fetch a category document based on its id',(done)=>{
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
              request(app).get(`/products/${productId}`)
              .then(res=>{
                const product = res.body;
                expect(product).to.have.property('name')
                expect(product).to.have.property('id')
                expect(product).to.have.property('description')
                expect(product).to.have.property('status')
                expect(product).to.have.property('category')
                done(); 
              })
            })
        })
        .catch(err=>done(err))
    })

it('POST-/products ,should contain product properties like name , id , description',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective(),

        })
        .then(res=>{
            const categoryId = res.body._id;
            request(app).post('/products')
            .send({
                name        :faker.commerce.product(),
                id          :faker.random.number(),
                description :faker.commerce.productAdjective(),
                status      :'1',
                category    :categoryId
            })
            .then(res=>{
                const product = res.body; 
                expect(product).to.have.property('name')
                expect(product).to.have.property('id')
                expect(product).to.have.property('description')
                expect(product.category).to.equal(categoryId)
                expect(product.status).to.equal('1')
                done()
            })
        })
        .catch(err=>done(err))
    })

it('PUT-/products/:id ,should update the products',(done)=>{
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
                name        :faker.commerce.product(),
                id          :faker.random.number(),
                description :faker.commerce.productAdjective(),
                status      :'1',
                category    :categoryId
            })
            .then(res=>{
                const productId = res.body._id; 
                request(app).put(`/products/${productId}`)
                .send({
                    name        :'javad',
                    status      :'0',
                })
                .then(res=>{
                    const body = res.body; 
                    expect(body.n).to.equal(1);
                    expect(body.nModified).to.equal(1);
                    expect(body.ok).to.equal(1);
                    done(); 
                })
            })
        })
        .catch(err=>done(err))
    })

it('DELETE-/products/:id ,should delete a product after creating',(done)=>{
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
                name        :faker.commerce.product(),
                id          :faker.random.number(),
                description :faker.commerce.productAdjective(),
                status      :'1',
                category    :categoryId
            })
            .then(res=>{
                const productId = res.body._id; 
                request(app).delete(`/products/${productId}`)
                .then(res=>{
                    const body = res.body; 
                    expect(body.n).to.equal(1);
                    expect(body.deletedCount).to.equal(1);
                    expect(body.ok).to.equal(1);
                    done(); 
                })
            })
        })
        .catch(err=>done(err))
    })
})