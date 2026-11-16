export default function ContactPage() {
  return (
    <main className="bg-white text-black">
      {/* Contact Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <p className="text-sm font-medium uppercase tracking-wider mb-3 text-blue-100">
            Get In Touch
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>

          <p className="max-w-2xl mx-auto text-blue-50 text-sm md:text-base leading-7">
            Have a question or need help? We&apos;re here to make your shopping
            experience easy and enjoyable.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div>
            <p className="text-sm text-blue-600 font-medium mb-2">
              CONTACT INFORMATION
            </p>

            <h2 className="text-3xl font-bold mb-4">
              We&apos;d Love to Hear From You
            </h2>

            <p className="text-gray-600 leading-7 mb-8">
              Whether you have a question about our products, your order, or
              anything else, feel free to reach out to us.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  📍
                </div>

                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-sm text-gray-500 mt-1">New Delhi, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  ✉
                </div>

                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    support@nextcommerce.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  ☎
                </div>

                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-sm text-gray-500 mt-1">+91 98765 43210</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="border border-gray-200 rounded-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  placeholder="Enter subject"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>

                <textarea
                  rows={4}
                  placeholder="Write your message..."
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm outline-none resize-none focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md text-sm hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
