process.env.NODE_ENV = 'test'; 
const expect = require('chai').expect; 
const request= require('supertest');

const app  = require('../../app');
const conn = require('../../db');
const faker= require('faker');

describe('/categories',()=>{
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
    it('GET-/categories ,should contain 2 category documents after creating',async()=>{
            const category1 = await  
            request(app).post('/categories')
            .send({
                name       :faker.commerce.department(), 
                id         :faker.random.number(), 
                description:faker.commerce.productAdjective() 
            }); 
            const category2 = await
            request(app).post('/categories')
            .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
            })

            const result =await 
            request(app).get('/categories')
            .set('Content-Type', 'application/json')
            .set('Acccept', 'application/json')
            .catch(err => { 
                throw err; 
            })
            const categories= result.body;
            expect(categories.length).to.equal(2);

    })
    it('GET-/categories?name=name1 ,should contain 1 category documents after creating 2',async()=>{
        const category1=await
        request(app).post('/categories')
            .send({
            name       :'name1', 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const category2=await
        request(app).post('/categories')
            .send({
                name       :'name2', 
                id         :faker.random.number(), 
                description:faker.commerce.productAdjective() 
            })

        const result =await 
        request(app).get('/categories?name=name1')
            .set('Content-Type', 'application/json')
            .set('Acccept', 'application/json')
            .catch(err => { 
                throw err; 
            })
        const categories= result.body;
        expect(categories.length).to.equal(1);
    })
    it('GET-/categories/:id ,should fetch a category document based on its id',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id; 
        const result=await request(app).get(`/categories/${categoryId}`)
        .set('Content-Type', 'application/json')
        .set('Acccept', 'application/json')
        .catch(err => { 
                throw err; 
            })
        const categories=result.body;
        expect(categories).to.have.property('name')
        expect(categories).to.have.property('id')
        expect(categories).to.have.property('description')
        
    })

    it('POST-/categories ,should contain category properties like name , id , description',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const category = category1.body;
        expect(category).to.have.property('name')
        expect(category).to.have.property('id')
        expect(category).to.have.property('description')
    })

    it('PUT-/categories/:id ,should update the category',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id; 
        const putCategory1=await request(app).put(`/categories/${categoryId}`)
            .send({
                name : 'javad',
                id   : '1', 
                description : 'maker'
            })
        const category1AfterPut = putCategory1.body; 
        expect(category1AfterPut.n).to.equal(1);
        expect(category1AfterPut.nModified).to.equal(1);
        expect(category1AfterPut.ok).to.equal(1);

    })

    it('DELETE-/categories/:id ,should update the category',async()=>{
        const category1=await request(app).post('/categories')
        .send({
            name       :faker.commerce.department(), 
            id         :faker.random.number(), 
            description:faker.commerce.productAdjective() 
        })
        const categoryId = category1.body._id; 
        const deleteCategory1=await request(app).delete(`/categories/${categoryId}`)
        const category1AfterDelete=deleteCategory1.body; 
        expect(category1AfterDelete.n).to.equal(1);
        expect(category1AfterDelete.deletedCount).to.equal(1);
        expect(category1AfterDelete.ok).to.equal(1);
    })
})