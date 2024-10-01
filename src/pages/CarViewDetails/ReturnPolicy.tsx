const ReturnPolicy = () => {
  return (
    <div className="lg:ml-10 mt-6 lg:mt-0 p-4 lg:p-0">
  <h2 className="text-2xl font-semibold mb-2 text-text-primary">
    Rental Policy
  </h2>
  <hr className="mb-4" />
  <div className="space-y-3">
    <div className="flex items-start">
      <span className="text-yellow-600 font-bold mr-2">1.</span>
      <p>
        <span className="font-semibold text-text-primary">
          Pay only 50% now
        </span>
        ,{" "}
        <span className="text-text-primary">
          and the rest at the destination.
        </span>
      </p>
    </div>
    <div className="flex items-start">
      <span className="text-yellow-600 font-bold mr-2">2.</span>
      <p>
        <span className="text-text-primary">Cancel up to</span>
        <span className="font-semibold text-text-primary">
          {" "}
          48 hours before pick-up
        </span>
        , <span className="text-text-primary">and get a full refund.</span>
      </p>
    </div>
    <div className="flex items-start">
      <span className="text-yellow-600 font-bold mr-2">3.</span>
      <p>
        <span className="text-text-primary">
          This car requires a licence category
        </span>
        <span className="font-semibold text-text-primary"> AI</span>,{" "}
        <span className="text-text-primary">or equivalent.</span>
      </p>
    </div>
    <div className="flex items-start">
      <span className="text-yellow-600 font-bold mr-2">4.</span>
      <p>
        <span className="text-text-primary">You’ll need to be at least</span>
        <span className="font-semibold text-text-primary"> 18 years old</span>,{" "}
        <span className="text-text-primary">
          to rent it with 12 months driving experience.
        </span>
      </p>
    </div>
    <div className="flex items-start">
      <span className="text-yellow-600 font-bold mr-2">5.</span>
      <p>
        <span className="font-semibold text-text-primary">
          A refundable security deposit
        </span>{" "}
        <span className="text-text-primary">
          (24 € via debit card) is required on pickup.
        </span>
      </p>
    </div>
    <div className="flex items-start">
      <span className="text-yellow-600 font-bold mr-2">6.</span>
      <p>
        <span className="text-text-primary">This car includes</span>
        <span className="font-semibold text-text-primary">
          {" "}
          unlimited mileage
        </span>{" "}
        <span className="text-text-primary">per day in the price.</span>
      </p>
    </div>
  </div>
</div>

  );
};

export default ReturnPolicy;
