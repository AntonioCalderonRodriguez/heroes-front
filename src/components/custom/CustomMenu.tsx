import { Link, useLocation } from "react-router"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu"
import { cn } from "../../lib/utils";
// import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"

export const CustomMenu = () => {

    const { pathname } = useLocation();

    const isActive = (path: string) => pathname === path;

    return (
        <>
            <NavigationMenu className="py-10">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(isActive('/') && 'bg-slate-200', 'rounded-md p-2')} render={<Link to="/" />}>
                            Inicio
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuLink className={cn(isActive('/search') && 'bg-slate-200', 'rounded-md p-2')} render={<Link to="/search" />}>
                            Buscar superHeroes
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

        </>
    )
}
