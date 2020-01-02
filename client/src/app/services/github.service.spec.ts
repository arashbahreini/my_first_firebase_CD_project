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

});
