import { Client, GeocodeResponse, GeocodeResult, LatLngLiteral } from '@googlemaps/google-maps-services-js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleMapsService extends Client {
  private readonly accessKey = process.env.GOOGLE_MAPS_API_KEY;

  async getGeocoding(address: {
    street: string;
    number: string;
    city: string
  }): Promise<GeocodeResult> {
    const googleRes: GeocodeResponse = await this.geocode({
      params: {
        address: `${address.street} ${address.number}, ${address.city}}`,
        key: this.accessKey,
      },
    });

    return googleRes.data.results[0];
  }
}