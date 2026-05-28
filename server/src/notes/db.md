# Sequelize Relationships Reference

## Category ↔ Product

* One Category has many Products
* One Product belongs to one Category

```txt
CATEGORY ───────< PRODUCT
```

---

## User ↔ Cart

* One User has one Cart
* One Cart belongs to one User

```txt
USER ─────────── 1 CART
```

---

## Cart ↔ CartItem

* One Cart has many CartItems
* One CartItem belongs to one Cart

```txt
CART ──────────< CARTITEM
```

---

## Product ↔ CartItem

* One Product has many CartItems
* One CartItem belongs to one Product

```txt
PRODUCT ───────< CARTITEM
```

---

## User ↔ Order

* One User has many Orders
* One Order belongs to one User

```txt
USER ──────────< ORDER
```

---

## User ↔ OrderItem

* One User has many OrderItems
* One OrderItem belongs to one User

```txt
USER ──────────< ORDERITEM
```

---

## Order ↔ OrderItem

* One Order has many OrderItems
* One OrderItem belongs to one Order

```txt
ORDER ─────────< ORDERITEM
```

---

## Product ↔ OrderItem

* One Product belongs to many OrderItems
* One OrderItem belongs to one Product

```txt
PRODUCT ───────< ORDERITEM
```

---

# Complete Flow

```txt
CATEGORY
   │
   └──────< PRODUCT
                 │
                 ├──────< CARTITEM >────── CART >────── USER
                 │
                 └──────< ORD
```
