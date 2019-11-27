'use strict';

const jasminUrl = `https://my.jasminsoftware.com`;
const jasminTokenUrl = `https://identity.primaverabss.com/connect/token`;
const jasminTenant = `224897`;
const jasminOrganization = `224897-0001`;
const jasminClientSecret = `08fefaf6-3966-4235-8571-b21fbda15e5a`;
const jasminClientID = 'SINFonia';
const apiToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzQ4MTA4MDMsImV4cCI6MTU3NDgyNTIwMywiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORm9uaWEiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.PREheQpAeU6KhHNPP3b8rJ1UuZOzN0iucmyUUqd4csTLuR3g3htmBZ-KwCRyfv9OEpTuO_avMW9akDrSOkfFWeIBmzrNZIIUdMDqq5AAH7lVXCijMQSzmYKCUNK5dD-fa1sVO8OCCwqj0TOBx92E16yb76C8oBYvBtGE5bbLmHB_m-p6ZwozrJNcFE_yRTM0VFeTqVdodLxgNgB3FwCxGEv8dGDGdBGtY7eo_0QUqFkTQMqZ0_3lNGLdesKEpmeLq-7R4YiuN1Htgamv_HY5SVMzmfjaQlJLwlIJHwi8m-TeB5Xxdb-80K5vMqylvXjUBbea_mi14g7EB9APk0uAIA';
const baseUrlRequest = `${jasminUrl}/api/${jasminTenant}/${jasminOrganization}`;

module.exports = Object({
  jasminTokenUrl,
  jasminOrganization,
  jasminTenant,
  jasminClientSecret,
  jasminClientID,
  apiToken,
  baseUrlRequest,
});
