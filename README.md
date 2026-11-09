<h1 align="center">
  <a href="https://clickstream.manishb.in"><img src="https://assets.clickstream.manishb.in/assets/clickstream_readme.png" alt="ClickStream Logo" width="400">
  </a>
</h1>
<p align="center">
  <strong>
    Cookie-free web analytics for traffic and events
  </strong>
  <br/>
    ClickStream is an open-source, SDK-based analytics platform that enables businesses to track, collect, and analyze user interactions across their websites. It provides insights into web analytics, user behavior and engagement, with access to raw event data for deeper analysis and custom reporting.
</p>

<h3 align="center">
    <a href="https://clickstream.manishb.in"><ins>ClickStream</ins></a>
</h3>

<p align="center"> 
  <img src="https://assets.clickstream.manishb.in/assets/cs_readme_hero.png" alt="clickstream hero image" width="960"/>
</p>

## Features

<table>
<tr>
<td width="50%" valign="middle">

### SDK-Based Event Tracking

Integrate ClickStream into your website using its dedicated SDK to capture user interactions and custom events.

</td>
</tr>
<tr>
<td width="50%" valign="middle">

### Comprehensive Analytics Dashboard

Monitor event volume, unique users, anonymous users, and sessions through an intuitive analytics dashboard.

</td>
</tr>

<tr>
<td width="50%" valign="middle">

### Event Trends & Insights

Visualize event activity across hourly, daily, weekly, and monthly intervals with customizable date ranges.

</td>
</tr>

<tr>
<td width="50%" valign="middle">

### Behavioral Analytics

Identify top events, popular pages, and user activity patterns through flexible analytics breakdowns.

</td>
</tr>

<tr>
<td width="50%" valign="middle">

### Raw Event Data Access

Explore individual event records with access to granular properties, user identifiers, session details, and device metadata.

</td>
</tr>

<tr>
<td width="50%" valign="middle">

### Flexible Data Export

Export selected event data in CSV, XLSX, and JSON formats with customizable fields and date filters.

</td>
</tr>
</table>

## Installing Source Code

### Requirements

- Node.js v20.0.x+
- PostgreSQL v18.x+
- pnpm v11.3.x or later

### Get the Source Code and Install Packages

```bash
git clone https://github.com/manishbobburi/clickstream.git
cd clickstream
pnpm install
```

### Configure ClickStream

Create an `.env` file inside both `apps/api` and `apps/dashboard`.

`apps/api/.env`

```bash
PORT=3001 #default
ALLOWED_ORIGINS=http://localhost:5173 #default
SALT_ROUNDS=12
JWT_ACCESS_SECRET=access-token-secret
JWT_REFRESH_SECRET=refresh-token-secret
ACCESS_TOKEN_EXPIRY=15m #default
REFRESH_TOKEN_EXPIRY=30d #default
```

`apps/dashboard/.env`

```bash
VITE_API_URL=http://localhost:{API_SERVER_PORT}/api/v1/
```

### Build the Application

```bash
pnpm build
```

### Build the Application

```bash
pnpm dev
```
