export interface NavbarMenu {
    id: string;
    link: string;
    text: string;
  }


export const navbarMenuArray: NavbarMenu[] = [
  {
    link: "/",
    id: "home",
        text: "Home",
    
  },
  {
    link: "/users",
    id: "users",
    text: "Users",
  },
];