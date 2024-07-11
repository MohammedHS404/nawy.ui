'use client'
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const AppPropertyFilters = () => {

    const router = useRouter();
    const pathname = "/"
    const searchParams = useSearchParams();
    const urlSearchParams = new URLSearchParams(searchParams.toString());
    const showFilters = searchParams.get('showFilters') == 'true';

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || "");

    const [minBedrooms, setMinBedrooms] = useState(searchParams.get('minBedrooms') || "");

    const [maxBedrooms, setMaxBedrooms] = useState(searchParams.get('maxBedrooms') || "");

    const [minBathrooms, setMinBathrooms] = useState(searchParams.get('minBathrooms') || "");

    const [maxBathrooms, setMaxBathrooms] = useState(searchParams.get('maxBathrooms') || "");

    const [minArea, setMinArea] = useState(searchParams.get('minArea') || "");

    const [maxArea, setMaxArea] = useState(searchParams.get('maxArea') || "");


    const handleFilterChange = () => {
        if (minPrice) urlSearchParams.set('minPrice', minPrice);
        else urlSearchParams.delete('minPrice');

        if (maxPrice) urlSearchParams.set('maxPrice', maxPrice);
        else urlSearchParams.delete('maxPrice');

        if (minBedrooms) urlSearchParams.set('minBedrooms', minBedrooms);
        else urlSearchParams.delete('minBedrooms');

        if (maxBedrooms) urlSearchParams.set('maxBedrooms', maxBedrooms);
        else urlSearchParams.delete('maxBedrooms');

        if (minBathrooms) urlSearchParams.set('minBathrooms', minBathrooms);
        else urlSearchParams.delete('minBathrooms');

        if (maxBathrooms) urlSearchParams.set('maxBathrooms', maxBathrooms);
        else urlSearchParams.delete('maxBathrooms');

        if (minArea) urlSearchParams.set('minArea', minArea);
        else urlSearchParams.delete('minArea');

        if (maxArea) urlSearchParams.set('maxArea', maxArea);
        else urlSearchParams.delete('maxArea');

        router.replace(`${pathname}?${urlSearchParams.toString()}`);
    };

    const clearFilterChange = () => {
        setMinPrice('');
        setMaxPrice('');
        setMinBedrooms('');
        setMaxBedrooms('');
        setMinBathrooms('');
        setMaxBathrooms('');
        setMinArea('');
        setMaxArea('');
    };

    if (!showFilters) {
        return <></>
    }

    return (
        <form className='w-full p-6'
            onSubmit={
                (e) => {
                    e.preventDefault();
                    handleFilterChange();
                }
            }
        >
            <div className='h-full w-full grid grid-cols-4 gap-8'>
                <Input
                    type='number'
                    isClearable
                    label="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    onClear={() => setMinPrice('')}
                />

                <Input
                    type='number'
                    isClearable
                    label="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    onClear={() => setMaxPrice('')}
                />

                <Input
                    type='number'
                    isClearable
                    label="Min Bedrooms"
                    value={minBedrooms}
                    onChange={(e) => setMinBedrooms(e.target.value)}
                    onClear={() => setMinBedrooms('')}
                />


                <Input
                    type='number'
                    isClearable
                    label="Max Bedrooms"
                    value={maxBedrooms}
                    onChange={(e) => setMaxBedrooms(e.target.value)}
                    onClear={() => setMaxBedrooms('')}
                />


                <Input
                    type='number'
                    isClearable
                    label="Min Bathrooms"
                    value={minBathrooms}
                    onChange={(e) => setMinBathrooms(e.target.value)}
                    onClear={() => setMinBathrooms('')}
                />


                <Input
                    type='number'
                    isClearable
                    label="Max Bathrooms"
                    value={maxBathrooms}
                    onChange={(e) => setMaxBathrooms(e.target.value)}
                    onClear={() => setMaxBathrooms('')}
                />


                <Input
                    type='number'
                    isClearable
                    label="Min Area"
                    value={minArea}
                    onChange={(e) => setMinArea(e.target.value)}
                    onClear={() => setMinArea('')}
                />


                <Input
                    type='number'
                    isClearable
                    label="Max Area"
                    value={maxArea}
                    onChange={(e) => setMaxArea(e.target.value)}
                    onClear={() => setMaxArea('')}
                />

                <input type='submit' className='hidden' />
            </div>
            <div className='flex justify-end mt-4 space-x-2'>
                <Button onClick={clearFilterChange}>Clear</Button>
                <Button onClick={handleFilterChange}>Apply Filters</Button>
            </div>
        </form>
    );
};

export default AppPropertyFilters;
