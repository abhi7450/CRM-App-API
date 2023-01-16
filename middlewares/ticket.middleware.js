
const validatingTicketReq = (req,res,next) =>{
  // check if title is present or not
  if(!req.body.title){
    return req.status(400).send({
      message:"Failed!! Title is not provided !",
    })
  }
  // check if description is present or not
  if(!req.body.title){
    return req.status(400).send({
      message:"Failed!! Description is not provided !",
    })
  }
  next();
}


module.exports = {

}