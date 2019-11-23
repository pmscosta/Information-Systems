'use strict';

const jasminUrl = `https://my.jasminsoftware.com`;
const jasminTokenUrl = `https://identity.primaverabss.com/connect/token`;
const jasminTenant = `224897`;
const jasminOrganization = `224897-0001`;
const jasminClientSecret = `08fefaf6-3966-4235-8571-b21fbda15e5a`;
const jasminClientID = 'SINFonia';
const apiToken =
  'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzQ1MjkyMzIsImV4cCI6MTU3NDU0MzYzMiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiU0lORm9uaWEiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.lJ22mEpPgJ7t_sYNrQUodYRcuIijn5HZjUO4n7yPp3w3xV4Liro4ZrVLy2Uq2omO1_SLa1cuKBzdpfb417GyJRDsWxz830hoQxOVhuYVHs_rQMRCCPvL6GTueV9ZvtEs2tYpK2iwyOsI9U6ZzTTa7_RUFvo-qU802qfp4CHer8gM_ZLD8nZEeD9n_nlayEAOSrEgL_q_W4MeyNVBer3qO58LVMki83x7N-5xsR8wB6Evu5I8UkA5XZivOPCiaaMGM9PE99d3poIoyFDiZiDKJbpGEV3YgjEoidyfknZD61z0QNg-hNBcEqXq62jR_MzfTeq2wfTopZTflGdOrb5iRg';

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
