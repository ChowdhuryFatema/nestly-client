import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Rakib Hasan",
    location: "Dhaka, Bangladesh",
    quote:
      "Basafinder made it super easy to find a clean and affordable rental in my area. Highly recommended!",
    image:
      "https://t3.ftcdn.net/jpg/08/20/75/34/360_F_820753420_Nqjb8USaj0J7K82Uo6yZLhCv4roZFBj7.jpg",
  },
  {
    name: "Nusrat Jahan",
    location: "Chittagong, Bangladesh",
    quote:
      "I found my ideal apartment within days. The search filters and map view were especially helpful.",
    image: "https://pearler.com/static/userpfp/7663/iA277Bstg",
  },
  {
    name: "Imran Khan",
    location: "Sylhet, Bangladesh",
    quote:
      "Super user-friendly and incredibly efficient. Basafinder connects you with the best rental options available.",
    image: "https://pearler.com/static/userpfp/39458/xQ3vWrqGQ",
  },
];

const Testimonial = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-primary-600">
          Testimonials
        </h2>
        <p className="text-primary-600 mb-10">
          Success stories from users who found their ideal rental.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-2xl p-6 relative"
            >
              <FaQuoteLeft className="text-primary-500 text-2xl absolute -top-3 left-3 opacity-20" />
              <p className="text-gray-700 italic mb-4">
                &quot;{testimonial.quote}&quot;
              </p>
              <div className="flex items-center gap-4 mt-6">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-primary-500">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
