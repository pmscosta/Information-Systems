'use strict';

const jasminUrl = `https://my.jasminsoftware.com`;
const jasminTokenUrl = `https://identity.primaverabss.com/connect/token`;
const jasminTenant = `224897`;
const jasminOrganization = `224897-0001`;
const jasminClientSecret = `08fefaf6-3966-4235-8571-b21fbda15e5a`;
const jasminClientID = 'SINFonia';
const apiToken = null;
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
