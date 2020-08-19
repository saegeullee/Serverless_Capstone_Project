import { Responses } from '../../src/common/API_Responses';

describe.only('testing API_Responses..', () => {
  it('Response is object', () => {
    expect(typeof Responses).toBe('object');
  });

  it('_200 works', () => {
    const res = Responses._200({ name: 'louies' });
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe('string');
    expect(res.headers['Content-Type']).toBe('application/json');
    expect(res.headers['Access-Control-Allow-Methods']).toBe('*');
    expect(res.headers['Access-Control-Allow-Origin']).toBe('*');
  });

  it('_400 works', () => {
    const res = Responses._400({ name: 'louies' });
    expect(res.statusCode).toBe(400);
  });

  it('_404 works', () => {
    const res = Responses._404({ name: 'louies' });
    expect(res.statusCode).toBe(404);
  });

  it('define response', () => {
    const res = Responses._DefineResponse(401, { name: 'louies' });
    expect(res.statusCode).toBe(401);
    expect(res.body).toBe(JSON.stringify({ name: 'louies' }));
  });
});
