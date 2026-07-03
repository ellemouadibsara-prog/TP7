const express = require("express");
const router = express.Router();
const tickets = require("../data/tickets");

// GET all tickets
router.get("/", (req, res) => {
  res.json(tickets);
});

// GET ticket by id
router.get("/:id", (req, res) => {
  const ticket = tickets.find(
    t => t.id === parseInt(req.params.id)
  );

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found"
    });
  }

  res.json(ticket);
});

// POST new ticket
router.post("/", (req, res) => {
  const newTicket = {
    id: tickets.length + 1,
    title: req.body.title,
    status: req.body.status || "open"
  };

  tickets.push(newTicket);

  res.status(201).json(newTicket);
});

// PUT update ticket
router.put("/:id", (req, res) => {
  const ticket = tickets.find(
    t => t.id === parseInt(req.params.id)
  );

  if (!ticket) {
    return res.status(404).json({
      message: "Ticket not found"
    });
  }

  ticket.title = req.body.title || ticket.title;
  ticket.status = req.body.status || ticket.status;

  res.json(ticket);
});

// DELETE ticket
router.delete("/:id", (req, res) => {
  const index = tickets.findIndex(
    t => t.id === parseInt(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Ticket not found"
    });
  }

  tickets.splice(index, 1);

  res.json({
    message: "Ticket deleted"
  });
});

module.exports = router;