'use client'

import { Pagination } from "@nextui-org/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";


export default function SearchPagination({ totalPages }: { totalPages: number }) {

    const searchParams = useSearchParams();

    const urlSearchParams = new URLSearchParams(searchParams.toString());

    const { replace } = useRouter();

    const pathname = usePathname();

    const page = searchParams.get('page');

    const currentPage = Number(page) || 1;

    return <Pagination
        showControls
        total={totalPages}
        initialPage={1}
        page={currentPage}
        onChange={(page) => {
            urlSearchParams.set('page', page.toString());
            replace(`${pathname}?${urlSearchParams.toString()}`);
        }}
        color="default"
    />
}