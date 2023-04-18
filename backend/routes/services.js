const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { services } = require('../models/models')

// GET 10 most recent services for org
router.get('/', (req, res, next) => {
  services
    .find({ org: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ name: 1 })
    .limit(10)
})
// GET all services for org
router.get('/active', (req, res, next) => {
  services
    .find({ $and: [{org: org }, {status: 'Active'}] } , (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    // sort by date ascending
    .sort({ name: 1 })
})

// GET single service by ID
router.get('/id/:id', (req, res, next) => {
  // use findOne instead of find to not return array
  services.findOne({ _id: req.params.id }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.json(data)
    }
  })
})

//...Search service

// POST new service
router.post('/', (req, res, next) => {
  const newServices = req.body
  newServices.org = org
  services.create(newServices, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json(data)
    }
  })
})
/* 
// PUT update service
router.put('/update/:id', (req, res, next) => {
    services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT add service to event
router.put('/register', (req, res, next) => {
    services.find(
    { _id: req.query.event, attendees: req.query.client },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        // only add attendee if not yet signed up
        if (!data.length) {
          events.findByIdAndUpdate(
            req.query.event,
            { $push: { attendees: req.query.client } },
            (error, data) => {
              if (error) {
                console.log(error)
                return next(error)
              } else {
                res.send('Services added to event')
              }
            }
          )
        } else {
          res.status(400).send('Client already added to event')
        }
      }
    }
  )
})

// PUT remove attendee from event
router.put('/deregister', (req, res, next) => {
  events.findByIdAndUpdate(
    req.query.event,
    { $pull: { attendees: req.query.client } },
    (error, data) => {
      if (error) {
        console.log(error)
        return next(error)
      } else {
        res.send('Client deregistered with event')
      }
    }
  )
})

// hard DELETE event by ID, as per project specifications
router.delete('/:id', (req, res, next) => {
  events.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Event not found')
    } else {
      res.send('Event deleted')
    }
  })
}) */

module.exports = router
