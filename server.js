const express = require('express')
const mongoose = require('mongoose')
const path=require('path')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
const Article = require('./models/article')
const app = express()

// Connect to MongoDB
main()
.then(()=>{
  console.log("connection Successful");
})
.catch((err)=>{
  console.log(err);
})
async function main(){
  await mongoose.connect("mongodb://127.0.0.1:27017/blogwebsite")
}

// App configuration
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Routes
app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
