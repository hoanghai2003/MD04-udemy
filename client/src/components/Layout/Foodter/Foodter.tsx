import assImages from "../../../assets/image";

function Foodter() {
  return (
    <>
      <div className="footer-section footer-section-main">
        <div className="links-and-language-selector">
          <div className="language-selector-container">
            <button className="btn-languae">
              <i className="fa-solid fa-globe" style={{ color: "#e4e7ec" }}></i>
              <span>English</span>
            </button>
          </div>
          <ul className="ud-unstyled-list link-column ">
            <li>
              <a href="" className="linkk white-link ud-text-sm">
                Udemy Business
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Teach on Udemy
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Get the app
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                About us
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Contact us
              </a>
            </li>
          </ul>
          <ul className="ud-unstyled-list link-column">
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Careers
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Blog
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Help and Support
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Affiliate
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Investors
              </a>
            </li>
          </ul>
          <ul className="ud-unstyled-list link-column">
            <li>
              <a className="linkk white-link ud-text-sm" href="/terms/">
                Terms
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="" className="white-link ">
                Cookie settings
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="/sitemap/">
                Sitemap
              </a>
            </li>
            <li>
              <a className="linkk white-link ud-text-sm" href="">
                Accessibility statement
              </a>
            </li>
          </ul>
        </div>
        <div className="logo-and-copyright">
          <div className="logo-container">
            <a
              href="/"
              className="ud-btn ud-btn-large ud-btn-link ud-heading-md"
            >
              <img src={assImages.Logoo} alt="Udemy" width="91" height={34} />
            </a>
          </div>
          <div className="copyright-container ud-text-xs">
            © 2023 Udemy, Inc.
          </div>
        </div>
      </div>
    </>
  );
}

export default Foodter;
