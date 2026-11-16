"use client";
interface QuantitySelectorProps {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}
export default function QuantitySelector({
  quantity,
  setQuantity,
}: QuantitySelectorProps) {
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-md border">
      <button className="px-4 py-2 hover:bg-gray-100" onClick={decrease}>
        -
      </button>
      <span className="w-12 text-center font-medium">{quantity}</span>
      <button className="px-4 py-2 hover:bg-gray-100" onClick={increase}>
        +
      </button>
    </div>
  );
}
