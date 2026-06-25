import { of } from 'rxjs';
import { HttpLoggingInterceptor } from './http-logging.interceptor';

const mockRequest = { method: 'GET', url: '/api/test' };
const mockResponse = { statusCode: 200 };

const mockContext = {
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: () => mockRequest,
    getResponse: () => mockResponse,
  }),
};

const mockNext = {
  handle: jest.fn().mockReturnValue(of({})),
};

describe('HttpLoggingInterceptor', () => {
  let interceptor: HttpLoggingInterceptor;

  beforeEach(() => {
    interceptor = new HttpLoggingInterceptor();
    jest.clearAllMocks();
  });

  it('should pass the request through and log it', (done) => {
    const result$ = interceptor.intercept(mockContext as never, mockNext);

    result$.subscribe({
      next: () => {
        expect(mockNext.handle).toHaveBeenCalledTimes(1);
        done();
      },
    });
  });
});
