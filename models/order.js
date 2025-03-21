
const { EntitySchema } = require('typeorm'); 

module.exports = new EntitySchema({
    name: 'order',
    columns: {
      id: { type: 'int', primary: true, generated: true },
      customerName: { type: 'varchar' },
      email: { type: 'varchar' },
      mobileNumber: { type: 'varchar' },
      status: { type: 'varchar', default: 'Pending' },
      orderDate: { type: 'date' },
      totalAmount: { type: 'float' },
      createdAt: { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' },
    },
    relations: {
      products: {
        target: 'product',
        type: 'many-to-many',
        eager: true,
        joinTable: {
          name: 'order_products',
          joinColumn: { name: 'orderId', referencedColumnName: 'id' },
          inverseJoinColumn: { name: 'productId', referencedColumnName: 'id' },
        },
      },
    },
  });
  