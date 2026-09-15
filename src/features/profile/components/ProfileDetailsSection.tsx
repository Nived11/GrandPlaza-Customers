"use client";

import React, { useEffect, useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import type { UserProfile } from "../hooks/useProfileHook";

interface ProfileDetailsSectionProps {
  profile: UserProfile | null;
  saving: boolean;
  onSave: (payload: {
    name: string;
    email: string;
    phone: string;
  }) => Promise<boolean>;
}

export default function ProfileDetailsSection({
  profile,
  saving,
  onSave,
}: ProfileDetailsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  useEffect(() => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
  }, [profile]);

  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancel = () => {
    if (profile) {
      setForm({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
      });
    }
    setIsEditing(false);
  };

  const handleSave = async () => {
    const success = await onSave(form);
    if (success) setIsEditing(false);
  };

  const fields: { key: keyof typeof form; label: string; type: string }[] = [
    { key: "name", label: "Full Name", type: "text" },
    { key: "email", label: "Email Address", type: "email" },
    { key: "phone", label: "Phone Number", type: "tel" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[var(--brand-gold)]/20 shadow-[0_15px_50px_rgba(0,0,0,0.05)] p-6 sm:p-8 lg:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-[9px] sm:text-[10px] font-black text-[var(--brand-gold)] uppercase tracking-[0.25em] block mb-1.5">
            Account Details
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-black text-[var(--brand-green-dark)]">
            Personal Information
          </h2>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 border border-[var(--brand-gold)]/40 text-[var(--brand-green-dark)] hover:bg-[var(--brand-cream-soft)] px-4 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors"
          >
            <Pencil size={13} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex items-center gap-1 border border-gray-200 text-gray-500 hover:bg-gray-50 px-3 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors disabled:opacity-50"
            >
              <X size={13} />
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-1 bg-[var(--brand-green-dark)] hover:bg-[#024532] text-white px-3 py-2 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] transition-colors disabled:opacity-60"
            >
              <Check size={13} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div
            key={field.key}
            className={field.key === "name" ? "sm:col-span-2" : ""}
          >
            <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] block mb-2">
              {field.label}
            </label>
            {isEditing ? (
              <input
                type={field.type}
                value={form[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full border border-gray-200 focus:border-[var(--brand-gold)] focus:outline-none rounded-lg px-4 py-3 text-[13px] font-medium text-slate-800 transition-colors"
              />
            ) : (
              <p className="text-[14px] font-bold text-slate-800 border border-transparent px-4 py-3 bg-[var(--brand-cream-soft)]/60 rounded-lg">
                {form[field.key] || "—"}
              </p>
            )}
          </div>
        ))}
      </div>

      {profile?.joined_at && (
        <p className="text-[10px] text-gray-400 font-medium mt-8 pt-6 border-t border-gray-100">
          Member since{" "}
          {new Date(profile.joined_at).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
          })}
        </p>
      )}
    </div>
  );
}
