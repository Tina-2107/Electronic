// components/homepage/SafetyHighlights.jsx
const SAFETY_POINTS = [
  {
    title: "100% Genuine Products",
    desc: "Direct sourcing from authorized brands and distributors only.",
    iconBg: "from-emerald-400 to-emerald-500",
  },
  {
    title: "Secure Payments",
    desc: "Encrypted transactions with trusted Indian payment gateways.",
    iconBg: "from-sky-400 to-blue-500",
  },
  {
    title: "Safe Packaging",
    desc: "Shock‑proof, water‑resistant packaging for all electrical items.",
    iconBg: "from-yellow-400 to-orange-500",
  },
  {
    title: "Easy Returns",
    desc: "Hassle‑free return support for damaged or wrong products.",
    iconBg: "from-fuchsia-400 to-pink-500",
  },
];

const SafetyHighlights = () => {
  return (
    <section className="bg-gray-950 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white">
              Why Shop with D-Light?
            </h2>
            <p className="text-sm sm:text-base text-gray-400 mt-1">
              Safety, authenticity, and service at every step.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {SAFETY_POINTS.map((point) => (
            <div
              key={point.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-5 flex flex-col hover:border-yellow-400/70 hover:-translate-y-1 transition-all"
            >
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${point.iconBg} flex items-center justify-center text-gray-900 font-bold text-lg mb-3`}
              >
                ✓
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                {point.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-400">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyHighlights;
