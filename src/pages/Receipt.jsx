import { quoteFormater } from "../utils/utils";
import "../styles/css/receipt.css";

function Receipt({ booking }) {
  return (
    <>
      <section className="receipt-section">
        <div className="receipt">
          <div className="receipt-content">
            <div className="receipt-header">
              <h1 className="receipt-heading">Payment Success!</h1>
              <p className="receipt-info">
                Your payment has been successfully done.
              </p>
            </div>
            <div className="receipt-sum">
              <p className="sum-info">Total Payment</p>
              <h1 className="sum-number">N {quoteFormater(15000)}</h1>
            </div>
            <div className="receipt-body">
              <div className="receipt-item">
                <div className="item-info">Reference ID</div>
                <div className="item-content">000085752257</div>
              </div>
              <div className="receipt-item">
                <div className="item-info">Payment Time</div>
                <div className="item-content">05 Jan 2024, 13:22</div>
              </div>
              <div className="receipt-item">
                <div className="item-info">Payment Method</div>
                <div className="item-content">Bank Transfer</div>
              </div>
              <div className="receipt-item">
                <div className="item-info">Sender Name</div>
                <div className="item-content">Charles Lemuel</div>
              </div>
            </div>
            <div className="receipt-print">
              <span className="print-icon">
                <svg
                  width="41"
                  height="41"
                  viewBox="0 0 41 41"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.6562 19.5466L19.9197 23.81L24.1831 19.5466"
                    stroke="#3E3E3E"
                    strokeWidth="2.49809"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19.918 6.75635V23.6934"
                    stroke="#3E3E3E"
                    strokeWidth="2.49809"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M33.4412 20.3793C33.4412 27.7403 28.445 33.7024 20.1181 33.7024C11.7911 33.7024 6.79492 27.7403 6.79492 20.3793"
                    stroke="#3E3E3E"
                    strokeWidth="2.49809"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Get PDF Receipt
            </div>
          </div>
          <svg
            className="receipt-icon"
            width="147"
            height="148"
            viewBox="0 0 147 148"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_370_1650)">
              <circle cx="73.4474" cy="64" r="46.631" fill="white" />
            </g>
            <path
              d="M73.4474 41.7948C61.2123 41.7948 51.2422 51.7649 51.2422 64C51.2422 76.2351 61.2123 86.2052 73.4474 86.2052C85.6825 86.2052 95.6526 76.2351 95.6526 64C95.6526 51.7649 85.6825 41.7948 73.4474 41.7948ZM84.0615 58.8928L71.4712 71.4832C71.1603 71.794 70.7384 71.9717 70.2943 71.9717C69.8502 71.9717 69.4283 71.794 69.1174 71.4832L62.8333 65.1991C62.1894 64.5551 62.1894 63.4893 62.8333 62.8453C63.4773 62.2014 64.5431 62.2014 65.1871 62.8453L70.2943 67.9525L81.7078 56.539C82.3517 55.8951 83.4176 55.8951 84.0615 56.539C84.7055 57.183 84.7055 58.2266 84.0615 58.8928Z"
              fill="#3D94FF"
            />
            <defs>
              <filter
                id="filter0_d_370_1650"
                x="0.17013"
                y="0.715096"
                width="146.554"
                height="146.555"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="9.99235" />
                <feGaussianBlur stdDeviation="13.3231" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_370_1650"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_370_1650"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <svg
            className="receipt-bg"
            width="595"
            height="800"
            viewBox="0 0 595 800"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_381_1394)">
              <path
                d="M13.6303 23.1864C10 30.3113 10 39.6384 10 58.2925V784.404H26.6539C26.6539 776.126 33.3645 769.415 41.6424 769.415C49.9204 769.415 56.6309 776.126 56.6309 784.404H69.9541C69.9541 776.126 76.6647 769.415 84.9426 769.415C93.2206 769.415 99.9311 776.126 99.9311 784.404H113.254C113.254 776.126 119.965 769.415 128.243 769.415C136.521 769.415 143.231 776.126 143.231 784.404H156.554C156.554 776.126 163.265 769.415 171.543 769.415C179.821 769.415 186.532 776.126 186.532 784.404H199.855C199.855 776.126 206.565 769.415 214.843 769.415C223.121 769.415 229.832 776.126 229.832 784.404H243.155C243.155 776.126 249.865 769.415 258.143 769.415C266.421 769.415 273.132 776.126 273.132 784.404H286.455C286.455 776.126 293.166 769.415 301.444 769.415C309.722 769.415 316.432 776.126 316.432 784.404H329.755C329.755 776.126 336.466 769.415 344.744 769.415C353.022 769.415 359.732 776.126 359.732 784.404H373.055C373.055 776.126 379.766 769.415 388.044 769.415C396.322 769.415 403.033 776.126 403.033 784.404H416.356C416.356 776.126 423.066 769.415 431.344 769.415C439.622 769.415 446.333 776.126 446.333 784.404H459.656C459.656 776.126 466.366 769.415 474.644 769.415C482.922 769.415 489.633 776.126 489.633 784.404H502.956C502.956 776.126 509.667 769.415 517.945 769.415C526.223 769.415 532.933 776.126 532.933 784.404H546.256C546.256 776.126 552.967 769.415 561.245 769.415C569.523 769.415 576.233 776.126 576.233 784.404H584.56V58.2925C584.56 39.6384 584.56 30.3113 580.93 23.1864C577.737 16.9191 572.641 11.8237 566.374 8.63034C559.249 5 549.922 5 531.268 5H63.2925C44.6384 5 35.3113 5 28.1864 8.63034C21.9191 11.8237 16.8237 16.9191 13.6303 23.1864Z"
                fill="white"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_381_1394"
                x="0"
                y="0"
                width="594.561"
                height="799.404"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="5" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_381_1394"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_381_1394"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
}

export default Receipt;
