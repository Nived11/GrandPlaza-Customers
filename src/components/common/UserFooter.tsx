import React from "react";

export default function UserFooter() {
  return (
    <footer className="w-full py-8 bg-gray-900 text-gray-400 text-center text-sm border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-semibold text-white">Empire Plaza Kochi</div>
        <div className="flex gap-4 text-xs">
          <a href="/about" className="hover:text-white">Privacy Policy</a>
          <a href="/contact" className="hover:text-white">Terms of Service</a>
        </div>
        <div>&copy; 2026 Empire Plaza. All rights reserved.</div>
      </div>
    </footer>
  );
}