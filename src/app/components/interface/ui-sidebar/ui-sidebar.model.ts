import { ROUTE } from "../../../shared/enums/route.enum";
import { UI_ICON } from "../../../shared/enums/ui-icons.num";

export interface UiSidebar {
  name: string;
  icon: UI_ICON;
  roles: string[];
  order: number;
  link: ROUTE;
}