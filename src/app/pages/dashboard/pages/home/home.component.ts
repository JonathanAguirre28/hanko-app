import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  data = [
    { month: 'Enero', value: 10 },
    { month: 'Febrero', value: 15 },
    { month: 'Marzo', value: 17 },
    { month: 'abril', value: 22 },
    { month: 'mayo', value: 15 },
    { month: 'junio', value: 27 },
    { month: 'julio', value: 24 },
  ];

  lineChartData: any[] = [
    {
      data: this.data.map((item) => item.value),
      label: 'Ventas Mensuales',
      type: 'line',
    },
  ];

  lineChartLabels: string[] = this.data.map((item) => item.month);
}
