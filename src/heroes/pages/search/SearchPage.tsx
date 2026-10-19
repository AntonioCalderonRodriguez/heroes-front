import { useSearchParams } from "react-router";
import { CustomBreadCrumbs } from "../../../components/custom/CustomBreadCrumbs";
import { CustomJumbotron } from "../../../components/custom/CustomJumbotron";
import { HeroStats } from "../../components/HeroStats";
import { useSearch } from "../../hooks/useSearch";
import { SearchControls } from "./ui/SearchControls";
import { HeroGrid } from "../../components/HeroGrid";

export const SearchPage = () => {

    const [searchParams] = useSearchParams();
    const { data: heroes } = useSearch(searchParams.get('name') ?? '', searchParams.get('strength') ?? '');
    
  
    return (
        <>
            <CustomJumbotron title="Busqueda de SuperHeroes" description="Descubre, explora y administra Heroes y Villanos" />
            <CustomBreadCrumbs currentPage="Buscador de Heroes" breadCrumbs={[
                { label: 'home', to: "/" },
                { label: 'home2', to: "/" },
                { label: 'home3', to: "/" }
            ]} />
            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and search */}
            <SearchControls />

            <HeroGrid heroes={heroes ?? []} />
        </>
    )
}

export default SearchPage;
