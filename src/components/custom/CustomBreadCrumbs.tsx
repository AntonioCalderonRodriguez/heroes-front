import { Link } from "react-router";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "../ui/breadcrumb"

interface BreadCrumb {
    label: string;
    to: string;
}

interface Props {
    currentPage: string;
    breadCrumbs?: BreadCrumb[];
}

export const CustomBreadCrumbs = ({ currentPage, breadCrumbs }: Props) => {
    return (
        <>
            <Breadcrumb className="my-5">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link to="/">
                                Inicio
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    {breadCrumbs?.map(crumb => (
                        <div className="flex items-center">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link to={crumb.to}>
                                        {crumb.label}
                                    </Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </div>
                    ))}
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="text-black">
                            {currentPage}
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {/* <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                    </BreadcrumbItem> */}
                </BreadcrumbList>
            </Breadcrumb>
        </>
    )
}

