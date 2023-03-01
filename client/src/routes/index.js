import { useRoutes } from "react-router-dom";
// import Login from "../admin/pages/Login";

import {
  AddProperty,
  ViewAllProperties,
} from "../admin/pages/Properties/Properties";

import {
  ViewAllUsers,
  AddUserProperty
}

  from "../admin/pages/Users/Users";

import {
  AddLocation,
  AddAmenities,
  AddUnitType,
  AddDeveloper,
} from "../admin/pages/Masters/Masters";

import AddBlogs from "../admin/pages/Blogs/AddBlogs";
import Contacts from "../admin/pages/Contacts/Contacts";

import {
  Account,
  Properties,
  Blogs,
  ClientHome,
  ContactUs,
  Meeting,
  MyProperties,
  MyProperty,
  Property,
  WhyAnaween,
  Apprailsal,
} from "../client/Client";

// import ClientLogin from "../client/login/Login";

import ClientLayout from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";
import Register from "../client/register/Register";

import Login from "../login/Login";
import Blog from "../client/blog/Blog";
import ViewUsersProperties from "../admin/pages/Users/ViewUsersProperties";
import ViewAppraisals from "../admin/pages/Appraisals/viewAppraisals";

export default function Router() {
  return useRoutes([
    {
      path: "admin",
      children: [
        {
          path: "login",
          element: <Login Role="Admin" />,
        },
      ],
    },
    {
      path: "admin",
      element: <AdminLayout />,

      children: [
        {
          path: "addProperty",
          element: <AddProperty />,
        },
        {
          path: "addUserProperty",
          element: <AddUserProperty />,
        },
        {
          path: "viewAllProperties",
          element: <ViewAllProperties />,
        },
        {
          path: "addLocation",
          element: <AddLocation />,
        },
        {
          path: "addAmenities",
          element: <AddAmenities />,
        },
        {
          path: "addUnitType",
          element: <AddUnitType />,
        },
        {
          path: "addDeveloper",
          element: <AddDeveloper />,
        },
        {
          path: "viewAllUsers",
          element: <ViewAllUsers />
        },
        {
          path: "viewAppraisals",
          element: <ViewAppraisals />
        },
        {
          path: "addUserProperty",
          element: <AddUserProperty />
        },
        {
          path: "viewUsersProperties",
          element: <ViewUsersProperties />
        },
        {
          path: "addBlog",
          element: <AddBlogs />,
        },
        {
          path: "contacts",
          element: <Contacts />,
        },
      ],
    },

    {
      path: "/",
      element: <ClientLayout />,
      children: [
        {
          path: "",
          element: <ClientHome />,
        },
        {
          path: "properties",
          element: <Properties />,
        },
        {
          path: "property/:id/:name",
          element: <Property />,
        },
        {
          path: "my_properties",
          element: <MyProperties />,
        },
        {
          path: 'my_property/:id/:name',
          element: <MyProperty />
        },
        {
          path: "blogs",
          element: <Blogs />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "why_anaween",
          element: <WhyAnaween />
        },
        {
          path: "contact_us",
          element: <ContactUs />,
        },
        {
          path: "account",
          element: <Account />,
        },
        {
          path: "appraisal",
          element: <Apprailsal />,
        },
        {
          path: "meeting",
          element: <Meeting />,
        },
      ],
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "login",
      element: <Login Role="User" />,
    },
  ]);
}
