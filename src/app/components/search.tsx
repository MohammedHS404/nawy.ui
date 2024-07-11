'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname,useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    return (
        <Input
            placeholder={placeholder}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get('query')?.toString()}
            endContent={<MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />}
        >
        </Input>
    );
}