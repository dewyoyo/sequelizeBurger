module.exports = function(sequelize, DataTypes) {
  var joinCustomer = sequelize.define("joinCustomer", {
    // Giving the joinCustomer model a name of type STRING
    customer_name: DataTypes.STRING
  });

  joinCustomer.associate = function(models) {
    // Associating joinCustomer with burger
    // When an joinCustomer is deleted, also delete any associated burger
    joinCustomer.hasMany(models.JoinBurgers, {
      onDelete: "cascade"
    });
  };

  return joinCustomer;
};
