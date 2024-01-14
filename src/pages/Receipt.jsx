

function Receipt({booking}) {
  return (
    <>
      <div className="booking-card">
        <div className={`booking-card--additional order`}>
          <div className="booking-card--additional_quantity_summary">
            <span className="quantity-label">
              N {quoteFormater(booking.sumTotal / booking.days, true)} x{" "}
              {booking.days} nights
            </span>
            <span>N {amtFormater(booking.sumTotal, true)}</span>
          </div>
          <div className="booking-card--additional_quantity_summary">
            <span className="quantity-label">Weekly stay discount</span>
            <span className="discount">N 0.00</span>
          </div>
          <div className="booking-card--additional_quantity_summary btm-border">
            <span className="quantity-label">Rock service fee</span>
            <span>N {quoteFormater(serviceFee)}</span>
          </div>
          <div className="booking-card--additional_total">
            <span className="total-label">Total(NGN)</span>
            <span>N {quoteFormater(overAllSum)}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Receipt