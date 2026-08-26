import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { 
  RiInstagramLine, 
  RiFacebookCircleLine, 
  RiTwitterXLine, 
  RiWhatsappLine,
  RiHome5Line,
  RiRestaurantLine,
  RiUserStarLine,
  RiChatSmile3Line
} from "react-icons/ri";

export default function UserFooter() {
  return (
    <footer className="w-full bg-[var(--brand-green-dark)] empire-geometric-bg pt-16 pb-24 md:pb-8 border-t border-[var(--brand-gold)]/20 relative z-10">
      
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative">
        
        {/* 🍔 Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-5">
            
            {/* Image Logo */}
            <Link href="/" className="block mb-1">
              <div className="relative w-40 h-16">
                <Image 
                  src="/empiregoldlogo.png" 
                  alt="Empire Plaza Logo" 
                  fill 
                  className="object-contain object-left drop-shadow-md"
                />
              </div>
            </Link>
            
            {/* Highly Visible Cream Text */}
            <p className="text-[13px] text-[#F4F1EA] leading-relaxed pr-4 font-medium opacity-90 mt-2">
              Deliciously crafted meals delivered to your doorstep. Experience the best crunch in town.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-2">
              <a href="#" className="text-gray-300 hover:text-[var(--brand-gold)] hover:scale-110 transition-all">
                <RiInstagramLine size={22} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--brand-gold)] hover:scale-110 transition-all">
                <RiFacebookCircleLine size={22} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--brand-gold)] hover:scale-110 transition-all">
                <RiTwitterXLine size={22} />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--brand-gold)] hover:scale-110 transition-all">
                <RiWhatsappLine size={22} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-1 h-4 bg-[var(--brand-gold)] rounded-full"></div>
              <h3 className="text-[13px] font-black text-white uppercase tracking-widest">
                Navigation
              </h3>
            </div>
            
            <ul className="flex flex-col gap-4 text-[13px] text-[#F4F1EA] font-semibold">
              <li>
                <Link href="/" className="flex items-center gap-3 hover:text-[var(--brand-gold)] transition-colors">
                  <RiHome5Line size={18} className="text-[var(--brand-gold)] opacity-90" /> Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="flex items-center gap-3 hover:text-[var(--brand-gold)] transition-colors">
                  <RiRestaurantLine size={18} className="text-[var(--brand-gold)] opacity-90" /> Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-3 hover:text-[var(--brand-gold)] transition-colors">
                  <RiUserStarLine size={18} className="text-[var(--brand-gold)] opacity-90" /> About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-3 hover:text-[var(--brand-gold)] transition-colors">
                  <RiChatSmile3Line size={18} className="text-[var(--brand-gold)] opacity-90" /> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Working Hours & Button */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-1 h-4 bg-[var(--brand-gold)] rounded-full"></div>
              <h3 className="text-[13px] font-black text-white uppercase tracking-widest">
                Working Hours
              </h3>
            </div>
            
            <div className="flex flex-col gap-6 mb-7">
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[var(--brand-gold)] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-widest">Mon - Sat</span>
                  <span className="text-[13px] text-[#F4F1EA] font-semibold">10:00 AM - 11:30 PM</span>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-[var(--brand-gold)] mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-widest">Sunday</span>
                  <span className="text-[13px] text-[#F4F1EA] font-semibold">11:00 AM - 12:00 AM</span>
                </div>
              </div>
            </div>

            {/* 🌟 RESERVE YOUR TABLE BUTTON */}
            <Link 
              href="/bookings" 
              className="inline-flex items-center justify-center border border-[var(--brand-gold)] text-[var(--brand-gold)] hover:bg-[var(--brand-gold)] hover:text-[var(--brand-green-dark)] px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all shadow-sm w-max"
            >
              Reserve Your Table
            </Link>
          </div>

          {/* Column 4: Get in Touch */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-1 h-4 bg-[var(--brand-gold)] rounded-full"></div>
              <h3 className="text-[13px] font-black text-white uppercase tracking-widest">
                Get In Touch
              </h3>
            </div>
            
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-3">
                <div className="p-2 bg-black/20 rounded-lg shrink-0 border border-[var(--brand-gold)]/10">
                  <MapPin size={16} className="text-[var(--brand-gold)]" />
                </div>
                <div className="flex flex-col gap-1 mt-0.5">
                  <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-widest">Visit Us</span>
                  <span className="text-[12px] text-[#F4F1EA] font-medium leading-relaxed">
                    Empire Plaza, Main Road,<br/>Malappuram, Kerala, 676505
                  </span>
                </div>
              </li>
              
              <li className="flex items-center gap-3">
                <div className="p-2 bg-black/20 rounded-lg shrink-0 border border-[var(--brand-gold)]/10">
                  <Phone size={16} className="text-[var(--brand-gold)]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-widest">Call Us</span>
                  <span className="text-[13px] text-[#F4F1EA] font-semibold hover:text-[var(--brand-gold)] cursor-pointer transition-colors">+91 98765 43210</span>
                </div>
              </li>
              
              <li className="flex items-center gap-3">
                <div className="p-2 bg-black/20 rounded-lg shrink-0 border border-[var(--brand-gold)]/10">
                  <Mail size={16} className="text-[var(--brand-gold)]" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-widest">Email Us</span>
                  <span className="text-[13px] text-[#F4F1EA] font-semibold hover:text-[var(--brand-gold)] cursor-pointer transition-colors">hello@empireplaza.com</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* 📝 Bottom Bar: Copyright & Policies */}
        <div className="border-t border-[var(--brand-gold)]/20 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-[#F4F1EA] font-medium opacity-80">
          <p className="tracking-wide text-center md:text-left">
            &copy; {new Date().getFullYear()} EMPIRE PLAZA. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4 uppercase tracking-widest">
            <Link href="/terms" className="hover:text-[var(--brand-gold)] transition-colors flex items-center gap-1">
              <span className="text-[var(--brand-gold)]">&gt;</span> Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-[var(--brand-gold)] transition-colors flex items-center gap-1">
              <span className="text-[var(--brand-gold)]">&gt;</span> Privacy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}