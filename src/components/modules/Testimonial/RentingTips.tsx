const tips = [
    {
      title: "Set Your Budget",
      description: "Know how much you can afford monthly before you begin your search. Factor in rent, utilities, and any extra fees.",
      icon: "💰",
    },
    {
      title: "Choose the Right Location",
      description: "Look for areas with easy access to work, school, and transport. Check safety and nearby facilities like markets or hospitals.",
      icon: "📍",
    },
    {
      title: "Inspect Before You Rent",
      description: "Visit the property in person if possible. Check water, electricity, ventilation, and ask about maintenance responsibilities.",
      icon: "🔍",
    },
    {
      title: "Read the Lease Carefully",
      description: "Understand your rental agreement fully. Look for hidden charges, notice periods, and deposit terms.",
      icon: "📄",
    },
  ];
  
  const RentingTips = () => {
    return (
      <section className="bg-white py-14">
        <div className="mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-600 mb-4">Tips for Renters</h2>
          <p className="text-gray-600 mb-10">Advice on finding and renting the right house.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tips.map((tip, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{tip.icon}</div>
                <h3 className="text-xl font-semibold text-primary-800 mb-2">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default RentingTips;
  