"use client";

import { useEffect, useState } from "react";

export interface OrderItem {
    id: number;
    menu_item: string;
    variant: string;
    item_name: string;
    variant_name: string;
    quantity: number;
    unit_price: string;
    line_total: string;
}

export interface OrderData {
    id: number;
    customer_name: string;
    customer_phone: string;
    delivery_address: string;
    special_instructions: string;
    total_price: string;
    status: string;
    payment_status: string;
    items: OrderItem[];
    created_at: string;
    updated_at: string;
}

interface OrderSuccessModalProps {
    isOpen: boolean;
    order: OrderData | null;
    onClose: () => void;
    onTrackOrder: () => void;
    onContinueBrowsing: () => void;
}

const OrderSuccessModal = ({
    isOpen,
    order,
    onClose,
    onTrackOrder,
    onContinueBrowsing,
}: OrderSuccessModalProps) => {
    const [animatedTotal, setAnimatedTotal] = useState(0);

    useEffect(() => {
        if (!isOpen || !order) {
            return;
        }

        document.body.classList.add("overflow-hidden");

        setAnimatedTotal(0);

        const targetTotal = parseFloat(order.total_price || "0");
        const duration = 850;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // easeOutQuad
            const eased = 1 - (1 - progress) * (1 - progress);

            setAnimatedTotal(targetTotal * eased);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setAnimatedTotal(targetTotal);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [isOpen, order]);

    if (!isOpen || !order) {
        return null;
    }

    const formatPrice = (value: string | number) => {
        return `₹${Number(value).toFixed(2)}`;
    };

    const formatDate = (date: string) => {
        return new Date(date).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const orderNumber = String(order.id).padStart(4, "0");

    return (
        <div className="fixed inset-0 z-[9999] overflow-y-auto bg-[#FBF6EC] text-[#1E2A22]">
            <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                <div className="absolute left-1/2 top-[28%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9A441] opacity-[0.05] blur-[120px] animate-[softPulseSlow_16s_ease-in-out_infinite]" />
            </div>

            <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-[560px] flex-col items-center px-6 pb-16 pt-[10vh] sm:pt-[12vh] lg:pt-[15vh]">

                {/* Success Checkmark */}
                <div className="mb-6 flex items-center justify-center animate-[appleRevealBadge_650ms_ease-out_forwards]">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-[#D9A441] bg-transparent animate-[emberPulse_2.2s_ease-in-out_infinite]">
                        <svg
                            className="h-7 w-7 text-[#D9A441]"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                className="animate-[drawCheck_600ms_ease-out_250ms_forwards]"
                                d="M5 13l4 4L19 7"
                                pathLength="1"
                                strokeDasharray="1"
                                strokeDashoffset="1"
                            />
                        </svg>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-center font-['Playfair_Display'] text-[34px] font-bold leading-tight tracking-tight text-[#1E2A22] opacity-0 animate-[appleRevealHeadline_650ms_ease-out_250ms_forwards] sm:text-[42px]">
                    Thank you, {order.customer_name}.
                </h1>

                <p className="mt-2.5 text-center font-sans text-[14px] font-normal leading-relaxed text-[#6E7B74] opacity-0 animate-[appleRevealSubtext_650ms_ease-out_450ms_forwards] sm:text-[15px]">
                    Your order has been received and the kitchen has been notified.
                </p>

                {/* Order Reference */}
                <div className="mt-2 text-center font-mono text-[12px] font-normal tracking-wide text-[#78867E] opacity-0 animate-[appleRevealSubtext_650ms_ease-out_550ms_forwards] sm:text-[13px]">
                    Order #{orderNumber}
                </div>

                {/* Order Summary */}
                <div className="mt-10 w-full opacity-0 animate-[ticketReveal_850ms_ease-out_600ms_forwards]">
                    <div className="mb-8 h-px w-full bg-[#E5DFD3]" />

                    <div className="w-full space-y-6">
                        {order.items.map((item, index) => (
                            <div key={item.id}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex min-w-0 flex-col">
                                        <div className="flex flex-wrap items-baseline gap-1.5">
                                            <span className="text-[14px] font-medium text-[#1E2A22] sm:text-[15px]">
                                                {item.item_name}
                                            </span>

                                            {item.variant_name && (
                                                <span className="text-[12px] font-normal text-[#78867E] sm:text-[13px]">
                                                    ({item.variant_name})
                                                </span>
                                            )}
                                        </div>

                                        <span className="mt-0.5 font-mono text-[12px] text-[#78867E] sm:text-[13px]">
                                            {item.quantity} × {formatPrice(item.unit_price)}
                                        </span>
                                    </div>

                                    <span className="shrink-0 font-mono text-[14px] font-medium text-[#1E2A22] sm:text-[15px]">
                                        {formatPrice(item.line_total)}
                                    </span>
                                </div>

                                {index < order.items.length - 1 && (
                                    <div className="mt-6 h-px w-full bg-[#E5DFD3]/60" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="my-7 h-px w-full bg-[#E5DFD3]" />

                    {/* Payment */}
                    <div className="w-full space-y-3.5 text-[14px]">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-[#D9A441]">
                                Amount Paid
                            </span>

                            <span className="font-mono font-medium text-[#D9A441]">
                                ₹{animatedTotal.toFixed(2)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[17px] font-medium text-[#1E2A22]">
                            <span>Total</span>

                            <span className="font-mono">
                                {formatPrice(order.total_price)}
                            </span>
                        </div>
                    </div>

                    <div className="my-7 h-px w-full bg-[#E5DFD3]" />

                    {/* Delivery Information */}
                    <div className="w-full space-y-3 text-[13px] text-[#6E7B74]">
                        <div className="flex items-start gap-2.5">
                            <svg
                                className="mt-0.5 h-4 w-4 shrink-0 text-[#78867E]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                />
                                <path
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                />
                            </svg>

                            <span className="leading-relaxed">
                                {order.delivery_address}
                            </span>
                        </div>

                        <div className="flex items-center gap-2.5">
                            <svg
                                className="h-4 w-4 shrink-0 text-[#78867E]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    cx="12"
                                    cy="12"
                                    r="9"
                                    strokeWidth="1.8"
                                />
                                <path
                                    d="M12 7v5l3 3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                />
                            </svg>

                            <span>
                                Estimated delivery in 30–45 mins
                            </span>
                        </div>

                        {order.special_instructions && (
                            <div className="mt-3 rounded border border-dashed border-[#C5BAA5] bg-[#ECE3D0] p-2.5">
                                <p className="font-mono text-[10px] font-bold uppercase text-[#7A8C82]">
                                    Special Request / Note:
                                </p>

                                <p className="mt-1 text-[11px] font-medium leading-snug text-[#1B2921]">
                                    {order.special_instructions}
                                </p>
                            </div>
                        )}

                        <div className="pt-1 font-mono text-[10px] text-[#A3ADA7]">
                            Placed {formatDate(order.created_at)}
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="mt-12 flex w-full flex-col items-center space-y-4 opacity-0 animate-[appleRevealActions_650ms_ease-out_900ms_forwards]">
                    <button
                        type="button"
                        onClick={onTrackOrder}
                        className="flex w-[230px] items-center justify-center gap-2 rounded-full bg-[#0F3D2E] px-6 py-3.5 font-sans text-[15px] font-medium text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98]"
                    >
                        <span>Track Your Order</span>
                    </button>

                    <button
                        type="button"
                        onClick={onContinueBrowsing}
                        className="font-sans text-[14px] text-[#6E7B74] transition-colors hover:text-[#1E2A22] hover:underline hover:underline-offset-4"
                    >
                        Continue Browsing
                    </button>
                </div>
            </main>

            <style jsx>{`
                @keyframes softPulseSlow {
                    0%,
                    100% {
                        transform: translate(-50%, -50%) scale(1);
                    }

                    50% {
                        transform: translate(-50%, -50%) scale(1.08);
                    }
                }

                @keyframes emberPulse {
                    0%,
                    100% {
                        box-shadow:
                            0 0 0 0 rgba(217, 164, 65, 0.75),
                            0 0 14px 4px rgba(217, 164, 65, 0.55);
                        transform: scale(1);
                    }

                    50% {
                        box-shadow:
                            0 0 0 9px rgba(217, 164, 65, 0),
                            0 0 24px 8px rgba(217, 164, 65, 0.85);
                        transform: scale(1.08);
                    }
                }

                @keyframes drawCheck {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes appleRevealBadge {
                    0% {
                        opacity: 0;
                        transform: translateY(15px) scale(0.85);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }

                @keyframes appleRevealHeadline {
                    0% {
                        opacity: 0;
                        transform: translateY(18px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes appleRevealSubtext {
                    0% {
                        opacity: 0;
                        transform: translateY(12px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes ticketReveal {
                    0% {
                        opacity: 0;
                        transform: translateY(22px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes appleRevealActions {
                    0% {
                        opacity: 0;
                        transform: translateY(15px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    * {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default OrderSuccessModal;