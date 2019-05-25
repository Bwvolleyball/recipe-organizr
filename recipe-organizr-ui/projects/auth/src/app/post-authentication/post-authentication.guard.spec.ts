import { TestBed, async, inject } from '@angular/core/testing';

import { PostAuthenticationGuard } from './post-authentication.guard';

describe('PostAuthenticationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostAuthenticationGuard]
    });
  });

  it('should ...', inject([PostAuthenticationGuard], (guard: PostAuthenticationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
