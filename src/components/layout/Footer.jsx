import "../../styles/css/footer.css";

function Footer({ footerState }) {
  footerState = false;
  const year = new Date().getFullYear();
  const footer = footerState ? (
    <FooterShort date={year} />
  ) : (
    <FooterLong date={year} />
  );
  return (
    <>
      <footer className="footer">{footer}</footer>
    </>
  );
}

function FooterShort({ date }) {
  return (
    <>
    <div className="footer-section">
      <section className="footer-section--mini footer-section--left">
        <p className="trademark">
          &copy;<time dateTime={date}>{date}</time> Rock.inc.
        </p>
        <ul className="footer-redirect-list">
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Terms
            </a>
          </li>
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Sitemap
            </a>
          </li>
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Privacy
            </a>
          </li>
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Your Privacy Choice
            </a>
          </li>
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Destinations
            </a>
          </li>
        </ul>
      </section>

      <section className="footer-section--mini footer-section--right list-style-none">
        <ul className="footer-redirect-list">
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              English (US)
            </a>
          </li>
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Rp IDR
            </a>
          </li>
          <li className="footer-redirect-item">
            <a href="#" className="footer-redirect-link">
              Support & resources
            </a>
          </li>
        </ul>
      </section>
    </div>
    </>
  );
}

function FooterLong({date}) {
  return (
    <>
      <section className="footer-section--long">
        <h3 className="footer-heading--text">
          Explore other options in and around Delta state
        </h3>
        <ul className="footer-location-list">
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Osubi
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Ugromo
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Edjeba
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Udu
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              PTI road
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Ugolokposo
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Ugolo
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Otokutu
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Refinery Road
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Airport Road
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Mofor
            </a>
          </li>
          <li className="footer-location-item">
            <a href="#" className="footer-location-link">
              Ubud
            </a>
          </li>
        </ul>
      </section>
      <FooterShort date={date} />
    </>
  );
}

export default Footer;
