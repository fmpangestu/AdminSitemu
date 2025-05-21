/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { Loader2, Pencil, Trash, Eye } from "lucide-react";
import Image from "next/image";

// Dummy data untuk user dropdown - nanti bisa diganti dengan data dari API
const users = [
  { id: "1", name: "Admin Utama" },
  { id: "2", name: "Manager" },
  { id: "3", name: "Staff" },
];

// Dummy data untuk tabel berita
const beritaDummyData = [
  {
    id: 1,
    user_id: "1",
    user_name: "Admin Utama",
    title_berita: "Launching Program Baru Kampus",
    tanggal: "2023-05-15",
    image: "/favicon.ico",
    deskripsi:
      "Program terbaru dari kampus yang akan diimplementasikan tahun ini.",
    created_at: "2023-05-15",
  },
  {
    id: 2,
    user_id: "2",
    user_name: "Manager",
    title_berita: "Seminar Nasional Teknologi",
    tanggal: "2023-05-20",
    image: "/favicon.ico",
    deskripsi:
      "Seminar tahunan dengan pembicara dari berbagai universitas ternama.",
    created_at: "2023-05-16",
  },
  {
    id: 3,
    user_id: "3",
    user_name: "Staff",
    title_berita: "Penerimaan Mahasiswa Baru",
    tanggal: "2023-06-01",
    image: "/favicon.ico",
    deskripsi:
      "Informasi lengkap mengenai penerimaan mahasiswa baru tahun ajaran 2023/2024.",
    created_at: "2023-05-17",
  },
];

