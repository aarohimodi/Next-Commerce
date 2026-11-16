export default function AboutPage() {
  return (
    <main className="bg-white text-black">
      {/* Hero */}
      {/* About Banner */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center text-white">
          <p className="text-sm font-medium uppercase tracking-wider mb-3 text-blue-100">
            About NextCommerce
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Fashion Made for You
          </h1>

          <p className="max-w-2xl mx-auto text-blue-50 text-sm md:text-base leading-7">
            Discover stylish, comfortable and affordable fashion designed to
            make every day a little more special.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-gray-100 rounded-lg py-10 flex items-center justify-center">
            {/* <span className="text-gray-400 text-sm">Fashion Image</span> */}
            <img src="images/abt.png" />
          </div>

          <div>
            <p className="text-sm text-blue-600 mb-2">OUR STORY</p>

            <h2 className="text-3xl font-bold mb-4">
              Style That Fits Your Life
            </h2>

            <p className="text-gray-600 leading-7 mb-4">
              NextCommerce was created with a simple idea — fashion should be
              stylish, comfortable and accessible to everyone.
            </p>

            <p className="text-gray-600 leading-7">
              From everyday essentials to statement pieces, we carefully bring
              together collections that help you express your personal style
              with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">Why NextCommerce?</h2>

            <p className="text-gray-500 mt-2">
              Everything you need for a better shopping experience.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white border rounded-lg p-6 text-center">
              <div className="text-2xl mb-3">✦</div>
              <h3 className="font-semibold mb-2">Quality</h3>
              <p className="text-sm text-gray-500">
                Carefully selected products made for everyday style.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-6 text-center">
              <div className="text-2xl mb-3">♡</div>
              <h3 className="font-semibold mb-2">Style</h3>
              <p className="text-sm text-gray-500">
                Modern designs for every mood and occasion.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-6 text-center">
              <div className="text-2xl mb-3">↻</div>
              <h3 className="font-semibold mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-500">
                Shop confidently with our simple return policy.
              </p>
            </div>

            <div className="bg-white border rounded-lg p-6 text-center">
              <div className="text-2xl mb-3">♡</div>
              <h3 className="font-semibold mb-2">Customer First</h3>
              <p className="text-sm text-gray-500">
                Your satisfaction is always important to us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 text-center">
        <h2 className="text-3xl font-bold mb-3">Find Your Style</h2>

        <p className="text-gray-500 mb-6">
          Explore our latest collection and discover something you love.
        </p>

        <a
          href="/shop"
          className="inline-block bg-black text-white px-7 py-3 rounded-md text-sm hover:bg-gray-800 transition"
        >
          Shop Now
        </a>
      </section>
    </main>
  );
}
