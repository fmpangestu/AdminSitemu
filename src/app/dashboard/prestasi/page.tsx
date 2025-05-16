/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
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

// Dummy data untuk user dropdown - nanti bisa diganti dengan data dari API
const users = [
  { id: "1", name: "Admin Utama" },
  { id: "2", name: "Manager" },
  { id: "3", name: "Staff" },
];

// Dummy data untuk tabel prestasi
const prestasiDummyData = [
  {
    id: 1,
    user_id: "1",
    user_name: "Admin Utama",
    title: "Juara 1 Kompetisi Coding",
    tahun: "2023",
    prestasi: "Medali Emas",
    deskripsi:
      "Berhasil memenangkan kompetisi coding tingkat nasional dengan mengembangkan aplikasi inovatif.",
    created_at: "2023-05-15",
  },
  {
    id: 2,
    user_id: "2",
    user_name: "Manager",
    title: "Best Paper Award",
    tahun: "2022",
    prestasi: "Sertifikat & Penghargaan",
    deskripsi:
      "Mendapatkan penghargaan paper terbaik pada konferensi internasional teknologi informasi.",
    created_at: "2023-05-16",
  },
  {
    id: 3,
    user_id: "3",
    user_name: "Staff",
    title: "Hackathon Regional",
    tahun: "2021",
    prestasi: "Juara 2",
    deskripsi:
      "Tim berhasil meraih juara 2 dalam hackathon regional dengan membuat solusi teknologi untuk masalah lingkungan.",
    created_at: "2023-05-17",
  },
];

export default function Prestasi() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    title: "",
    tahun: "",
    prestasi: "",
    deskripsi: "",
  });
  const [errors, setErrors] = useState({
    user_id: "",
    title: "",
    tahun: "",
    prestasi: "",
    deskripsi: "",
  });

  // State untuk tabel
  const [prestasiData, setPrestasiData] = useState(prestasiDummyData);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      user_id: "",
      title: "",
      tahun: "",
      prestasi: "",
      deskripsi: "",
    };

    if (!formData.user_id) {
      newErrors.user_id = "User ID harus dipilih";
      isValid = false;
    }

    if (!formData.title) {
      newErrors.title = "Judul prestasi tidak boleh kosong";
      isValid = false;
    }

    if (!formData.tahun) {
      newErrors.tahun = "Tahun tidak boleh kosong";
      isValid = false;
    }

    if (!formData.prestasi) {
      newErrors.prestasi = "Prestasi tidak boleh kosong";
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
      // await fetch('/api/prestasi', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      // Simulasi penambahan data baru ke tabel
      const newId =
        prestasiData.length > 0
          ? Math.max(...prestasiData.map((item) => item.id)) + 1
          : 1;
      const selectedUser = users.find((user) => user.id === formData.user_id);

      setPrestasiData([
        ...prestasiData,
        {
          id: newId,
          user_id: formData.user_id,
          user_name: selectedUser?.name || "",
          title: formData.title,
          tahun: formData.tahun,
          prestasi: formData.prestasi,
          deskripsi: formData.deskripsi,
          created_at: new Date().toISOString().split("T")[0],
        },
      ]);

      console.log("Form submitted with data:", formData);
      toast.success("Berhasil", {
        description: "Data prestasi berhasil ditambahkan",
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
      title: "",
      tahun: "",
      prestasi: "",
      deskripsi: "",
    });
    setErrors({
      user_id: "",
      title: "",
      tahun: "",
      prestasi: "",
      deskripsi: "",
    });
  };

  return (
    <div className="mx-auto py-6">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Prestasi</h1>
        <Link href="/dashboard">
          <Button variant="outline">Kembali ke Dashboard</Button>
        </Link>
      </div>

      {/* Form untuk tambah data */}
      <Card className="w-full shadow-md mb-8">
        <CardHeader className="bg-gray-50">
          <CardTitle>Tambah Prestasi Baru</CardTitle>
          <CardDescription>
            Masukkan data prestasi baru di bawah ini
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
              <Label htmlFor="title">
                Judul Prestasi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Masukkan judul prestasi"
                value={formData.title}
                onChange={handleChange}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="tahun">
                Tahun <span className="text-red-500">*</span>
              </Label>
              <Input
                id="tahun"
                name="tahun"
                placeholder="Masukkan tahun"
                value={formData.tahun}
                onChange={handleChange}
                className={errors.tahun ? "border-red-500" : ""}
              />
              {errors.tahun && (
                <p className="text-sm text-red-500">{errors.tahun}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="prestasi">
                Prestasi <span className="text-red-500">*</span>
              </Label>
              <Input
                id="prestasi"
                name="prestasi"
                placeholder="Masukkan prestasi"
                value={formData.prestasi}
                onChange={handleChange}
                className={errors.prestasi ? "border-red-500" : ""}
              />
              {errors.prestasi && (
                <p className="text-sm text-red-500">{errors.prestasi}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                placeholder="Masukkan deskripsi prestasi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows={4}
                className={errors.deskripsi ? "border-red-500" : ""}
              />
              {errors.deskripsi && (
                <p className="text-sm text-red-500">{errors.deskripsi}</p>
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
          <CardTitle>Data Prestasi</CardTitle>
          <CardDescription>
            Daftar semua data prestasi yang tersimpan dalam sistem
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
                    Tahun
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Prestasi
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
                {prestasiData.length > 0 ? (
                  prestasiData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{item.user_name}</td>
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">{item.tahun}</td>
                      <td className="py-3 px-4">{item.prestasi}</td>
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
                                          setPrestasiData(
                                            prestasiData.filter(
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
                      Belum ada data prestasi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t py-4 bg-gray-50">
          <div className="text-sm text-gray-500">
            Menampilkan {prestasiData.length} data
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
