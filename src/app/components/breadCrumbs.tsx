'use client'

import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <div className="px-8 py-4">
            <Breadcrumbs>
                <BreadcrumbItem href="/">Listings</BreadcrumbItem>
                {pathNames.length > 0}
                {
                    pathNames.map((link, index) => {
                        let href = `/${pathNames.slice(0, index + 1).join('/')}`
                        return (
                            <BreadcrumbItem key={link} href={href}>{link}</BreadcrumbItem>
                        )
                    })
                }
            </Breadcrumbs>
        </div>
    )
}