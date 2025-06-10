import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Accessory {
  id: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class AccessoryService {
  private url = 'api/accessories';

  constructor(private http: HttpClient) {}

  getAccessories(): Observable<Accessory[]> {
    return this.http.get<Accessory[]>(this.url);
  }

  getAccessory(id: number): Observable<Accessory> {
    return this.http.get<Accessory>(`${this.url}/${id}`);
  }

  addAccessory(accessory: Accessory): Observable<Accessory> {
    return this.http.post<Accessory>(this.url, accessory);
  }

  deleteAccessory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}

