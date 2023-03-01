// require express router
const router = require('express').Router();

// const { get } = require('express/lib/response');
// import from users controller
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

// get and post routes for users
router.route('/')
    .get(getUser)
    .post(createUser);

// get by Id, put, delete routes for users
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// add and delete friends
router.route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;