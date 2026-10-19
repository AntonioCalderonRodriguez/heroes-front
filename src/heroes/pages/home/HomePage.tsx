
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { CustomJumbotron } from "../../../components/custom/CustomJumbotron"
import { HeroStats } from "../../components/HeroStats"
import { HeroGrid } from "../../components/HeroGrid"
import { use, useMemo } from "react"
import { CustomPagination } from "../../../components/custom/CustomPagination"
import { CustomBreadCrumbs } from "../../../components/custom/CustomBreadCrumbs"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "../../hooks/useHeroSummary"
import { usePaginateHero } from "../../hooks/usePaginateHero"
import { FavoriteHeroContext } from "../../context/FavoriteHeroContext"

export const HomePage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { favoriteCount, favorites } = use(FavoriteHeroContext);

    const activeTab = searchParams.get('tab') ?? 'all';
    const page = searchParams.get('page') ?? '1';
    const limit = searchParams.get('limit') ?? '6';
    const category = searchParams.get('category') ?? 'all';

    const selectedTab = useMemo(() => {
        const validTabs = ['all','favorites','heroes','villains'];
        return validTabs.includes(activeTab) ? activeTab : 'all';
    }, [activeTab]);

    // const [activeTab, setActiveTab] = useState<
    //     'all' | 'favorites' | 'heroes' | 'villains'
    // >('all');



    // const { data: heroesResponse } = useQuery({
    //     queryKey: ['heroes', {page, limit}],
    //     queryFn: () => getHeroesByPageAction(+page, +limit),
    //     staleTime: 1000 * 60 * 5
    // });

    const { data: heroesResponse } = usePaginateHero({page: +page, limit: +limit, category});

    const { data: summary } = useHeroSummary();

    return (
        <>
            <>
                {/* Header */}
                <CustomJumbotron title="Universo de SuperHeroes" description="Descubre, explora y administra Heroes y Villanos" />

                <CustomBreadCrumbs currentPage="Super Heroes" />
                {/* Stats Dashboard */}
                <HeroStats />

                {/* Tabs */}
                <Tabs value={selectedTab} className="mb-8">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="all"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'all');
                                    prev.set('category', 'all');
                                    prev.set('page', '1');
                                    return prev;
                                })
                            }
                        >
                            All Characters ({  summary?.totalHeroes })</TabsTrigger>
                        <TabsTrigger value="favorites"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'favorites');
                                    return prev;
                                })
                            }
                        >
                            Favorites ({favoriteCount})
                        </TabsTrigger>
                        <TabsTrigger value="heroes"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'heroes');
                                    prev.set('category', 'hero');
                                    prev.set('page', '1');
                                    return prev;
                                })
                            }
                        >
                            Heroes ({  summary?.heroCount })</TabsTrigger>
                        <TabsTrigger value="villains"
                            onClick={() =>
                                setSearchParams((prev) => {
                                    prev.set('tab', 'villains');
                                    prev.set('category', 'villain');
                                    prev.set('page', '1');
                                    return prev;
                                })
                            }
                        >
                            Villains ({  summary?.villainCount })</TabsTrigger>
                    </TabsList>
                    <TabsContent value='all'>
                        {/* Mostrar todos los personajes */}
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value='favorites'>
                        <h1>Favoritos!</h1>
                        <HeroGrid heroes={favorites} />
                    </TabsContent>
                    <TabsContent value='heroes'>
                        <h1>Heroes</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                    <TabsContent value='villains'>
                        <h1>Villanos</h1>
                        <HeroGrid heroes={heroesResponse?.heroes ?? []} />
                    </TabsContent>
                </Tabs>



                {/* Pagination */}
                {selectedTab !== 'favorites' && (
                    <CustomPagination totalPages={heroesResponse?.pages ?? 0} />
                )}
                
            </>
        </>
    )
}