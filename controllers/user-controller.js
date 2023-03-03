const {User, Thought} = require('../models')

module.exports={
    getUser(req, res) {
        User.find()
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json(err));
        },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .then(() => res.json({ message: 'That user was deleted' }))
          .catch((err) => res.status(500).json(err));
      },
    addFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.id },
        { $addToSet: { friends: params.friendId } },
        { new: true }
      )
        .then((userDB) => {
          if (!userDB) {
            res.status(404).json({ message: "No user was found with this id!" });
            return;
          }
          res.json(userDB);
        })
        .catch((err) => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
        { _id: params.id },
        { $pull: { friends: params.friendId } },
        { new: true }
      )
        .then((userDB) => {
          res.json(userDB);
        })
        .catch((err) => res.json(err));
    },
}
