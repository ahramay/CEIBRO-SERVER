import assets from "assets/assets";

export interface SingleConfig {
  title: string;
  icon: any;
  path: string;
  notification: number;
  active?: boolean | undefined;
}

export interface SidebarConfigInterface {
  [key: string]: SingleConfig;
}

const SidebarConfig: SidebarConfigInterface = {
  Dashboard: {
    title: "Dashboard",
    icon: assets.sidebarDashboardIcon,
    path: "dashboard",
    notification: 0,
    active: true,
  },
  Chat: {
    title: "Chat",
    icon: assets.sidebarChatIcon,
    path: "chat",
    notification: 0,
  },
  Tasks: {
    title: "Tasks",
    icon: assets.sidebarPaseIcon,
    path: "tasks",
    notification: 0,
  },
  Projects: {
    title: "Projects",
    icon: assets.sidebarFolderIcon,
    path: "projects",
    notification: 0,
  },
  Reports: {
    title: "Reports",
    icon: assets.report,
    path: "#",
    notification: 0,
  },
  Templates: {
    title: "Templates",
    icon: assets.template,
    path: "#",
    notification: 0,
  },

};

export default SidebarConfig;
