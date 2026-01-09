import { TestBed } from '@angular/core/testing';

import { AuthEffect } from './auth-effect';

describe('AuthEffect', () => {
  let service: AuthEffect;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthEffect);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
