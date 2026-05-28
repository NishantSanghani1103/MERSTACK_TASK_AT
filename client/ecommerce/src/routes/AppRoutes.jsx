import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/pages/Home";
import Products from "../pages/product-listing/pages/Products";
import Cart from "../pages/cart/pages/Cart";
import CheckOut from "../pages/checkout/pages/CheckOut";
import Login from "../pages/auth/pages/Login";
import Register from "../pages/auth/pages/Register";
import AdminLayouts from "../layouts/AdminLayouts";
import AdminDashBoard from "../pages/admin/pages/dashboard/pages/AdminDashBoard";
import ProductAdd from "../pages/admin/pages/ProductAdd/pages/ProductAdd";
import ProductView from "../pages/admin/pages/ProductView/pages/ProductView";
import OrderListing from "../pages/admin/pages/orderView/pages/OrderListing";
import CustomerView from "../pages/admin/pages/customerView/pages/CustomerView";
import ProductDetails from "../pages/productDetails/pages/ProductDetails";
import AuthLayout from "../layouts/AuthLayout";
import UnAuthorized from "../components/common/UnAuthorized";
import Order from "../pages/order/pages/Order";
import CategoryAdd from "../pages/admin/pages/categoryAdd/pages/CategoryAdd";
import CategoryView from "../pages/admin/pages/categoryView/pages/CategoryView";

export const routes = createBrowserRouter([

    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <Login />
            },

            {
                path: "register",
                element: <Register />
            },
        ]
    },
    {
        element: <MainLayout userRole={["CUSTOMER"]} />,
        children: [
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/products",
                element: <Products />
            },
            {
                path: "/product/:slug",
                element: <ProductDetails />
            },
            {
                path: "/cart",
                element: <Cart />
            },
            {
                path: "/checkout",
                element: <CheckOut />
            },
            {
                path: "/order",
                element: <Order />
            }
        ]
    },
    {
        path: "/admin",
        element: <AdminLayouts userRole={["ADMIN"]} />,
        children: [
            {
                path: "dashboard",
                element: <AdminDashBoard />
            },
            {
                path: "category",
                children: [
                    {
                        path: "add",
                        element: <CategoryAdd />
                    },
                    {
                        path: "edit/:id",
                        element: <CategoryAdd />
                    },
                    {
                        path: "view",
                        element: <CategoryView />
                    }
                ]
            },
            {
                path: "product",
                children: [

                    {
                        path: "add",
                        element: <ProductAdd />
                    },
                    {
                        path: "view",
                        element: <ProductView />
                    },
                    {
                        path: "edit/:slug",
                        element: <ProductAdd />
                    }
                ]
            },
            {
                path: "order",
                children: [
                    {
                        path: "view",
                        element: <OrderListing />
                    }
                ]
            },
            {
                path: "customer",
                children: [
                    {
                        path: "view",
                        element: <CustomerView />
                    }
                ]
            }
        ]
    },
    {
        path: "/unauthorized",
        element: <UnAuthorized />
    }
]);