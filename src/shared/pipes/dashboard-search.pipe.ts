import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashboardSearch'
})
export class DashboardSearchPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(function(item) {
      return JSON.stringify(item)
        .toLowerCase()
        .includes(searchText);
    });
  }
}
