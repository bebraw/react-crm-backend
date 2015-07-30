'use strict';
var React = require('react');

module.exports = function(ctx) {
  ctx.sender = ctx.sender || {};
  ctx.recipient = ctx.recipient || {};
  ctx.products = ctx.products || [];

  var vat = ctx.vat;

  ctx.products = ctx.products.map(function(product) {
    product.tax = product.price * (1 + vat) - product.price;

    return product;
  });

  var summaries = {
    price: ctx.products.reduce(function(a, b) {
      return a + b.price;
    }, 0),
    tax: ctx.products.reduce(function(a, b) {
      return a + b.tax;
    }, 0),
    total: ctx.products.reduce(function(a, b) {
      return a + b.price + b.tax;
    }, 0)
  };

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
              <div className="phone">Puhelin: {ctx.sender.phone}</div>
              <div className="iban">IBAN: {ctx.sender.iban}</div>
              {ctx.sender.bic ? <div className="bic">BIC/SWIFT: {ctx.sender.bic}</div> : null }
              <div className="companyId">Y-tunnus: {ctx.sender.companyId}</div>
            </div>
            <div className="extra">
              <div className="invoice">LASKU</div>
              <div className="date">
                <span className="label">Päivä:</span>
                <span>{ctx.date}</span>
              </div>
              <div className="reference">
                <span className="label">Viite:</span>
                <span>{ctx.reference}</span>
              </div>
              <div className="paymentTerm">
                <span className="label">Maksuehto:</span>
                <span>{ctx.paymentTerm}</span>
              </div>
              <div className="due">
                <span className="label">Eräpäivä:</span>
                <span>{ctx.due}</span>
              </div>
              <div className="blank">&nbsp;</div>
              <div className="warningTerm">
                <span className="label">Huomautusaika:</span>
                <span>{ctx.warningTerm}</span>
              </div>
              <div className="interest">
                <span className="label">Viivästyskorko:</span>
                <span>{ctx.interest}%</span>
              </div>
            </div>
          </header>
          <article>
            <div className="info">
              <div className="recipient">
                <div className="name">{ctx.recipient.name}</div>
                <div className="company">{ctx.recipient.company}</div>
                <div className="address">{ctx.recipient.address}</div>
                <div className="city">{ctx.recipient.postalCode} {ctx.recipient.city}</div>
                <div className="phone">{ctx.recipient.phone}</div>
                <div className="companyId">{ctx.recipient.companyId}</div>
              </div>
            </div>
            <table className="products">
              <thead>
                <tr>
                  <th>Kuvaus</th>
                  <th>Määrä</th>
                </tr>
              </thead>
              <tbody>
              {ctx.products.map(function(product, i) {
                return <tr key={'product' + i}>
                  <td>{product.name}</td>
                  <td>{toFixed(product.price)}</td>
                </tr>;
              })}
              </tbody>
              <tfoot>
                <tr>
                  <td>Brutto</td>
                  <td>€ {summaries.price.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Alv</td>
                  <td>{(vat * 100).toFixed(3) + '%'}</td>
                </tr>
                <tr>
                  <td>Vero</td>
                  <td>€ {summaries.tax.toFixed(2)}</td>
                </tr>
                <tr>
                  <td>Muuta</td>
                  <td>€ 0</td>
                </tr>
                <tr>
                  <td>Yhteensä</td>
                  <td>€ {summaries.total.toFixed(2)}</td>
                </tr>
              </tfoot>
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
