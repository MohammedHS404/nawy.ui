'use client'

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "../components/carousel/carousel";
import { PropertyResponse } from "../types/propertyResponse";
import Image from "next/image";
import { imageShimmerBase64 } from "../components/ImageShimmerSrc";
import { Skeleton } from "@nextui-org/skeleton";
function getProperty(slug: string) {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/property/${slug}`;

    return fetch(url)
        .then((res) => res.json());
}

export default function Property() {
    const [property, setProperty] = useState<PropertyResponse>(null);

    const [loading, setLoading] = useState(true);

    const { slug } = useParams();

    if (Array.isArray(slug)) {
        return <div>Invalid slug</div>;
    }

    useEffect(() => {
        setLoading(true);
        getProperty(slug).then((property) => {
            setProperty(property);
        }).finally(() => {
            setLoading(false);
        })
    }, []);

    return (
        <div className="px-8">
            <div className="container mx-auto">
                <div className="w-full">
                    {
                        loading ? <Skeleton className='w-full h-[720px]'></Skeleton> : <Carousel images={property.images} />
                    }
                </div>
                <br />
                <div>
                    {loading ? <Skeleton className='w-full h-[40px]'></Skeleton> : <h1 className="text-3xl font-bold mb-4">{property.title}</h1>}
                </div>
                <br />
                <div>
                    {
                        loading ? <Skeleton className='w-full h-[60px]'></Skeleton> : <>
                            <p className="text-xl font-semibold mb-2">{property.minPrice} EGP - {property.maxPrice} EGP</p>
                        </>
                    }
                </div>
                <br />
                <div>
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    {loading ? <Skeleton className='w-full h-[500px]'></Skeleton> : <p className="mb-4" dangerouslySetInnerHTML={{ __html: property.description }}></p>}
                </div>
                <br />
                <div>
                    <h2 className="text-2xl font-bold mb-4">Amenities</h2>
                    {
                        loading ? <Skeleton className='w-full h-[300px]'></Skeleton> : <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Bedrooms:</p>
                                    <p>{property.bedrooms}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Bathrooms:</p>
                                    <p>{property.bathrooms}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Area:</p>
                                    <p>{property.minArea} - {property.maxArea} m²</p>
                                </div>
                            </div>
                        </>
                    }
                </div>
                <br />
                <div>
                    <h2 className="text-2xl font-bold mb-4">Gallery</h2>
                    {
                        loading ? <Skeleton className='w-full h-[300px]'></Skeleton> : (property.images?.length && <div className="mt-8">
                            <div className="grid grid-cols-4 gap-4">
                                {property.images.map((image, index) => (
                                    <Image key={index} width={480} height={480} src={image} alt={`Image ${index}`} className="w-full" placeholder={
                                        'data:image/svg+xml;base64,' + imageShimmerBase64(480, 480)
                                    } />
                                ))}
                            </div>
                        </div>)
                    }
                </div>
                <br />
                <div>
                    <h2 className="text-2xl font-bold mb-4">Floor Plans</h2>
                    {loading ? <Skeleton className='w-full h-[300px]'></Skeleton> : (property.plans?.length && <div className="mt-8">
                        <div className="grid grid-cols-4 gap-4">
                            {property.plans.map((floorPlan, index) => (
                                <Image key={index} width={480} height={480} src={floorPlan} alt={`Floor Plan ${index}`} className="w-full"
                                    placeholder={
                                        'data:image/svg+xml;base64,' + imageShimmerBase64(480, 480)
                                    } />
                            ))}
                        </div>
                    </div>)
                    }
                </div>
                <br />
                <div>
                    <h2 className="text-2xl font-bold mb-4">Location</h2>

                    {
                        loading ? <Skeleton className='w-full h-[400px]'></Skeleton> : (property.location_lat && property.location_lon && <div className="mt-8">
                            <iframe
                                width="100%"
                                height="400"
                                src={`https://maps.google.com/maps?q=${property.location_lat},${property.location_lon}&z=15&output=embed`}
                            />
                        </div>)
                    }
                </div>
            </div>
        </div >
    );
}