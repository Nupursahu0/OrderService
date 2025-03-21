# OrderService

A Node.js service for managing sales orders and products, built with Express.js and TypeORM, and connected to a PostgreSQL database.

## Features

- CRUD operations for sales orders and products.
- Attach products to sales orders.
- Search and filter sales orders by name, email, mobile number, status, and order date.
- Push sales order details to a third-party API upon creation.

## Requirements

- Node.js (v14 or later)
- PostgreSQL database
- npm (Node Package Manager)
- postman(For API Testing)

# Tech Stack
 - Node.js with Express.js
 - PostgreSQL with TypeORM
 - express-validator for request validation
 - dotenv for environment variables
 - axios for third-party API integration

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Nupursahu0/OrderService.git
cd OrderService

### Install Dependencies
npm install

### Configure Environment Variables

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=1234
DB_NAME=order_service
PORT=3000

### To run the application 
npm start
###The server will start on the port specified in the .env file (default: 3000).

### API DOCUMENTATION 
 Product APIs
 # CRUD operations for Product
1. Create Product
   API URL : http://localhost:3000/api/products/createProduct
   METHOD : POST
   REQUEST BODY : {
    "name": "product E",
    "description": "awesome products",
    "price": 300,
    "stock": 100
  }
  RESPONSE : {
    "message": "product created successfully",
    "product": {
        "name": "product E",
        "description": "awesome products",
        "price": 300,
        "stock": 100,
        "id": 9,
        "createdAt": "2025-03-21T04:04:39.051Z"
    }
}
2. Get All Products
   API URL : http://localhost:3000/api/products/productList
   METHOD : GET
   RESPONSE : [
    {
        "id": 2,
        "name": "Electronics",
        "description": "Smart home assistant device",
        "price": 79.99,
        "stock": 250,
        "createdAt": "2025-03-20T11:31:34.747Z"
    },
    {
        "id": 4,
        "name": "product A",
        "description": "awesome products",
        "price": 200,
        "stock": 50,
        "createdAt": "2025-03-21T01:07:00.521Z"
    },
    {
        "id": 5,
        "name": "product B",
        "description": "awesome products",
        "price": 300,
        "stock": 100,
        "createdAt": "2025-03-21T01:07:11.440Z"
    }
  ]  
  3. Update Product
      API URL : http://localhost:3000/api/products/id
      METHOD : PUT
      #Note - id should be integer
      REQUEST BODY: {
         "name": "product E",
         "description": "awesome",
         "price": 55.0,
         "stock": 150
        }
      RESPONSE : {
         "message": "Product updated"
        }
4.  Delete Product
        API URL : http://localhost:3000/api/products/id
        METHOD : DELETE
        #Note - id should be integer
        RESPONSE : {
           "message": "Product deleted"
        } 

Order APIs
# CRUD operations for Order
1. Create Order
  API URL :http://localhost:3000/api/orders/createOrder
  METHOD : POST
  #note - product id should be created before using create product API
  REQUEST BODY : {
      "customerName": "abc3",
      "email": "abc3@example.com",
      "mobileNumber": "9876543230",
      "status": "Confirmed",
      "totalAmount": 11000,
      "productIds": [6,7]
  }
  RESPONSE : {
    "orders": {
        "customerName": "abc3",
        "email": "abc3@example.com",
        "mobileNumber": "9876543230",
        "orderDate": "2025-03-21T02:50:37.982Z",
        "totalAmount": 11000,
        "products": [
            {
                "id": 6,
                "name": "product D",
                "description": "awesome",
                "price": 55,
                "stock": 150,
                "createdAt": "2025-03-21T02:36:16.850Z"
            },
            {
                "id": 7,
                "name": "product F",
                "description": "awesome",
                "price": 55,
                "stock": 150,
                "createdAt": "2025-03-21T02:49:10.367Z"
            }
        ],
        "id": 19,
        "status": "Pending",
        "createdAt": "2025-03-21T02:50:37.983Z"
    },
    "message": "data pushed to third party API successfully"
}

2. Get All Orders with Search & Filters
   API URLS : http://localhost:3000/api/orders/getOrder
             http://localhost:3000/api/orders/getOrder?name=John Doe
             http://localhost:3000/api/orders/getOrder?status=Completed
             http://localhost:3000/api/orders/getOrder?email=jane@example.com
             http://localhost:3000/api/orders/getOrder?orderDate= 2025-03-19
  #use one by one for response
  METHOD : GET
  #sample response
  RESPONSE : [
    {
     "id": 10,
     "customerName": "Nupur Sahu",
     "email": "nupursahu@example.com",
     "mobileNumber": "9876543280",
     "status": "Pending",
     "orderDate": "2025-03-20",
     "totalAmount": 11000,
     "createdAt": "2025-03-20T16:19:37.725Z",
     "products": [
        { "id": 4, "name": "Product A", "price": 500 },
        { "id": 7, "name": "Product B", "price": 300 }
  ]
}
]
3. Update Order
  API URL : http://localhost:3000/api/orders/id
  #Note - id should be integer
  METHOD : POST
  REQUEST BODY : {
  "customerName": "John Doe",
  "email": "john.doe@example.com",
  "mobileNumber": "9876543210",
  "status": "Confirmed",
  "totalAmount": 1200
 }
 RESPONSE : 
  {
    "message": "Order updated"
  }
4. Delete Order
   API URL : http://localhost:3000/api/orders/17
   #Note - id should be integer
   METHOD : DELETE
   RESPONSE: {
    "message": "Order deleted"
   }
   

@ Author
Nupur Sahu
  
             







