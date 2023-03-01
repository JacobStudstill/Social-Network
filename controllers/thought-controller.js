const {User, Thought} = require('../models')

module.exports={
    getThoughts(req, res) {
        Thought.find()
          .then((thought) => res.json(thought))
          .catch((err) => res.status(500).json(err));
        },
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      // Create a thought
    createThought(req, res) {
      Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    updateThought(req, res) {
      Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteThought(req, res) {
      Thought.findOneAndDelete({ _id: req.params.id })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .then(() => res.json({ message: 'That thought was deleted' }))
          .catch((err) => res.status(500).json(err));
      },
    addReaction({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true }
      )
        .then((thoughtDB) => {
          if (!thoughtDB) {
            res.status(404).json({ message: "No thought was found with this id!" });
            return;
          }
          res.json(thoughtDB);
        })
        .catch((err) => res.json(err));
    },

    deleteReaction({ params }, res) {
      Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      )
        .then((thoughtDB) => {
          res.json(thoughtDB);
        })
        .catch((err) => res.json(err));
    },
}
