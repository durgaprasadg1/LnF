"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import imageCompression from "browser-image-compression";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UnauthorizedBox from "@/app/Components/Others/UnAuthorised";

export default function NewLostRequest() {
  const { user, mongoUser } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    itemName: "",
    description: "",
    lostAt: "",
    category: "Other",
    itemImage: null,
  });
  const [preview, setPreview] = useState(null);
  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      alert("Only PNG and JPG images are allowed");
      return;
    }
    const options = {
      maxSizeMB: 1.5,
      maxWidthOrHeight: 1200,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      setForm({ ...form, itemImage: reader.result });
    };
    reader.readAsDataURL(compressedFile);
  }

  async function submit() {
    if (!user) return;

    const nameRegex = /^[A-Za-z0-9\s\-\.,]{2,100}$/;
    const descRegex = /^.{5,500}$/s;
    const placeRegex = /^[A-Za-z0-9\s\,\-\#]{3,200}$/;
    const imgRegex = /^data:image\/(png|jpeg|jpg);base64,/;

    if (!form.itemName || !nameRegex.test(form.itemName)) {
      toast.error("Enter a valid item name (2-100 characters)");
      return;
    }
    if (!form.description || !descRegex.test(form.description)) {
      toast.error("Description must be 5-500 characters");
      return;
    }
    if (!form.lostAt || !placeRegex.test(form.lostAt)) {
      toast.error("Enter a valid 'Lost At' location");
      return;
    }
    const allowed = [
      "Electronics",
      "Books",
      "Documents",
      "Accessories",
      "Clothing",
      "Other",
    ];
    if (!allowed.includes(form.category)) {
      toast.error("Select a valid category");
      return;
    }
    if (form.itemImage && !imgRegex.test(form.itemImage)) {
      toast.error("Invalid image format");
      return;
    }

    const token = await user.getIdToken(true);
    await fetch(`/api/user/${mongoUser._id}/new-lost-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    router.refresh();
    router.push("/user/all-lost-requests");
  }
  if (!mongoUser) {
    return (
      <div className="p-6">
        <UnauthorizedBox />
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Report Lost Item</h1>

      <div className="space-y-4">
        <div>
          <label className="text-sm">Item Name</label>
          <Input
            className="w-full border p-2 rounded-md"
            value={form.itemName}
            onChange={(e) => setForm({ ...form, itemName: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">Description</label>
          <textarea
            className="w-full border p-2 rounded-md"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">Lost At</label>
          <Input
            className="w-full border p-2 rounded-md"
            value={form.lostAt}
            onChange={(e) => setForm({ ...form, lostAt: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm">Category</label>

          <Select
            value={form.category}
            onValueChange={(value) => setForm({ ...form, category: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Documents">Documents</SelectItem>
                <SelectItem value="Accessories">Accessories</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm">Item Image</label>
          <Input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImage}
          />
        </div>

        {preview && (
          <img
            src={preview}
            className="w-40 h-40 rounded-md object-cover mt-2"
          />
        )}

        <button
          onClick={submit}
          className="w-full bg-stone-800 text-white py-2 rounded-md"
        >
          Submit Lost Item
        </button>
      </div>
    </div>
  );
}
