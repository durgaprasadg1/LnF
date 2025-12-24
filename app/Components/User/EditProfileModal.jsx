"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

export default function EditProfileModal({ open, setOpen, mongoUser }) {
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: mongoUser?.name || "",
    phone: mongoUser?.phone || "",
    department: mongoUser?.department || "",
    position: mongoUser?.position || "",
    bio: mongoUser?.bio || "",
  });

  async function submit() {
    if (!user) return;

    setSaving(true);

    try {
      const nameRegex = /^[A-Za-z\s]{2,100}$/;
      const phoneRegex = /^[0-9+\-\s]{7,20}$/;
      const bioRegex = /^.{0,500}$/s;

      const allowedDeps = [
        "Computer Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering",
        "Non-teaching Staff",
        "Teaching Staff",
        "Library Staff",
        "Other",
      ];

      if (!form.name || !nameRegex.test(form.name)) {
        toast.error("Enter a valid name");
        return;
      }

      if (form.phone && !phoneRegex.test(form.phone)) {
        toast.error("Enter a valid phone number");
        return;
      }

      if (form.department && !allowedDeps.includes(form.department)) {
        toast.error("Select a valid department");
        return;
      }

      if (form.bio && !bioRegex.test(form.bio)) {
        toast.error("Bio must be 500 characters or less");
        return;
      }

      const token = await user.getIdToken(true);

      const res = await fetch(`/api/user/${mongoUser._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        toast.error("Failed to update profile");
        return;
      }
      router.refresh();
      toast.success("Profile updated successfully");
      setOpen(false);
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm">Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Phone</label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Department</label>
            <Select
              value={form.department}
              onValueChange={(value) => setForm({ ...form, department: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[
                    "Computer Engineering",
                    "Electrical Engineering",
                    "Mechanical Engineering",
                    "Civil Engineering",
                    "Non-teaching Staff",
                    "Teaching Staff",
                    "Library Staff",
                    "Other",
                  ].map((dep) => (
                    <SelectItem key={dep} value={dep}>
                      {dep}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <label className="text-sm">Bio</label>
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full border rounded-md p-2"
            />
          </div>

          <button
            type="button"
            onClick={submit}
            disabled={saving}
            className="bg-stone-800 text-white w-full py-2 rounded-md
                       flex items-center justify-center gap-2
                       disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
