process.env.NODE_ENV = 'test'; 
const expect = require('chai').expect; 
const request= require('supertest');

const app  = require('../../app');
const conn = require('../../db');
const faker= require('faker');

describe('/categories',()=>{
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
    it('GET-/categories ,should contain 2 category documents after creating',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        .then(res=>{
            request(app).post('/categories')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        }).then(res=>{
            request(app).get('/categories')
            .then(res=>{
                const categories = res.body; 
                expect(categories.length).to.equal(2);
                done(); 
                })
            })
        })
        .catch(err=>done(err))
    })

    it('GET-/categories/:id ,should fetch a category document based on its id',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        .then(res=>{
            const categoryId = res.body._id; 
            request(app).get(`/categories/${categoryId}`)
            .then(res=>{
                const category = res.body;
                expect(category).to.have.property('name')
                expect(category).to.have.property('id')
                expect(category).to.have.property('description')
                done(); 
            })
        })
        .catch(err=>done(err))
    })

    it('POST-/categories ,should contain category properties like name , id , description',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        .then(res=>{
            const category = res.body;
            expect(category).to.have.property('name')
            expect(category).to.have.property('id')
            expect(category).to.have.property('description')
            done()
        })
        .catch(err=>done(err))
    })

    it('PUT-/categories/:id ,should update the category',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        .then(res=>{
            const categoryId = res.body._id; 
            request(app).put(`/categories/${categoryId}`)
            .send({
                name : 'javad',
                id   : '1', 
                description : 'maker'
            })
            .then(res=>{
                const body = res.body; 
                expect(body.n).to.equal(1);
                expect(body.nModified).to.equal(1);
                expect(body.ok).to.equal(1);
                done(); 
            })
        })
        .catch(err=>done(err))
    })

    it('DELETE-/categories/:id ,should update the category',(done)=>{
        request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        .then(res=>{
            const categoryId = res.body._id; 
            request(app).delete(`/categories/${categoryId}`)
            .then(res=>{
                const body = res.body; 
                expect(body.n).to.equal(1);
                expect(body.deletedCount).to.equal(1);
                expect(body.ok).to.equal(1);
                done(); 
            })
        })
        .catch(err=>done(err))
    })
})