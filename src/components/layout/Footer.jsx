function Footer({footerState}) {
  const footer = footerState ? <FooterShort /> : <FooterLong />;
  return (
    <>
      <h2>Footer bar.</h2>
      {footer}
    </>
  );
}

function FooterShort() {
  return (
    <>
    <h2>Short footer section.</h2>
    </>
  )
}

function FooterLong() {
  return (
    <>
    <h2>Long footer section.</h2>
    </>
  )
}

export default Footer;
