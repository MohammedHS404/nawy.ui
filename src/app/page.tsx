import { PropertyListResponse } from "./types/property.list.response";

async function getProperties() {
  const url = `${process.env.API_URL}/property/list`;

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json() as Promise<PropertyListResponse[]>);
}

export default async function Home() {
  const properties = await getProperties();

  return (
    <div className="grid grid-cols-3 justify-items-center gap-8 p-8 cursor-pointer">
      {properties.map((property) => (
        <div className="transform rounded-lg bg-white  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
          <img className="h-72 w-full object-cover object-center" src={property.images?.at(0) ?? 'https://s3.eu-central-1.amazonaws.com/prod.images.cooingestate.com/admin/property_image/image/99183/0-Shot_4.jpg'} alt="Product Image" />
          <div className="p-4">
            <div className="mb-4">
              <h2 className="mb-1 text-md font-semibold  text-gray-900">{property.title}</h2>
              <h3 className="text-sm  text-gray-800">{property.address_city},{property.address_state},{property.address_country}</h3>
            </div>
            <div className="flex gap-2 text-md text-gray-600 mb-4">
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
                {property.minArea}m<sup>2</sup>
              </span>
            </div>
            <div className="flex items-center">
              <p className="mr-2 text-xl font-bold text-gray-900">{Number(property.minPrice).toLocaleString('en')} EGP</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
