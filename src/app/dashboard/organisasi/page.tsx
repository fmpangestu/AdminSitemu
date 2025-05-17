/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const users = [
  { id: "1", name: "Admin Utama" },
  { id: "2", name: "Manager" },
  { id: "3", name: "Staff" },
];

const organisasiDummyData = [
  {
    id: 1,
    user_id: "1",
    user_name: "Admin Utama",
    jabatan: "Ketua",
    nama: "Organisasi Mahasiswa",
    image: "/favicon.ico",
    created_at: "2023-05-15",
  },
  {
    id: 2,
    user_id: "2",
    user_name: "Manager",
    jabatan: "Sekretaris",
    nama: "Tim Pengembang",
    image: "/favicon.ico",
    created_at: "2023-05-16",
  },
  {
    id: 3,
    user_id: "3",
    user_name: "Staff",
    jabatan: "Bendahara",
    nama: "Divisi Keuangan",
    image: "/favicon.ico",
    created_at: "2023-05-17",
  },
];

export default function Organisasi() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    user_id: "",
    jabatan: "",
    nama: "",
    image: "",
  });
  const [errors, setErrors] = useState({
    user_id: "",
    jabatan: "",
    nama: "",
    image: "",
  });

  const [organisasiData, setOrganisasiData] = useState(organisasiDummyData);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { user_id: "", jabatan: "", nama: "", image: "" };

    if (!formData.user_id) {
      newErrors.user_id = "User ID harus dipilih";
      isValid = false;
    }

    if (!formData.jabatan) {
      newErrors.jabatan = "Jabatan tidak boleh kosong";
      isValid = false;
    }

    if (!formData.nama) {
      newErrors.nama = "Nama tidak boleh kosong";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Example API call:
      // await fetch('/api/organisasi', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });

      const newId =
        organisasiData.length > 0
          ? Math.max(...organisasiData.map((item) => item.id)) + 1
          : 1;
      const selectedUser = users.find((user) => user.id === formData.user_id);

      setOrganisasiData([
        ...organisasiData,
        {
          id: newId,
          user_id: formData.user_id,
          user_name: selectedUser?.name || "",
          jabatan: formData.jabatan,
          nama: formData.nama,
          image: formData.image || "/placeholder.jpg",
          created_at: new Date().toISOString().split("T")[0],
        },
      ]);

      console.log("Form submitted with data:", formData);
      toast.success("Berhasil", {
        description: "Data organisasi berhasil ditambahkan",
      });

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
      jabatan: "",
      nama: "",
      image: "",
    });
    setImagePreview(null);
    setErrors({
      user_id: "",
      jabatan: "",
      nama: "",
      image: "",
    });
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setOrganisasiData(organisasiData.filter((item) => item.id !== id));
      toast.success("Berhasil", {
        description: "Data berhasil dihapus",
      });
    }
  };

  return (
    <div className="mx-auto py-6">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Organisasi</h1>
        <Link href="/dashboard">
          <Button variant="outline">Kembali ke Dashboard</Button>
        </Link>
      </div>

      <Card className="w-full shadow-md mb-8">
        <CardHeader className="bg-gray-50">
          <CardTitle>Tambah Organisasi Baru</CardTitle>
          <CardDescription>
            Masukkan data organisasi baru di bawah ini
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
              <Label htmlFor="jabatan">
                Jabatan <span className="text-red-500">*</span>
              </Label>
              <Input
                id="jabatan"
                name="jabatan"
                placeholder="Masukkan jabatan"
                value={formData.jabatan}
                onChange={handleChange}
                className={errors.jabatan ? "border-red-500" : ""}
              />
              {errors.jabatan && (
                <p className="text-sm text-red-500">{errors.jabatan}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="nama">
                Nama <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nama"
                name="nama"
                placeholder="Masukkan nama"
                value={formData.nama}
                onChange={handleChange}
                className={errors.nama ? "border-red-500" : ""}
              />
              {errors.nama && (
                <p className="text-sm text-red-500">{errors.nama}</p>
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

      <Card className="w-full shadow-md">
        <CardHeader className="bg-gray-50">
          <CardTitle>Data Organisasi</CardTitle>
          <CardDescription>
            Daftar semua data organisasi yang tersimpan dalam sistem
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
                    Jabatan
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Nama
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Gambar
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Tanggal
                  </th>
                  <th className="py-3 px-4 text-left font-medium text-gray-500">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {organisasiData.length > 0 ? (
                  organisasiData.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">{item.user_name}</td>
                      <td className="py-3 px-4">{item.jabatan}</td>
                      <td className="py-3 px-4">{item.nama}</td>
                      <td className="py-3 px-4">
                        <div className="h-10 w-10 rounded-md overflow-hidden border">
                          <Image
                            width={40}
                            height={40}
                            src={item.image}
                            alt={item.nama}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "/placeholder.jpg";
                            }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.created_at}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 cursor-pointer text-blue-500"
                            title="Lihat"
                            onClick={() =>
                              router.push(`/dashboard/organisasi/${item.id}`)
                            }
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
                                          setOrganisasiData(
                                            organisasiData.filter(
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
                                  duration: Infinity,
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
                      Belum ada data organisasi
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t py-4 bg-gray-50">
          <div className="text-sm text-gray-500">
            Menampilkan {organisasiData.length} data
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
