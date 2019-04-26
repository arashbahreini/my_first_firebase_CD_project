import { TestBed } from '@angular/core/testing';

import { GithubService } from './github.service';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let gitHubService: GithubService;

describe('GithubService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
    gitHubService = new GithubService(httpClientSpy as any);
  });

  it('Should return appropriate data from Github API', () => {
    // Arrenge
    const expectedValue = [
      { public: true }
    ];

    // Act
    httpClientSpy.get.and.returnValue(of(expectedValue));
    gitHubService.getGithubEvents().subscribe(x => {
    });
    // Aassert
  });
  // it('should be created', () => {
  //   const service: GithubService = TestBed.get(GithubService);
  //   expect(service).toBeTruthy();
  // });
});
