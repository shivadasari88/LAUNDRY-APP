
# 📗 README.md — **dev branch**

> **Branch purpose:** Active development, experiments, new features

```md
# 🧺 Laundry Management Application — DEV BRANCH

⚠️ This is the **development branch**.  
Code here may be unstable, incomplete, or under active development.

🧑‍🤝‍🧑 Contribution Guidelines

Always create a feature branch

git checkout -b feature/your-feature-name


Make changes & commit

git add .
git commit -m "Added provider shop feature"


Push your branch

git push origin feature/your-feature-name


Create a Pull Request → dev

🔀 Branch Flow
feature/*  →  dev  →  main


feature/* → individual tasks

dev → integration testing

main → stable release


❌ Do NOT commit directly to main
❌ Do NOT push broken code to dev
✅ Keep commits small & meaningful


API's(backend base url - http://localhost:8080)

---

🔐 1. AUTH APIs

➤ Register User

POST /api/auth/register

Purpose: Create a new user (Provider / Admin / Customer)

Request Body

{
  "username": "provider1",
  "password": "pass123",
  "role": "PROVIDER"
}

➤ Login User


POST /api/auth/login

Purpose: Login user

Request Body

{
  "username": "provider1",
  "password": "pass123"
}



🏪 2. PROVIDER – SHOP MANAGEMENT

➤ Create Shop (Provider)

POST /api/provider/shop/create

Purpose: Provider creates one shop

Request Body

{
  "providerId": 13,
  "name": "Clean Wash Laundry",
  "address": "Hyderabad",
  "phone": "9876543210",
  "description": "Best laundry service",
  "openingHours": "9 AM - 9 PM",
  "deliveryTime": "24 hours"
}

📌 Note: Shop status will be PENDING initially.

➤ Get Provider’s Shop

GET /api/provider/shop/{providerId}

GET /api/provider/shop/13


🛂 3. ADMIN – SHOP APPROVAL

➤ View Pending Shops

GET /api/admin/shops/pending

➤ Approve Shop

PUT /api/admin/shops/{shopId}/approve

Example

PUT /api/admin/shops/8/approve

➤ Reject Shop

PUT /api/admin/shops/{shopId}/reject


🧾 4. PROVIDER – SERVICE CATALOG
➤ Add Service Type (Washing, Ironing, etc.)

POST /api/provider/catalog/services

Rules:

Shop must be APPROVED

One shop → many service types

Request Body

{
  "shopId": 8,
  "serviceName": "Washing"
}

➤ Add Item under Service Type

POST /api/provider/catalog/items

Request Body

{
  "serviceId": 3,
  "itemName": "Shirt",
  "price": 30
}


➤ Get All Services of a Shop

GET /api/provider/catalog/shop/{shopId}/services

Example

GET /api/provider/catalog/shop/8/services

➤ Get All Items under a Service

GET /api/provider/catalog/services/{serviceTypeId}/items

Example

GET /api/provider/catalog/services/3/items


🛒 5. CUSTOMER – CART & ORDER (DRAFT STAGE)

➤ Initialize Cart (Create / Fetch Draft Order)

POST /api/customer/cart/init

Query Params

customerId=14
shopId=8

📌 Rules

One active cart per customer

Cart is locked to one shop

Status = DRAFT

➤ Create Order Group (Batch Processing)

POST /api/customer/order-group/create

Request Body

{
  "orderId": 1,
  "groupName": "Office Shirts - March"
}

📌 Groups represent batch uploads (photos + specifications).


➤ Add Item to Order Group

POST /api/customer/order-item/add

Request Body

{
  "groupId": 1,
  "itemName": "Shirt",
  "serviceType": "Dry Cleaning",
  "fabricType": "Cotton",
  "quantity": 3,
  "instructions": "Remove stains"
}


📌 Smart Logic

Same item + service + fabric → quantity merged

Price auto-calculated

Group & order totals auto-updated

➤ View Cart (Frontend Cart Page)

GET /api/customer/cart/view

Query Param

customerId=14


{
  "orderId": 1,
  "orderStatus": "DRAFT",
  "totalAmount": 405.0,
  "shop": {
    "shopId": 8,
    "address": "Hyderabad"
  },
  "groups": [
    {
      "groupId": 1,
      "groupName": "Office Shirts - March",
      "groupTotal": 405.0,
      "items": [
        {
          "itemId": 1,
          "itemName": "Shirt",
          "serviceType": "Dry Cleaning",
          "fabricType": "Cotton",
          "quantity": 9,
          "unitPrice": 45.0,
          "totalPrice": 405.0,
          "instructions": "Remove stains"
        }
      ]
    }
  ]
}

ENTITY RELATIONSHIPS (CURRENT STATE)

User (CUSTOMER)
   |
   | 1–M
   |
 Order (DRAFT)
   |
   | 1–M
   |
 OrderGroup (Batch)
   |
   | 1–M
   |
 OrderItem (Item + Service + Fabric)



🔗 ENTITY RELATIONSHIP (FOR UNDERSTANDING)

User (PROVIDER)
   |
   | 1–1
   |
  Shop
   |
   | 1–M
   |
 ServiceType (Washing, Ironing)
   |
   | 1–M
   |
 ServiceItem (Shirt, Pant)



✅ CURRENT STATUS (IMPORTANT)

✔ Auth complete
✔ Provider onboarding complete
✔ Admin approval flow complete
✔ Service catalog complete
✔ Advanced customer cart with batch processing complete
✔ Cart totals & merge logic verified

🚫 Checkout & payment → intentionally excluded for now