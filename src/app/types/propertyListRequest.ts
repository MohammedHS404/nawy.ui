import { ReadonlyURLSearchParams } from "next/navigation";

export class PropertyListRequest {
    public pagination?: PaginationDto;
    public filters?: PropertyFiltersDto;

    public constructor(params: {
        pagination?: PaginationDto;
        filters?: PropertyFiltersDto;
    }) {
        this.pagination = params.pagination;
        this.filters = params.filters;
    }
}

export class PaginationDto {
    public page: number = 1;
    public limit: number = 24;
    public sortBy?: string = 'id';
    public sortOrder?: 'asc' | 'desc' = 'asc';

    public constructor(params: {
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: 'asc' | 'desc';
    }) {
        this.page = params.page ?? 1;
        this.limit = params.limit ?? 24;
        this.sortBy = params.sortBy ?? 'id';
        this.sortOrder = params.sortOrder ?? 'asc';
    }
}

export class PropertyFiltersDto {
    public query?: string;

    public type?: string;

    public minPrice?: number;

    public maxPrice?: number;

    public minBedrooms?: number;

    public maxBedrooms?: number;

    public minBathrooms?: number;

    public maxBathrooms?: number;

    public minArea?: number;

    public maxArea?: number;

    public constructor(params: {
        query?: string;
        type?: string;
        minPrice?: number;
        maxPrice?: number;
        minBedrooms?: number;
        maxBedrooms?: number;
        minBathrooms?: number;
        maxBathrooms?: number;
        minArea?: number;
        maxArea?: number;
    }) {
        this.query = params.query;
        this.type = params.type;
        this.minPrice = params.minPrice;
        this.maxPrice = params.maxPrice;
        this.minBedrooms = params.minBedrooms;
        this.maxBedrooms = params.maxBedrooms;
        this.minBathrooms = params.minBathrooms;
        this.maxBathrooms = params.maxBathrooms;
        this.minArea = params.minArea;
        this.maxArea = params.maxArea;
    }

    public static createFromSearchParams(searchParams: ReadonlyURLSearchParams) {
        const parsedParams = this.getParsedParamsFromSearchParams(searchParams);

        const filters = new PropertyFiltersDto({
            query: parsedParams.query,
            type: parsedParams.type,
            minPrice: parsedParams.minPrice,
            maxPrice: parsedParams.maxPrice,
            minBedrooms: parsedParams.minBedrooms,
            maxBedrooms: parsedParams.maxBedrooms,
            minBathrooms: parsedParams.minBathrooms,
            maxBathrooms: parsedParams.maxBathrooms,
            minArea: parsedParams.minArea,
            maxArea: parsedParams.maxArea
        });

        return filters;
    };

    public static createDependencyListFromSearchParams(searchParams: ReadonlyURLSearchParams) {

        const parsedParams = this.getParsedParamsFromSearchParams(searchParams);

        return [
            parsedParams.query,
            parsedParams.type,
            parsedParams.minPrice,
            parsedParams.maxPrice,
            parsedParams.minBedrooms,
            parsedParams.maxBedrooms,
            parsedParams.minBathrooms,
            parsedParams.maxBathrooms,
            parsedParams.minArea,
            parsedParams.maxArea,
            parsedParams.type
        ];
    }

    private static getParsedParamsFromSearchParams(searchParams: ReadonlyURLSearchParams) {
        const query = searchParams.get('query') || '';
        const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : 0;
        const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 0;
        const minBedrooms = searchParams.get('minBedrooms') ? Number(searchParams.get('minBedrooms')) : 0;
        const maxBedrooms = searchParams.get('maxBedrooms') ? Number(searchParams.get('maxBedrooms')) : 0;
        const minBathrooms = searchParams.get('minBathrooms') ? Number(searchParams.get('minBathrooms')) : 0;
        const maxBathrooms = searchParams.get('maxBathrooms') ? Number(searchParams.get('maxBathrooms')) : 0;
        const minArea = searchParams.get('minArea') ? Number(searchParams.get('minArea')) : 0;
        const maxArea = searchParams.get('maxArea') ? Number(searchParams.get('maxArea')) : 0;
        const type = searchParams.get('type') || '';

        return {
            query,
            type,
            minPrice,
            maxPrice,
            minBedrooms,
            maxBedrooms,
            minBathrooms,
            maxBathrooms,
            minArea,
            maxArea
        };
    }
}