import React from "react";

function TopBar() {
  return (
    <div className="hidden bg-gray-900 text-white lg:block">
      <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-sm">
        <p>🚚 Free shipping on orders above ₹999</p>
        <p>📞 +91 98765 43210</p>
      </div>
    </div>
  );
}

export default TopBar;
