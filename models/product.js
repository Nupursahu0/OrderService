const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'product',
  columns: {
    id: { type: 'int', primary: true, generated: true },
    name: { type: 'varchar' },
    description: { type: 'text' },
    price: { type: 'float' },
    stock: { type: 'int' },
    createdAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' },
  },
  relations: {
    orders: {
      target: 'order',
      type: 'many-to-many',
      mappedBy: 'products',
    },
  },
});