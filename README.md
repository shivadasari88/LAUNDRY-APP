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
