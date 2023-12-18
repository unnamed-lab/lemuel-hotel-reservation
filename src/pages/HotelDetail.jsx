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
              <li className="catalogue-item--mini item-review">
                1,800 reviews
              </li>
              <li className="catalogue-item--mini item-badge">
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
              </li>
              <li className="catalogue-item--mini item-address">
                Jorgan hotel, Delta, Iterigbi
              </li>
            </ul>
          </div>
          <div className="catalogue-detail-header--container w-20">
            <div className="catalogue-item--mini_container baseline">
              <a href="#" className="item-redirect">
                <svg
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.98376 10.6626L4.68685 7.65381L4.10352 8.64788L9.40042 11.6566L9.98376 10.6626Z"
                    fill="#3E3E3E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.98376 4.33826L4.68685 7.34702L4.10352 6.35295L9.40042 3.34424L9.98376 4.33826Z"
                    fill="#3E3E3E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.45 8.75966C3.15877 8.75966 3.73333 8.19434 3.73333 7.49709C3.73333 6.79976 3.15877 6.23451 2.45 6.23451C1.74123 6.23451 1.16667 6.79976 1.16667 7.49709C1.16667 8.19434 1.74123 8.75966 2.45 8.75966ZM2.45 9.90746C3.8031 9.90746 4.9 8.82823 4.9 7.49709C4.9 6.16587 3.8031 5.08667 2.45 5.08667C1.0969 5.08667 0 6.16587 0 7.49709C0 8.82823 1.0969 9.90746 2.45 9.90746Z"
                    fill="#3E3E3E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5496 10.827C12.2583 10.827 12.8329 11.3923 12.8329 12.0896C12.8329 12.7869 12.2583 13.3522 11.5496 13.3522C10.8408 13.3522 10.2663 12.7869 10.2663 12.0896C10.2663 11.3923 10.8408 10.827 11.5496 10.827ZM11.5496 9.6792C12.9026 9.6792 13.9996 10.7584 13.9996 12.0896C13.9996 13.4208 12.9026 14.5 11.5496 14.5C10.1965 14.5 9.09961 13.4208 9.09961 12.0896C9.09961 10.7584 10.1965 9.6792 11.5496 9.6792Z"
                    fill="#3E3E3E"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.5496 4.17296C12.2583 4.17296 12.8329 3.60768 12.8329 2.91038C12.8329 2.21307 12.2583 1.6478 11.5496 1.6478C10.8408 1.6478 10.2663 2.21307 10.2663 2.91038C10.2663 3.60768 10.8408 4.17296 11.5496 4.17296ZM11.5496 5.32075C12.9026 5.32075 13.9996 4.24159 13.9996 2.91038C13.9996 1.57916 12.9026 0.5 11.5496 0.5C10.1965 0.5 9.09961 1.57916 9.09961 2.91038C9.09961 4.24159 10.1965 5.32075 11.5496 5.32075Z"
                    fill="#3E3E3E"
                  />
                </svg>
                Share
              </a>
              <a href="#" className="item-redirect">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.14239 2.0759L7.5 2.44185L7.85761 2.0759C9.67142 0.219748 12.9139 0.891377 14.077 3.15249C14.6416 4.2503 14.7311 5.77551 13.7835 7.63668C12.854 9.46231 10.9278 11.6007 7.49999 13.8998C4.07216 11.6009 2.14598 9.46265 1.21648 7.63707C0.268884 5.77595 0.35835 4.25071 0.923036 3.15284C2.08611 0.891563 5.32862 0.219786 7.14239 2.0759Z"
                    stroke="#3E3E3E"
                  />
                </svg>
                Save
              </a>
            </div>
          </div>
        </div>
        <div className="catalogue-detail--thumbnail">
          <div className="thumbnail--main">
            <img src="/beach-01.png" alt="" />
          </div>
          <div className="thumbnail--sub_group">
            <div className="thumbnail--sub_container">
              <img src="/beach-02.png" alt="" />
            </div>
            <div className="thumbnail--sub_container">
              <img src="/beach-03.png" alt="" />
            </div>
            <div className="thumbnail--sub_container">
              <img src="/beach-04.png" alt="" />
            </div>
            <div className="thumbnail--sub_container">
              <img src="/beach-01.png" alt="" />
            </div>
          </div>
        </div>
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
