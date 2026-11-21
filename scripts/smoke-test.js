// Baseline smoke test with disposable data. Usage: SMOKE_BASE_URL=http://localhost:5000 npm run smoke
const base = (process.env.SMOKE_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
const runId = Date.now();

const request = async (method, path, body) => {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data = text;
  try {
    data = JSON.parse(text);
  } catch (e) {
    // non-JSON response body
  }
  return { status: res.status, data };
};

const check = (label, ok, detail) => {
  console.log(`${ok ? 'PASS' : 'FAIL'} ${label}${detail ? ` (${detail})` : ''}`);
  if (!ok) process.exitCode = 1;
};

(async () => {
  console.log(`Smoke test against ${base}`);

  const created = await request('POST', '/api/medication', {
    firstName: 'Smoke',
    lastName: `Test${runId}`,
    email: `smoke-${runId}@example.test`,
    phone: '+15550100000',
    address: 'Test address',
    avatarUrl: '',
    cronValue: process.env.SMOKE_CRON || '0 9 * * *',
  });
  check('create medication', created.status === 200 && created.data._id, `status ${created.status}`);

  const list = await request('GET', '/api/medications');
  const found = Array.isArray(list.data) && list.data.some((m) => m._id === created.data._id);
  check('list medications includes new record', list.status === 200 && found, `status ${list.status}, ${Array.isArray(list.data) ? list.data.length : 0} records`);

  const email = `smoke-user-${runId}@example.test`;
  const password = `pw-${runId}`;
  const signup = await request('POST', '/auth/signup', { name: 'Smoke User', email, password });
  check('signup', signup.status === 201 && signup.data.token && signup.data.data.user.password === undefined, `status ${signup.status}`);

  const login = await request('POST', '/auth/login', { email, password });
  check('login', login.status === 200 && Boolean(login.data.token), `status ${login.status}`);

  const badLogin = await request('POST', '/auth/login', { email, password: 'wrong-password' });
  check('login rejects wrong password', badLogin.status === 500 && badLogin.data === 'Incorrect email or password!', `status ${badLogin.status}`);
})().catch((error) => {
  console.error('FAIL smoke test aborted:', error.message);
  process.exitCode = 1;
});
