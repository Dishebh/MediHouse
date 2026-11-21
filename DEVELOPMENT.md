# Local Development Setup

How to run MediHouse locally without Docker, MongoDB, Redis, Yarn, or production credentials.

## Supported versions

| Tool | Version |
| ---- | ------- |
| Node.js | 22.x (verified with 22.23.5; target environment uses 22.21) |
| npm | 10.x (verified with 10.9.9) |

Use npm only. Yarn and pnpm lockfiles are not maintained.

## Install

```sh
npm ci                                        # backend (repo root)
npm ci --prefix devdb --omit=optional         # local MongoDB-compatible dev database
npm ci --prefix client --legacy-peer-deps     # frontend
```

Both flags are required; the repo has no `.npmrc` files. Without `--legacy-peer-deps` the client install fails with `ERESOLVE` (see Known issues). Without `--omit=optional` the devdb install fetches or compiles the native `better-sqlite3` optional dependency of `@rckflr/easydb-server`, which the memory adapter doesn't use. With both flags, no install step downloads native binaries or compiles native code. The remaining install scripts (`nodemon`, `tesseract.js`) only print messages.

## Configure

```sh
cp .env.example .env
cp client/.env.example client/.env   # optional; the defaults already target localhost
```

`.env.example` contains only placeholder values:

- `SMS_DISABLED=true` and empty Twilio variables: reminders are logged, never sent.
- Dummy `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` let the Google OAuth strategy initialize. Google sign-in itself won't work.
- `MONGO_URI` points at the local dev database.

Never commit `.env` files or real credentials or phone numbers.

## Run

Use three terminals:

```sh
npm run db        # in-memory MongoDB-compatible server on 127.0.0.1:27017
npm start         # backend on http://localhost:5000
npm run client    # React dev server on http://localhost:3000
```

If port 27017 is taken, run `DEVDB_PORT=27018 npm run db` and set `MONGO_URI=mongodb://127.0.0.1:27018/medihouse` in `.env`.

In development, the React dev server proxies `/api` and `/auth` to `API_PROXY_TARGET` (default `http://localhost:5000`; see `client/src/setupProxy.js`). It never contacts the hosted API.

## Build and smoke test

```sh
CI=true npm run build --prefix client      # production build
npm run smoke                              # against the backend (http://localhost:5000)
SMOKE_BASE_URL=http://localhost:3000 npm run smoke   # through the dev-server proxy
```

The smoke test creates disposable records (`@example.test` emails, fictional `+1555010xxxx` number), then checks medication create and list, signup, login, and wrong-password rejection.

To check reminder scheduling, run `SMOKE_CRON='* * * * *' npm run smoke` and restart the backend while `npm run db` keeps running. The backend logs `Scheduled reminder for medication …`. Each minute it logs `SMS disabled: reminder not sent`.

## Database: approach and limitations

The app still uses Mongoose 6 and its existing models unchanged. For local development, `devdb/` runs [`@rckflr/easydb-server`](https://www.npmjs.com/package/@rckflr/easydb-server) `0.4.0` (pure JavaScript, MongoDB wire protocol) with its in-memory adapter. Verified operations: connect, `save`, `create`, `find().sort().limit()`, `findOne`, `findById`, `findByIdAndUpdate`.

Limitations:

- **No durability.** Data lives only while `npm run db` is running. Restarting the backend keeps the data; restarting the DB loses it.
- **No transactions.** The app doesn't use any.
- **Indexes aren't enforced.** `createIndexes` is a no-op, so unique constraints are never checked. The app defines none (duplicate signup emails are possible here, as on real MongoDB).
- **Full scans.** Every query loads and filters the whole collection in JavaScript. This is fine for development data sizes only.
- **No authentication.** The server binds to `127.0.0.1` only.
- **Young package.** It's pre-1.0, with a single published version and a single maintainer. It's pinned exactly, and its integrity hashes are recorded in `devdb/package-lock.json`. It's suitable for development and smoke tests only, never production.

Production deployments still need a real MongoDB-compatible `MONGO_URI`.

### PostgreSQL option (not configured, not verified)

easydb-server also has a `postgres` adapter, which needs the pure-JS `pg` package (`npm install pg --prefix devdb`, then `easydb-server --adapter postgres --connection-string postgresql://…`). That would give durable local data on the PostgreSQL 16 install without changing the application, but every limitation above except durability still applies. Moving the application itself to PostgreSQL would mean rewriting both models and every query, which isn't justified while the in-memory server covers all current operations.

## Known issues (pre-existing, unchanged)

- The frontend uses `react-scripts` 4 / webpack 4, which needs `--openssl-legacy-provider` on Node 17+. The `start` and `build` scripts pass it. The long-term fix is upgrading to `react-scripts` 5.
- `material-table@1.69.3` declares a peer of `@material-ui/core@^4`, while the app uses `5.0.0-beta.5`. Installing the client therefore needs `--legacy-peer-deps`.
- `npm run eslint --prefix client` reports 3 errors from optional chaining in `src/pages/CustomerList.js`, which the configured parser doesn't support. `npm run lint` also scans `node_modules`/`build`.
- The client has no test files, so `npm test --prefix client` exits with "No tests found".
- `createdAt` defaults use `Date.now()` evaluated once at startup, so every record created by one backend process gets the same timestamp.
- The `/api` route handlers have no error handling. On Node 22, a database error there is an unhandled rejection and stops the process.
- The build prints a "caniuse-lite is outdated" warning. Updating it needs network access, and the warning is harmless.
