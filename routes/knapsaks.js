var express = require('express');
var router = express.Router();
var knex = require('../knex');


// a simple test url to check that all of our files are communicating correctly.
/*GET - all saved knapsaks belonging to that user*/
router.get('/:userId', (req, res, next) => {
  console.log('users knapsaks hit')
  knex('knapsaks')
  .where('user_id', req.params.userId)
  .then((data) => {
    console.log('data', data)
    res.send(data)
  })
});


/*GET - a specific saved knapsak belonging to a particular user*/
router.get('/:userId/:knapsakId', (req, res, next) => {
  console.log('user\'s specific knapsak hit')
  knex('knapsaks')
  .where('user_id', req.params.userId)
  .andWhere('id', req.params.knapsakId)
  .then((data) => {
    console.log('data', data)
    res.send(data)
  })
});



/*POST - save a new knapsak for a user*/
router.post('/:userId/new', (req, res, next) => {
  let knapsakInfo = {
    userid: req.params.userId,
    description: req.body.description,
    kidid: req.body.kidId
  };
  knex('knapsaks')
  .insert(knapsakInfo)
  .then((data) => {
    console.log('sucessfully created new knapsak');
    res.statusCode = 200;
    return res.json(knapsakInfo);
  })
  .catch(function(error) {
    console.error(error);
    res.statusCode = 500;
    return res.json({
      errors: ['Failed to create new knapsak in user\'s account']
    })
  });
});





/*UPDATE - update the contents of a particular knapsak belonging to the user*/
// router.put('/users/:id/knapsaks/:id')

/*DELETE - delete a particular knapsak belonging to a user*/
router.delete('/:userId/:knapsakId', (req, res, next) => {
    knex('knapsaks')
    .where('user_id', req.params.userId)
    .andWhere('id', req.params.knapsakId)
    .del()
    .then((data) => {
      console.log('successfully deleted the user\'s knapsak');
      res.statusCode = 200;
      return res.json('user\'s knapsak was successfully deleted');
    })
    .catch((error) => {
      console.error(error);
      res.statusCode = 500;
      return res.json({
        errors: 'Failed to delete user\'s knapsak'
      })
    })
});


module.exports = router;
