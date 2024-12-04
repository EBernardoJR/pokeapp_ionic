import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any = {
    pokemon: [],
    name: '',
    email: ''
  };

  setData(key: string, value: any) {
    if (key === 'name' || key === 'email') {
      this.data[key] = value;
    } 
    if (this.data?.hasOwnProperty(key) && !this.data[key]?.includes(value)) {
      value = [...this.data[key], value];
      this.data = { ...this.data, [key]: value };
    }
  }

  getData(key: string) {
    return this.data[key] || null;  
  }
}
