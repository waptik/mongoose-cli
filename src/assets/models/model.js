'use strict';

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    <% attributes.forEach(function(attribute, index) { %>
      <%= attribute.fieldName %>: { 
        type: <%= attribute.dataFunction ? `${attribute.dataFunction}(${attribute.dataType})` : attribute.dataValues ? `${attribute.dataType}(${attribute.dataValues})` : attribute.dataType %>
      }
      <%= (Object.keys(attributes).length - 1) > index ? ',' : '' %>
    <% }) %>
  }, {
    timestamps: {
      createdAt: 'created_at', 
      updatedAt: 'updated_at'
     }
  });


  const <%= name %> = mongoose.model('<%= name %>', newSchema);

  return <%= name %>;
};
