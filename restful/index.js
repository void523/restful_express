// GET /comments  - lists all the comments
// POST /comments  - create a new comments
// GET / comments/:id - Get one comment (using ID)
// PATCH /comments/:id - Update one comment
// DELETE /comment/:id - Destroy one comment


const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const {v4:uuid}  = require('uuid')

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')


let works = [
    {
        // id:1,
        id:uuid(),
        username: 'Logan',
        work_place: 'Indoor'
    },
    {
        // id:2,
        id:uuid(),
        username: 'Cyclops',
        work_place: 'Outdoor'
    },
    {
        // id:3,
        id:uuid(),
        username: 'Ryan',
        work_place: 'Indoor'
    },
    {
        // id:4,
        id: uuid(),
        username: 'Charles',
        work_place: 'Outdoor'
    }
]

app.get('/works',(req,res)=>{
    res.render('works/index',{works})
})

app.get('/works/new',(req,res)=>{
    res.render('works/new')
})

app.post('/works',(req,res)=>{
    const { username,work_place } = req.body
    works.push({username,work_place,id:uuid()})
    res.redirect('/works')
})


app.get('/works/:id',(req,res)=>{
    const {id} = req.params
    const work_place = works.find(w => w.id === id)
    res.render('works/show',{work_place})
})

app.get('/works/:id/edit',(req,res)=>{
    const {id} = req.params
    const work_place = works.find(w => w.id === id)
    res.render('works/edit',{work_place})
})

app.patch('/works/:id',(req,res)=>{
    const {id} = req.params
    const newWorkPlace = req.body.work_place
    const foundWorkPlace = works.find(w => w.id === id)
    foundWorkPlace.work_place = newWorkPlace
    res.redirect('/works')

})

app.delete('/works/:id',(req,res)=>{
    const {id} = req.params
    works = works.filter(w => w.id !== id )
    res.redirect('/works')
})


app.listen(8080,()=>{
    console.log('listening to port 8080')
})