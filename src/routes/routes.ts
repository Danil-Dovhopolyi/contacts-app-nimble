import { IRoute } from "../types/IRoute";
import ContactListPage from "../pages/ContactListPage";
import { ContactPage } from "@mui/icons-material";

const routes: IRoute[] = [
  {
    key: "ContactListPage",
    title: "ContactListPage",
    path: "/",
    component: ContactListPage,
  },
  {
    key: "ContactPage",
    title: "ContactPage",
    path: "/contact/:id",
    component: ContactPage,
  },
];

export default routes;
