interface ISidebarMenuItem {
	label: string;
	path: string;
}
export interface ISidebar {
	menu: boolean;
	label: string;
	path?: string;
	basePath?: string;
	menuItems?: ISidebarMenuItem[];
}
