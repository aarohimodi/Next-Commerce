import Image from "next/image";
interface TestimonialCardProps {
  testimonials: {
    id: number;
    name: string;
    role: string;
    image: string;
    review: string;
  };
}
function TestimonialCard({ testimonials }: TestimonialCardProps) {
  return (
    <div className="rounded-xl bg-white p-8 shadow text-center">
      <div className="relative mx-auto mb-5 h-20 w-20 overflow-hidden rounded-full">
        <Image
          src={testimonials.image}
          alt={testimonials.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <p className="mb-6 text-gray-600 italic">"{testimonials.review}"</p>
      <h3 className="text-lg font-semibold">{testimonials.name}</h3>
      <p className="text-sm text-gray-500">{testimonials.role}</p>
    </div>
  );
}

export default TestimonialCard;
