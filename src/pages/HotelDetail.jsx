import { useOutletContext } from "react-router-dom";

function DetailPage() {
  const [setFooterType, dataset] = useOutletContext();
  setFooterType(false);
  // // Short form footer used when true, long form footer is used when false.
  return (
    <>
      <section className="catalogue-detail-section">
        <div className="catalogue-detail--header">
          <div className="catalogue-detail-header--container w-80">
            <h1
              className="catalogue-item--name"
              title="Beautiful Hotel on the edge of iterigbi river"
            >
              Beautiful Hotel on the edge of iterigbi river
            </h1>
            <ul className="catalogue-item--mini_container">
              <li className="catalogue-item--mini item-rating">
                <svg
                  width="15"
                  height="13"
                  viewBox="0 0 15 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.24498 10.9028C7.40221 10.8096 7.59779 10.8096 7.75502 10.9028L11.1212 12.8989C11.5008 13.124 11.9647 12.7827 11.8627 12.3533L10.9757 8.61786C10.9323 8.43506 10.9951 8.24335 11.1381 8.12158L14.0845 5.61391C14.4232 5.32565 14.2452 4.77182 13.802 4.73488L9.9063 4.41017C9.72237 4.39484 9.56184 4.27942 9.48873 4.10995L7.9591 0.564213C7.78542 0.161621 7.21458 0.161621 7.0409 0.564213L5.51127 4.10995C5.43816 4.27942 5.27763 4.39484 5.0937 4.41017L1.19803 4.73488C0.754811 4.77182 0.5768 5.32565 0.915492 5.61391L3.86187 8.12158C4.00494 8.24335 4.06768 8.43506 4.02427 8.61786L3.13729 12.3533C3.03533 12.7827 3.49916 13.124 3.87879 12.8989L7.24498 10.9028Z"
                    fill="black"
                  />
                </svg>
                4.83
              </li>
              <div className="catalogue-item--mini item-review">
                1,800 reviews
              </div>
              <div className="catalogue-item--mini item-badge">
                <svg
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 9.59531C6.98527 9.59531 9 7.55929 9 5.04766C9 2.53606 6.98527 0.5 4.5 0.5C2.01472 0.5 0 2.53606 0 5.04766C0 7.55929 2.01472 9.59531 4.5 9.59531Z"
                    fill="#292D32"
                  />
                  <path
                    d="M7.02667 10.0215C7.24667 9.90253 7.5 10.0774 7.5 10.3363V13.7296C7.5 14.3592 7.08 14.6671 6.56 14.4082L4.77333 13.5197C4.62 13.4497 4.38 13.4497 4.22667 13.5197L2.44 14.4082C1.92 14.6601 1.5 14.3522 1.5 13.7226L1.51333 10.3363C1.51333 10.0774 1.77333 9.90952 1.98667 10.0215C2.74 10.4203 3.59333 10.6441 4.5 10.6441C5.40667 10.6441 6.26667 10.4203 7.02667 10.0215Z"
                    fill="#292D32"
                  />
                </svg>
                Superhost
              </div>
              <div className="catalogue-item--mini item-address">
                Jorgan hotel, Delta, Iterigbi
              </div>
            </ul>
          </div>
          <div className="catalogue-detail-header--container w-20"></div>
        </div>
        <div className="catalogue-detail--thumbnail"></div>
        <div className="catalogue-detail--detatils"></div>
        <div className="catalogue-detail--offer"></div>
        <div className="catalogue-detail-rating"></div>
        <div className="catalogue-detail--comments"></div>
        <div className="catalogue-detail--location"></div>
        <div className="catalogue-detail--terms"></div>
        <div className="catalogue-detail--additional"></div>
      </section>
    </>
  );
}

export default DetailPage;
