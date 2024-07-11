'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@nextui-org/input";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get('query')?.toString());
    const pathname = "/"
    const { replace } = useRouter();

    function handleSearchSubmit() {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <form
            className="w-full"
            onSubmit={
                (e) => {
                    e.preventDefault();
                    handleSearchSubmit();
                }
            }>
            <Input
                placeholder={placeholder}
                onChange={(e) => {
                    setTerm(e.target.value);
                }}
                value={term}
                endContent={<MagnifyingGlassIcon className="h-6 w-6 text-gray-400 cursor-pointer" onClick={
                    () => {
                        handleSearchSubmit();
                    }
                } />}
            >
            </Input>
        </form>

    );
}