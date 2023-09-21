import "./Foodter.css";

function FoodterBar() {
  return (
    <>
      <div className="footer-section ufb-notice-module--notice-row--3xohg">
        <div className="ud-heading-lg ufb-notice-module--notice--W_Hq6">
          <span>
            Top companies choose{" "}
            <a className="inverted-link" href="">
              Udemy Business
            </a>{" "}
            to build in-demand career skills.
          </span>
        </div>
        <div className="ufb-notice-module--partner-logos--1YSF_">
          <img
            src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg"
            alt="Nasdaq"
            height={44}
            width={115}
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"
            alt="Volkswagen"
            height={44}
            width={44}
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/box-light.svg"
            alt="Box"
            height={44}
            width={67}
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg"
            alt="NetApp"
            height={44}
            width={115}
          />
          <img
            src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"
            alt="Eventbrite"
            height={44}
            width={115}
          />
        </div>
      </div>
    </>
  );
}

export default FoodterBar;
