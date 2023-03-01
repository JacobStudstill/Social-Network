const {Schema, model, Types} =require('mongoose')
const dateformat = require('../utils/dateformat')

const reactionSchema = new Schema ({
    reactionId: {
        type:Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: createdAtValue => dateformat(createdAtValue)
    }
},
    {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlenth:1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        get: createdAtValue => dateformat(createdAtValue)
    },
    username: {
        type: String,
        required: true,
    },
    reactions:[reactionSchema]
},
    {
    toJSON: {
      getters: true,
    },
    id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function(){
return this.reactions.length
})

const Thought = model('Thought', thoughtSchema)
const Reaction = model('Reaction', reactionSchema)

module.exports = {Thought, Reaction}