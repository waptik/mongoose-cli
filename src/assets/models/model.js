'use strict';

module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema({
    <% attributes.forEach(function(attribute, index) { %>
      <%= attribute.fieldName %>: DataTypes.<%= attribute.dataFunction ? `${attribute.dataFunction.toUpperCase()}(DataTypes.${attribute.dataType.toUpperCase()})` : attribute.dataValues ? `${attribute.dataType.toUpperCase()}(${attribute.dataValues})` : attribute.dataType.toUpperCase() %>
      <%= (Object.keys(attributes).length - 1) > index ? ',' : '' %>
    <% }) %>
  }, {
    <%= timestamps ? '(`${underscored} ? (timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }) : timestamps: true,`)' : '' %>
  }
  });


  const <%= name %> = mongoose.model('<%= name %>', newSchema);

  //underscored
//timestamps: { createdAt: 'created_at', updatedAt: 'update_at' }

  return <%= name %>;
};
