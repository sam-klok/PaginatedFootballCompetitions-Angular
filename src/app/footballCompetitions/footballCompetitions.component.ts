import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import { Observable } from 'rxjs';

interface Competition {
  name: string;
  country: string;
  year: number;
  winner: string;
  runnerup: string;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Competition[];
}

@Component({
  selector: 'football-competitions',
  templateUrl: './footballCompetitions.component.html',
  styleUrls: ['./footballCompetitions.component.scss']
})
export class FootballCompetitions implements OnInit {
  //apiResponse: ApiResponse;
  totalPages: any = [];
  competitionDetails: Competition[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.loadDetailsByPage(1);
  }

  loadDetailsByPage(pageNumber){
    this.getCompetitionDetails(pageNumber).subscribe(resData=>{
      //console.log(resData);
      
      //this.apiResponse = resData;
      //console.log(this.apiResponse);

      //this.totalPages = this.apiResponse.total_pages;
      //console.log("Total Pages="+this.totalPages);

      this.totalPages = Array(resData.total_pages).fill(null).map((x,i)=>i);
      this.competitionDetails = resData.data;
      //console.log(this.competitionDetails);
    })
  }

  getCompetitionDetails(pageNumber: any): Observable<ApiResponse>{
    // https://jsonmock.hackerrank.com/api/articles?author=epaga&page=1
    // `https://jsonmock.hackerrank.com/api/football_competitions?page=<pageNumber>`

    const URL = "https://jsonmock.hackerrank.com/api/football_competitions?page=" + pageNumber;
    return this.http.get<ApiResponse>(URL).pipe(map(data => data));
  }

}
