import { Interceptor, InterceptedRequest, InterceptedResponse } 
from 'ng2-interceptors';

export class AppServiceInterceptors implements Interceptor {
    public interceptBefore(request: InterceptedRequest): InterceptedRequest {
        // 修改请求
      return request; 
    }
    public interceptAfter(response: InterceptedResponse): InterceptedResponse {
        return response;
    }

}