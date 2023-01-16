
const Ticket = require("../model/ticket.model");

const createTicket = async (req,res)=>{
  const ticketObj = {
    title:req.body.title,
    description:req.body.description
  }
}