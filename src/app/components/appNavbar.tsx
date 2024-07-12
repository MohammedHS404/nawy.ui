'use client'

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
} from "@nextui-org/navbar";
import Search from "./search";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function AppNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const urlSearchParams = new URLSearchParams(searchParams.toString());

    const currentShowFilters = searchParams.get('showFilters') === 'true';

    function handleFiltersClick() {
        const showFilters = !currentShowFilters;
        urlSearchParams.set('showFilters', showFilters.toString());
        replace(`${pathname}?${urlSearchParams.toString()}`);
    }

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="full" className="px-2 border-b-1 border-gray-200">
            <NavbarContent justify="start">
                <NavbarBrand>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarItem>
                        <Link color="foreground" href="#">
                            <Image src="/nawy.svg" width={80} height={80} className="h-8" alt="Nawy Logo" />
                        </Link>
                    </NavbarItem>
                </NavbarBrand>
            </NavbarContent>
            <NavbarContent className="hidden sm:flex gap-4 w-1/2 lg:w-1/3" justify="center">
                <Search placeholder="Area, Compound, Real Estate Developer"></Search>
                <Button isIconOnly onClick={(e) => {
                    e.preventDefault();
                    handleFiltersClick();
                }} >
                    <AdjustmentsHorizontalIcon height={24}></AdjustmentsHorizontalIcon>
                </Button>
            </NavbarContent>
            <NavbarContent justify="end">
            </NavbarContent>
        </Navbar>
    );
}