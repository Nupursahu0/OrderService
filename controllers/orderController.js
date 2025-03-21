const { AppDataSource } = require('../config/db');
const Order = require('../models/order');
const Product = require('../models/product');
const { pushToThirdPartyAPI } = require('../util/utli');
const { In } = require('typeorm');

const orderRepository = AppDataSource.getRepository(Order);
const productRepository = AppDataSource.getRepository(Product);

const getAllOrders = async (req, res) => {
  const { name, email, mobileNumber, status, orderDate } = req.query;
  const filters = {};

  if (name) filters.customerName = name;
  if (email) filters.email = email;
  if (mobileNumber) filters.mobileNumber = mobileNumber;
  if (status) filters.status = status;
  if (orderDate) filters.orderDate = orderDate;

  try {
    const orders = await orderRepository.find({ where: filters,relations: ['products'], });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { customerName, email, mobileNumber, totalAmount, productIds } = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({ error: 'Invalid product IDs' });
    }

    // Fetch products by their IDs
    const products = await productRepository.find({
      where: { id: In(productIds)},
    })

    if (products.length !== productIds.length) {
      return res.status(404).json({ error: 'Some products not found' });
    }

    // Create the order and link products
    const order = orderRepository.create({
      customerName,
      email,
      mobileNumber,
      totalAmount,
      orderDate: new Date(),
      products,
    });
    const savedOrder = await orderRepository.save(order);
    console.log('order',order)

    try {
      const res = await pushToThirdPartyAPI(order);
      console.log(res)
    } catch (err) {
      console.error('Failed to push order to third-party API:', err);
    }
    res.status(201).json({ orders: savedOrder,message : 'data pushed to third party API successfully' })
  } catch (error) {
    console.log('in catch block',error)
    res.status(400).json({ error: 'Failed to create order' });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const existingOrder = await orderRepository.findOne({ where: { id } });
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await orderRepository.update(id, req.body);
    res.json({ message: 'Order updated' });
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to update order' });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const existingOrder = await orderRepository.findOne({ where: { id } });
    if (!existingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    await orderRepository.delete(id);
    res.json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete order' });
  }
};

module.exports = { getAllOrders, createOrder, updateOrder, deleteOrder };
