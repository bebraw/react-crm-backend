'use strict';
var React = require('react');

module.exports = function(ctx) {
  ctx.sender = ctx.sender || {};
  ctx.recipient = ctx.recipient || {};
  ctx.services = ctx.services || [];

  return React.renderToStaticMarkup(
    <html>
      <head>
        <base href={'file://' + __dirname + '/'} />
        <link rel="stylesheet" type="text/css" href="./style.css" />
      </head>
      <body>
        <div className="preview">
          <header>
            <h1 className="company">{ctx.sender.company}</h1>
            <div className="sender">
              <div className="name">{ctx.sender.name}</div>
              <div className="address">{ctx.sender.address}</div>
              <div className="city">{ctx.sender.postalCode} {ctx.sender.city}</div>
              <div className="phone">Phone: {ctx.sender.phone}</div>
              <div className="iban">IBAN: {ctx.sender.iban}</div>
              <div className="bic">BIC/SWIFT: {ctx.sender.bic}</div>
              <div className="companyId">Company ID: {ctx.sender.companyId}</div>
            </div>
            <div className="extra">
              <div className="invoice">INVOICE</div>
              <div className="date">{ctx.date}</div>
              <div className="reference"># {ctx.reference}</div>
            </div>
          </header>
          <article>
            <div className="info">
              <div className="recipient">
                <div className="company">{ctx.recipient.company}</div>
                <div className="name">{ctx.recipient.name}</div>
                <div className="address">{ctx.recipient.address}</div>
                <div className="city">{ctx.recipient.postalCode} {ctx.recipient.city}</div>
                <div className="phone">{ctx.recipient.phone}</div>
                <div className="companyId">{ctx.recipient.companyId}</div>
              </div>
            </div>
            <table className="services">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Tax free</th>
                  <th>Tax (%)</th>
                  <th>Tax</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
              {ctx.services.map(function(service, i) {
                return <tr key={i}>
                  <td>{service.name}</td>
                  <td>{toFixed(service.cost)}</td>
                  <td>{toFixed(service.vat)}</td>
                  <td>{toFixed(service.vatCost)}</td>
                  <td>{toFixed(service.total)}</td>
                </tr>;
              })}
              </tbody>
            </table>
          </article>
          <footer>
            <div className="companyDetails"></div>
          </footer>
        </div>
      </body>
    </html>
    );
};

function toFixed(a) {
    if(a) {
        return a.toFixed(2);
    }
}
