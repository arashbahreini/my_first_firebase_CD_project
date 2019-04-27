import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GithubService } from './github.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

let httpClientSpy: { get: jasmine.Spy };
let gitHubService: GithubService;

let httpClient: HttpClient;

describe('GithubService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.get(HttpClient);

    gitHubService = new GithubService(httpClient);
  });

  // it('Should return appropriate data from Github API', () => {
  //   // Arrenge
  //   // https://api.github.com/users/arashbahreini/events
  //   const expectedValue = [
  //     { public: true }
  //   ];

  //   httpClient.get<any>(`https://api.stackexchange.com/2.2/users/3773888/answers?page=1&pagesize=5&order
  //   =desc&sort=votes&site=stackoverflow`).subscribe(data => {
  //     // expect(data[0].public).toEqual(false);
  //     debugger;
  //   });

  //   // Act
  //   httpClientSpy.get.and.returnValue(of(expectedValue));
  //   // gitHubService.getGithubEvents().subscribe(x => {
  //   //   debugger;
  //   // });
  //   // Aassert
  // });
});
