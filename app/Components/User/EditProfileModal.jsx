"use client";

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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";

export default function EditProfileModal({ open, setOpen, mongoUser }) {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: mongoUser.name,
    phone: mongoUser.phone || "",
    department: mongoUser.department,
    position: mongoUser.position,
    bio: mongoUser.bio || "",
  });

  async function submit() {
    if (!user) return;

    const token = await user.getIdToken(true);

    const res = await fetch(`/api/user/${mongoUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    setOpen(false);
    window.location.reload();
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
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Phone</label>
            <Input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border rounded-md p-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm">Department</label>
            <Select value={form.department} onValueChange={(value) => setForm({ ...form, department: value })}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Computer Engineering">Computer Engineering</SelectItem>
                  <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                  <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                  <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                  <SelectItem value="Non-teaching Staff">Non-teaching Staff</SelectItem>
                  <SelectItem value="Teaching Staff">Teaching Staff</SelectItem>
                  <SelectItem value="Library Staff">Library Staff</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
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
            ></textarea>
          </div>

          <button
            type="button"
            onClick={submit}
            className="bg-stone-800 text-white w-full py-2 rounded-md"
          >
            Save Changes
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
