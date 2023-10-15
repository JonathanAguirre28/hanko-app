import { Component, OnInit } from '@angular/core';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.isLoading.subscribe((isLoading: boolean) => {
      console.log('isLoading', isLoading);
      this.isLoading = isLoading;
    });
  }

  ngOnInit(): void {}
}
