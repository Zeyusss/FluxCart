import { TestBed } from '@angular/core/testing';

import { AuthActionFacade } from './auth-action-facade';

describe('AuthActionFacade', () => {
  let service: AuthActionFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthActionFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
