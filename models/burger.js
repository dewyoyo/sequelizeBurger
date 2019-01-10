// burger table model
module.exports = function(sequelize, DataTypes) {
  var JoinBurgers = sequelize.define("JoinBurgers", {
    // timestamps: false,
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false, //notNull: true,
      validate: {
        len: [1,100]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  JoinBurgers.associate = function(models) {
    // We're saying that a JoinBurgers should belong to an joinCustomer
    // A JoinBurgers can't be created without an joinCustomer due to the foreign key constraint
    JoinBurgers.belongsTo(models.joinCustomer, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return JoinBurgers;
};


// module.exports = function(sequelize, DataTypes) {
//   var Post = sequelize.define("Post", {
//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         len: [1]
//       }
//     },
//     body: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//       len: [1]
//     }
//   });

//   Post.associate = function(models) {
//     // We're saying that a Post should belong to an Author
//     // A Post can't be created without an Author due to the foreign key constraint
//     Post.belongsTo(models.Author, {
//       foreignKey: {
//         allowNull: false
//       }
//     });
//   };

//   return Post;
// };



// const User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });

// // force: true will drop the table if it already exists
// User.sync({force: true}).then(() => {
//   // Table created
//   return User.create({
//     firstName: 'John',
//     lastName: 'Hancock'
//   });
// });