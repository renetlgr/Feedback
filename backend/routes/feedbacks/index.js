let express = require('express');
let router = express.Router();
let feedbackController = require('./controller');

/*
 * GET
 */
router.get('/', feedbackController.get);

/*
 * GET
 */
router.get('/:id', feedbackController.get);

/*
 * POST
 */
router.post('/', feedbackController.post);

/*
 * PUT
 */
router.put('/:id', feedbackController.put);

/*
 * DELETE
 */
router.delete('/:id', feedbackController.delete);



module.exports = router;