export default function Berita() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const [formData, setFormData] = useState({
    user_id: "",
    title_berita: "",
    tanggal: "",
    image: "",
    deskripsi: "",
  });
  const [errors, setErrors] = useState({
    user_id: "",
    title_berita: "",
    tanggal: "",
    image: "",
    deskripsi: "",
  });

  // State untuk tabel
  const [beritaData, setBeritaData] = useState(beritaDummyData);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      user_id: "",
      title_berita: "",
      tanggal: "",
      image: "",
      deskripsi: "",
    };

    if (!formData.user_id) {
      newErrors.user_id = "User ID harus dipilih";
      isValid = false;
    }

    if (!formData.title_berita) {
      newErrors.title_berita = "Judul berita tidak boleh kosong";
      isValid = false;
    }

    if (!formData.tanggal) {
      newErrors.tanggal = "Tanggal tidak boleh kosong";
      isValid = false;
    }

    if (!formData.deskripsi) {
      newErrors.deskripsi = "Deskripsi tidak boleh kosong";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when field is edited
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectUser = (value: string) => {
    setFormData((prev) => ({ ...prev, user_id: value }));
    if (errors.user_id) {
      setErrors((prev) => ({ ...prev, user_id: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi ukuran file (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "Ukuran file tidak boleh lebih dari 2MB",
        }));
        return;
      }

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      setFormData((prev) => ({
        ...prev,
        image: file.name,
      }));
      setErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulasi API call dengan timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example API call:
      // await fetch('/api/berita', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulasi penambahan data baru ke tabel
      const newId =
        beritaData.length > 0
          ? Math.max(...beritaData.map((item) => item.id)) + 1
          : 1;
      const selectedUser = users.find((user) => user.id === formData.user_id);

      setBeritaData([
        ...beritaData,
        {
          id: newId,
          user_id: formData.user_id,
          user_name: selectedUser?.name || "",
          title_berita: formData.title_berita,
          tanggal: formData.tanggal,
          image: formData.image || "/placeholder.jpg",
          deskripsi: formData.deskripsi,
          created_at: new Date().toISOString().split("T")[0],
        },
      ]);

      console.log("Form submitted with data:", formData);
      toast.success("Berhasil", {
        description: "Data berita berhasil ditambahkan",
      });

      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error", {
        description: "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      user_id: "",
      title_berita: "",
      tanggal: "",
      image: "",
      deskripsi: "",
    });
    setImagePreview(null);
    setErrors({
      user_id: "",
      title_berita: "",
      tanggal: "",
      image: "",
      deskripsi: "",
    });
  };

  return (
    <div className="mx-auto py-6">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Berita</h1>
        <div className="text-sm text-gray-500">
          Selamat datang, <span className="font-medium">{username}</span> |{" "}
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Form untuk tambah data */}
      <Card className="w-full shadow-md mb-8">
        <CardHeader className="bg-gray-50">
          <CardTitle>Tambah Berita Baru</CardTitle>
          <CardDescription>
            Masukkan data berita baru di bawah ini
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4 pt-6">
            <div className="space-y-1">
              <Label htmlFor="user_id">
                User <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.user_id} onValueChange={handleSelectUser}>
                <SelectTrigger
                  id="user_id"
                  className={errors.user_id ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Pilih user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.user_id && (
                <p className="text-sm text-red-500">{errors.user_id}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="title_berita">
                Judul Berita <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title_berita"
                name="title_berita"
                placeholder="Masukkan judul berita"
                value={formData.title_berita}
                onChange={handleChange}
                className={errors.title_berita ? "border-red-500" : ""}
              />
              {errors.title_berita && (
                <p className="text-sm text-red-500">{errors.title_berita}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="tanggal">
                Tanggal <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tanggal"
                name="tanggal"
                type="date"
                value={formData.tanggal}
                onChange={handleChange}
                className={errors.tanggal ? "border-red-500" : ""}
              />
              {errors.tanggal && (
                <p className="text-sm text-red-500">{errors.tanggal}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="deskripsi">
                Deskripsi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Masukkan deskripsi berita"
                value={formData.deskripsi}
                onChange={handleChange}
                rows={4}
                className={errors.deskripsi ? "border-red-500" : ""}
              />
              {errors.deskripsi && (
                <p className="text-sm text-red-500">{errors.deskripsi}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Gambar</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={errors.image ? "border-red-500" : ""}
                />
                {imagePreview && (
                  <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Format yang diizinkan: JPG, PNG, GIF. Maks 2MB.
              </p>
              {errors.image && (
                <p className="text-sm text-red-500">{errors.image}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2 border-t pt-6 bg-gray-50">
            <Button
              type="button"
              variant="outline"
              onClick={resetForm}
              disabled={isLoading}
              className="w-1/2 md:w-44 cursor-pointer"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-1/2 md:w-44 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="mr-2 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Simpan"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Table untuk menampilkan data */}
      <Card className="w-full shadow-md">
        <CardHeader className="bg-gray-50">
          <CardTitle>Data Berita</CardTitle>
          <CardDescription>
            Daftar semua data berita yang tersimpan dalam sistem
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    No
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    User
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Judul
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Tanggal
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Gambar
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Deskripsi
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {beritaData.length > 0 ? (
                  beritaData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{item.user_name}</td>
                      <td className="py-3 px-4">{item.title_berita}</td>
                      <td className="py-3 px-4">{item.tanggal}</td>
                      <td className="py-3 px-4">
                        <div className="h-10 w-10 rounded-md overflow-hidden border">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.title_berita}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder.jpg";
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.deskripsi}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer text-blue-500"
                            title="Lihat"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer text-yellow-500"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer text-red-500 "
                            title="Hapus"
                            onClick={() => {
                              // Menggunakan toast.custom dengan konfirmasi
                              toast.custom(
                                (t) => (
                                  <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
                                    <h3 className="font-medium mb-1">
                                      Konfirmasi Hapus
                                    </h3>
                                    <p className="text-gray-500 mb-4">
                                      Apakah Anda yakin ingin menghapus data
                                      ini?
                                    </p>
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => toast.dismiss(t)}
                                      >
                                        Batal
                                      </Button>
                                      <Button
                                        variant="destructive"
                                        size="sm"
                                        className="cursor-pointer"
                                        onClick={() => {
                                          // Proses hapus data
                                          setBeritaData(
                                            beritaData.filter(
                                              (data) => data.id !== item.id
                                            )
                                          );
                                          toast.success("Berhasil", {
                                            description:
                                              "Data berhasil dihapus",
                                          });
                                          toast.dismiss(t);
                                        }}
                                      >
                                        Hapus
                                      </Button>
                                    </div>
                                  </div>
                                ),
                                {
                                  duration: Infinity, // Tidak otomatis menghilang
                                  position: "top-center",
                                }
                              );
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500">
                      Belum ada data berita
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t py-4 bg-gray-50">
          <div className="text-sm text-gray-500">
            Menampilkan {beritaData.length} data
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" disabled>
              Selanjutnya
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
