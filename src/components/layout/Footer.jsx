import "../../styles/css/footer.css";

function Footer({ footerState }) {
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
      <section className="footer-section footer-section--left">
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

      <section className="footer-section footer-section--right list-style-none">
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
    </>
  );
}

function FooterLong() {
  return (
    <>
      <h2>Long footer section.</h2>
    </>
  );
}

export default Footer;
