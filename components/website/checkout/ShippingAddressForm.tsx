import { UseFormReturn } from "react-hook-form";
import { CheckoutFormData } from "@/types/checkout";

type ShippingAddressFormProps = {
  methods: UseFormReturn<CheckoutFormData>;
};
export default function ShippingAddressForm({
  methods,
}: ShippingAddressFormProps) {
  const {
    register,
    formState: { errors },
  } = methods;
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-6">Shipping Address</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          <input
            {...register("fullName", {
              required: "Full name is required",
            })}
            type="text"
            placeholder="Enter full name"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input
            type="tel"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: "Enter a valid phone number",
              },
            })}
            placeholder="Enter phone number"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">Address</label>
          <textarea
            {...register("address", {
              required: "Address is required",
            })}
            rows={4}
            placeholder="Enter address"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">City</label>
          <input
            {...register("city", {
              required: "City is required",
            })}
            type="text"
            placeholder="Enter city"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">State</label>
          <input
            {...register("state", {
              required: "State is required",
            })}
            type="text"
            placeholder="Enter state"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Pincode</label>
          <input
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^[1-9][0-9]{5}$/,
                message: "Enter a valid pincode",
              },
            })}
            type="text"
            placeholder="Enter pincode"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-black"
          />
          {errors.pincode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.pincode.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
