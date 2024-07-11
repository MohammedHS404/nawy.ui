'use client'

import Image from 'next/image'
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PropertyResponse } from "./types/propertyResponse";
import AppPagination from './components/appPagination';
import { Skeleton } from '@nextui-org/skeleton';
import { useDebouncedCallback } from 'use-debounce';
import { imageShimmerBase64 } from './ImageShimmerSrc';
import { PaginationDto, PropertyFiltersDto, PropertyListRequest } from './types/PropertyListRequest';

interface GetPropertiesResponse {
  properties: PropertyResponse[];
  totalCount: number;
}

async function getProperties(request: PropertyListRequest): Promise<GetPropertiesResponse> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/property/list`;

  const body: PropertyListRequest = request;

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json() as Promise<GetPropertiesResponse>);
}

export default function Home() {
  const [data, setData] = useState<GetPropertiesResponse>({ totalCount: 0, properties: [] });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<PropertyFiltersDto>(PropertyFiltersDto.createFromSearchParams(searchParams));

  const currentPage = Number(searchParams.get('page')) || 1;

  const debouncedSetLoading = useDebouncedCallback((value: boolean) => {
    setLoading(value);
  }, 500);

  const pagination: PaginationDto = new PaginationDto({ page: currentPage });

  const paginationRequest = new PropertyListRequest({ filters, pagination });

  useEffect(() => {
    setLoading(true);

    getProperties(paginationRequest)?.then((response) => {
      setData(response);
    }).catch((error) => {
      setError(error);
    })
      .finally(() => {
        debouncedSetLoading(false)
      })
  }, [currentPage, filters]);

  useEffect(() => {
    setFilters(PropertyFiltersDto.createFromSearchParams(searchParams));
  }, [...PropertyFiltersDto.createDependencyListFromSearchParams(searchParams)]);

  if (error) {
    return <div>Failed to load...</div>;
  }

  const totalPages = Math.ceil(data.totalCount / 24);

  const cards = [];

  if (loading) {
    for (let i = 0; i < 6; i++) {
      cards.push(<PropertyCard key={i} loading={true}></PropertyCard>);
    }
  }
  else {
    for (let i = 0; i < data.properties.length; i++) {
      cards.push(<PropertyCard key={data.properties[i].id} property={data.properties[i]}></PropertyCard>);
    }
  }

  const propertiesCount = loading ? 'loading' : data.totalCount;

  const paginationComponent = loading ? <></> : <AppPagination totalPages={totalPages} />;

  return (
    <div className='p-8'>
      <div className="text-left my-2 flex items-center"><span className='text-2xl font-bold'> Properties</span><span className='ml-2 text-xl'>{propertiesCount}</span></div>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-8">
        {cards}
      </div>
      <div className="flex justify-center pb-8 pt-8">
        {paginationComponent}
      </div>
    </div>
  );
}

function PropertyCard({ property, loading }: { property?: PropertyResponse, loading?: boolean }) {
  if (!property && !loading) {
    return <></>;
  }

  if (!property) {
    property = {} as PropertyResponse;
  }

  return (
    <div className="w-full cursor-pointer transform rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      {loading ?
        <Skeleton className="h-72 w-full object-cover object-center"></Skeleton> :
        <Image
          className="h-72 w-full object-cover object-center"
          width={400}
          height={400}
          src={property?.images?.at(0) ?? ''}
          alt="Product Image"
          placeholder={`data:image/svg+xml;base64,${imageShimmerBase64(700, 475)}`}
        />
      }
      <div className="p-4">
        <div className="mb-4">
          {loading ? <Skeleton></Skeleton> : <h2 className="mb-1 text-md font-semibold  text-gray-900">{property.title}</h2>}
          {loading ? <Skeleton></Skeleton> : <h3 className="text-sm  text-gray-800">{property.address_city},{property.address_state},{property.address_country}</h3>}
        </div>
        <div className="flex gap-2 text-md text-gray-600 mb-4">
          {
            loading ?
              <Skeleton className='h-8 w-full'></Skeleton> :
              <>
                <span>
                  <span className="font-semibold">
                    Bedrooms:
                  </span>
                  {property.bedrooms}
                </span>
                |&nbsp;
                <span>
                  <span className="font-semibold">
                    Bathrooms:
                  </span>
                  {property.bathrooms}
                </span>
                |&nbsp;
                <span>
                  <span className="font-semibold">
                    Area:
                  </span>
                  {property.minArea} m<sup>2</sup>
                </span>
              </>
          }
        </div>
        <div className="flex items-center">
          {
            loading ?
              <Skeleton className='h-4 w-full'></Skeleton> :
              <p className="mr-2 text-xl font-bold text-gray-900">{Number(property.minPrice).toLocaleString('en')} EGP</p>
          }
        </div>
      </div>
    </div>);
}

