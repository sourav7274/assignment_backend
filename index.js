const express = require('express')
const {initialDatabase} = require("./connection/db.connection")
const app = express()
const cors = require('cors')
app.use(express.json())

const corsOption = {
    origin:"*",
    credentials: true,
    optionSuccessRate: 200
}
app.use(cors(corsOption))

const Package = require('./models/package.model')
const Booking = require('./models/booking.model')

initialDatabase()

app.get('/',async (req,res) =>{
    const data = await Package.find()
    res.json({message:"Testing",data})
})


//Routes and their functions

app.get("/packages",async (req,res) =>{
   try{
    const package = await Package.find()
    if(package)
    {
        res.status(200).json({message:"Success",package})
    }
    else
    {
        res.status(404).json({error:"Package not found"})
    }
   
   } catch(error)
   {
        res.status(500).json({error:"No packages found"})
   }
})


console.log('MongoDB URI:', process.env.MONGODB);

async function getPackagebyID(id)
{
   try{
    const data = Package.findById(id)
    // console.log(data)
    return data
   }
   catch(error)
   {
    console.log(error)
   }
}


app.get("/packages/:id",async (req,res) => {
   try{
    const package = await getPackagebyID(req.params.id)
    if (package)
    {
        res.status(200).json({message:"Success",package})
    }
    else{
        res.status(404).json({error:"Package not found"})
    }
   } catch(error)
   {
        res.status(500).json({error:"Some error ocured",error})
   }
})


async function saveBooking(data) 
{
   try{
    const newBook = new Booking(data)
    const  saveData = await newBook.save()
    return saveData   
   }
   catch(error)
   {
    console.log(error)
   }
}

app.post('/bookings',async (req,res) => {
    try{    
        const saveData = await saveBooking(req.body)
        res.status(201).json({message:"New Booking Saved Successfully",saveData})
    } catch(error)
    {
        res.status(500).json({error:"Some error occured",error})
    }
})

async function savePackage(data)
{
    try{
        const newPackage = new Package(data)
        const saveData = await  newPackage.save()
        return saveData
    } catch(error)
    {
        console.log(error)
    }
}

app.post('/admin/packages',async (req,res) => {
    try{
        const saveData = await savePackage(req.body)
        res.status(201).json({message:"New Package Saved",saveData})
    }
    catch(error)
    {
        res.status(500).json({error:"Some error occured", error})
    }
})

async function updatePackage(id,data)
{
    try{    
        const package = await Package.findByIdAndUpdate(id,data,{new:true})
        // console.log(data,package)
        return package
    } catch(error)
    {
        console.log(error)
    }
}

app.put('/admin/packages/:id',async (req,res) =>{
    try{
        const upDPackage = await updatePackage(req.params.id,req.body)
        res.status(200).json({message:"Update Successfull",upDPackage})
    } catch(error)
    {
        res.status(500).json({error:"Some error occured",error})
    }
})

async function deletePackage(id)
{
    try{
        const deletePackage = await Package.findByIdAndDelete(id)
        return deletePackage
    }
    catch(error)
    {
        console.log(error)
    }
}

app.delete('/admin/packages/:id',async (req,res) =>{
    try{
        const deleteData = await deletePackage(req.params.id)
        res.status(200).json({message:"Delete Successfull"})
    } catch(error)
    {
        res.status(500).json({error:"Some error occured",error})
    }
})  

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})