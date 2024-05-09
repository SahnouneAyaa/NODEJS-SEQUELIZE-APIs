const joi = require('joi')
const Sequelize=require('sequelize')


let schemaValidation = joi.object({
    fullname:joi.string()
    .required(),
    email:joi.string()
    .email()
    .required(),
    age:joi.number()
    .required()
})


const sequelize = new Sequelize('university','root','',{
    host:'localhost',
    dialect:'mysql'
})


const student=Sequelize.define('student',{
    fullname:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
});


exports.postStudent=(fullname,email,age)=>{
    return Promise(async(res,rej)=>{

            let validation=await schemaValidation.validateAsync({fullname:fullname, email:email, age:age})

            if(validation.error){
                rej(validation.error.details.message)
            }

            student.sync({force:false}).then(()=>{
                student.create({
                    fullname:fullname, 
                    email:email, 
                    age:age
                }).then((doc)=>{
                    res(doc)
                }).catch((err)=>rej(err))
            })
        })
}


exports.getStudent=()=>{

    return Promise((res,rej)=>{
        
            student.findAll()
            .then((doc)=>{
                res(doc)
            }).catch((err)=>rej(err))


        })
}


exports.getStudentById=(id)=>{

    return Promise((res,rej)=>{

        student.findOne({where : {id:id}})
            .then((doc)=>{
                res(doc)
            }).catch((err)=>rej(err))

    })

}


exports.updateStudent=(id,fullname,email,age)=>{

    return Promise(async(res,rej)=>{


            let validation=await schemaValidation.validateAsync({fullname:fullname, email:email, age:age})

            if(validation.error){
                mongoose.disconnect()
                rej(validation.error.details.message)
            }
        
            student.update({
                fullname:fullname, 
                email:email, 
                age:age
            }, {where: { id:id}}).then((doc)=>{
                res(doc)
            }).catch((err)=>rej(err))
    
})
}

exports.deleteStudent=(id)=>{

    return Promise((res,rej)=>{
        
        student.destroy({where : {id:id}})
            .then((doc)=>{
                res(doc)
            }).catch((err)=>rej(err))

    })
}