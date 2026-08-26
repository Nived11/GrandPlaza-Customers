"use client";

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// FAQ Data
const faqs = [
  {
    question: "How long will it take to get my food?",
    answer: "Our standard delivery time is 30-45 minutes depending on your location and traffic conditions. You can track your order live once it's dispatched."
  },
  {
    question: "Is cash on delivery (COD) available?",
    answer: "Yes, we accept Cash on Delivery (COD) along with all major UPI apps, credit/debit cards, and net banking."
  },
  {
    question: "Can I return the food?",
    answer: "We accept returns or provide refunds only if the food is spoiled, spilled during transit, or if the wrong item was delivered. Please contact our support within 15 minutes of delivery."
  },
  {
    question: "Can I change my delivery address after placing the order?",
    answer: "You can change your delivery address within 5 minutes of placing the order by calling our customer support. Once the food is dispatched, address changes are not possible."
  },
  {
    question: "My food is not delivered yet. What should I do?",
    answer: "Please check the live tracking status. If the delivery is delayed beyond the estimated time, you can directly contact the delivery partner or call our support hotline."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mt-16 lg:mt-24 pb-10">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* 📝 Left Side: Questions (Accordion) */}
          <div className="flex flex-col">
            
            <div className="flex items-center gap-2 mb-8">
              <span className="text-[var(--brand-gold)] text-xs">✦</span>
              <h2 className="text-xl lg:text-2xl font-black text-slate-800 uppercase tracking-widest">
                Common Questions
              </h2>
              <span className="text-[var(--brand-gold)] text-xs">✦</span>
            </div>

            <div className="flex flex-col gap-3 lg:gap-4">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                
                return (
                  <div 
                    key={index} 
                    onClick={() => toggleFaq(index)}
                    className={`border transition-all duration-300 cursor-pointer overflow-hidden
                      ${isOpen 
                        ? 'bg-white border-[var(--brand-gold)] shadow-md rounded-2xl' 
                        : 'bg-[#fdfbf7] border-[var(--brand-gold)]/20 shadow-sm rounded-xl hover:border-[var(--brand-gold)]/50'
                      }`}
                  >
                    {/* Question Header */}
                    <div className="px-5 py-4 lg:py-5 flex items-center justify-between gap-4">
                      <h4 className={`text-[11px] lg:text-[13px] font-bold transition-colors ${isOpen ? 'text-[var(--brand-green-dark)]' : 'text-slate-800'}`}>
                        {faq.question}
                      </h4>
                      <ChevronDown 
                        size={18} 
                        className={`shrink-0 transition-transform duration-300 text-[var(--brand-gold)] ${isOpen ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    
                    {/* Answer Body */}
                    <div 
                      className={`px-5 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[200px] opacity-100 pb-5' : 'max-h-0 opacity-0 pb-0'}`}
                    >
                      <p className="text-[10px] lg:text-[11px] text-gray-500 font-medium leading-relaxed border-t border-gray-100 pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            
          </div>

          {/* 📸 Right Side: Image */}
          <div className="hidden lg:flex justify-center items-center relative h-full min-h-[400px]">
            {/* Subtle background glow effect behind the image */}
            <div className="absolute w-[300px] h-[300px] bg-[var(--brand-gold)]/5 rounded-full blur-[60px] -z-10"></div>
            
            <img 
              src="/faqimg.png" 
              alt="FAQ Illustration" 
              className="w-[80%] max-w-[500px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]  transition-transform duration-700" 
            />
          </div>

        </div>
      </div>
    </div>
  );
}