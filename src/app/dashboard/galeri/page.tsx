/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster, toast } from "sonner";
import { Loader2, Pencil, Trash, Eye, Plus } from "lucide-react";
import Image from "next/image";

const users = [
  { id: "1", name: "Admin Utama" },
  { id: "2", name: "Manager" },
  { id: "3", name: "Staff" },
];

const typeGaleriDummyData = [
  {
    id: 1,
    user_id: "1",
    user_name: "Admin Utama",
    type: "kknt",
    created_at: "2023-05-15",
  },
  {
    id: 2,
    user_id: "2",
    user_name: "Manager",
    type: "perangkat",
    created_at: "2023-05-16",
  },
  {
    id: 3,
    user_id: "1",
    user_name: "Admin Utama",
    type: "posyandu",
    created_at: "2023-05-17",
  },
  {
    id: 4,
    user_id: "3",
    user_name: "Staff",
    type: "prestasi",
    created_at: "2023-05-18",
  },
];

const galeriDummyData = [
  {
    id: 1,
    type_galeri_id: 1,
    type: "kknt",
    image: "/favicon.ico",
    title_image: "Kegiatan KKNT di Desa",
    created_at: "2023-05-20",
  },
  {
    id: 2,
    type_galeri_id: 1,
    type: "kknt",
    image: "/favicon.ico",
    title_image: "Pembangunan Jembatan",
    created_at: "2023-05-21",
  },
  {
    id: 3,
    type_galeri_id: 2,
    type: "perangkat",
    image: "/favicon.ico",
    title_image: "Perangkat Desa",
    created_at: "2023-05-22",
  },
  {
    id: 4,
    type_galeri_id: 3,
    type: "posyandu",
    image: "/favicon.ico",
    title_image: "Kegiatan Posyandu",
    created_at: "2023-05-23",
  },
  {
    id: 5,
    type_galeri_id: 4,
    type: "prestasi",
    image: "/favicon.ico",
    title_image: "Penerimaan Penghargaan",
    created_at: "2023-05-24",
  },
];

export default function Galeri() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("gallery");
  const [isLoadingType, setIsLoadingType] = useState(false);
  const [isLoadingGaleri, setIsLoadingGaleri] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedGalleryType, setSelectedGalleryType] = useState<string>("all");

  const [typeGaleriData, setTypeGaleriData] = useState(typeGaleriDummyData);
  const [typeFormData, setTypeFormData] = useState({
    user_id: "",
    type: "",
  });
  const [typeErrors, setTypeErrors] = useState({
    user_id: "",
    type: "",
  });

  const [galeriData, setGaleriData] = useState(galeriDummyData);
  const [galeriFormData, setGaleriFormData] = useState({
    type_galeri_id: "",
    image: "",
    title_image: "",
  });
  const [galeriErrors, setGaleriErrors] = useState({
    type_galeri_id: "",
    image: "",
    title_image: "",
  });
  const [username, setUsername] = useState("Admin");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const validateTypeForm = () => {
    let isValid = true;
    const newErrors = { user_id: "", type: "" };

    if (!typeFormData.user_id) {
      newErrors.user_id = "User harus dipilih";
      isValid = false;
    }

    if (!typeFormData.type) {
      newErrors.type = "Tipe galeri tidak boleh kosong";
      isValid = false;
    }

    setTypeErrors(newErrors);
    return isValid;
  };

  const validateGaleriForm = () => {
    let isValid = true;
    const newErrors = { type_galeri_id: "", image: "", title_image: "" };

    if (!galeriFormData.type_galeri_id) {
      newErrors.type_galeri_id = "Tipe galeri harus dipilih";
      isValid = false;
    }

    if (!galeriFormData.title_image) {
      newErrors.title_image = "Judul gambar tidak boleh kosong";
      isValid = false;
    }

    setGaleriErrors(newErrors);
    return isValid;
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTypeFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (typeErrors[name as keyof typeof typeErrors]) {
      setTypeErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectUser = (value: string) => {
    setTypeFormData((prev) => ({ ...prev, user_id: value }));
    if (typeErrors.user_id) {
      setTypeErrors((prev) => ({ ...prev, user_id: "" }));
    }
  };

  const handleGaleriChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGaleriFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (galeriErrors[name as keyof typeof galeriErrors]) {
      setGaleriErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectType = (value: string) => {
    setGaleriFormData((prev) => ({ ...prev, type_galeri_id: value }));
    if (galeriErrors.type_galeri_id) {
      setGaleriErrors((prev) => ({ ...prev, type_galeri_id: "" }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setGaleriErrors((prev) => ({
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

      setGaleriFormData((prev) => ({
        ...prev,
        image: file.name,
      }));
      setGaleriErrors((prev) => ({ ...prev, image: "" }));
    }
  };

  const handleTypeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateTypeForm()) {
      return;
    }

    setIsLoadingType(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId =
        typeGaleriData.length > 0
          ? Math.max(...typeGaleriData.map((item) => item.id)) + 1
          : 1;
      const selectedUser = users.find(
        (user) => user.id === typeFormData.user_id
      );

      const newType = {
        id: newId,
        user_id: typeFormData.user_id,
        user_name: selectedUser?.name || "",
        type: typeFormData.type,
        created_at: new Date().toISOString().split("T")[0],
      };

      setTypeGaleriData([...typeGaleriData, newType]);

      toast.success("Berhasil", {
        description: "Tipe galeri berhasil ditambahkan",
      });

      resetTypeForm();
    } catch (error) {
      toast.error("Error", {
        description: "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setIsLoadingType(false);
    }
  };

  const handleGaleriSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateGaleriForm()) {
      return;
    }

    setIsLoadingGaleri(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newId =
        galeriData.length > 0
          ? Math.max(...galeriData.map((item) => item.id)) + 1
          : 1;

      const selectedType = typeGaleriData.find(
        (type) => type.id.toString() === galeriFormData.type_galeri_id
      );

      const newGaleri = {
        id: newId,
        type_galeri_id: parseInt(galeriFormData.type_galeri_id),
        type: selectedType?.type || "",
        image: galeriFormData.image || "/placeholder.jpg",
        title_image: galeriFormData.title_image,
        created_at: new Date().toISOString().split("T")[0],
      };

      setGaleriData([...galeriData, newGaleri]);

      toast.success("Berhasil", {
        description: "Data galeri berhasil ditambahkan",
      });

      // Reset form
      resetGaleriForm();
    } catch (error) {
      toast.error("Error", {
        description: "Terjadi kesalahan saat menyimpan data",
      });
    } finally {
      setIsLoadingGaleri(false);
    }
  };

  const resetTypeForm = () => {
    setTypeFormData({
      user_id: "",
      type: "",
    });
    setTypeErrors({
      user_id: "",
      type: "",
    });
  };

  const resetGaleriForm = () => {
    setGaleriFormData({
      type_galeri_id: "",
      image: "",
      title_image: "",
    });
    setImagePreview(null);
    setGaleriErrors({
      type_galeri_id: "",
      image: "",
      title_image: "",
    });
  };

  const handleDeleteType = (id: number) => {
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-medium mb-1">Konfirmasi Hapus</h3>
          <p className="text-gray-500 mb-4">
            Apakah Anda yakin ingin menghapus tipe galeri ini? Semua galeri
            dengan tipe ini juga akan terhapus.
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
                setTypeGaleriData(
                  typeGaleriData.filter((item) => item.id !== id)
                );

                setGaleriData(
                  galeriData.filter((item) => item.type_galeri_id !== id)
                );

                toast.success("Berhasil", {
                  description: "Tipe galeri berhasil dihapus",
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
  };

  const handleDeleteGaleri = (id: number) => {
    toast.custom(
      (t) => (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <h3 className="font-medium mb-1">Konfirmasi Hapus</h3>
          <p className="text-gray-500 mb-4">
            Apakah Anda yakin ingin menghapus gambar galeri ini?
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
                // Hapus data galeri
                setGaleriData(galeriData.filter((item) => item.id !== id));

                toast.success("Berhasil", {
                  description: "Data galeri berhasil dihapus",
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
  };

  const filteredGaleri =
    selectedGalleryType === "all"
      ? galeriData
      : galeriData.filter((item) => item.type === selectedGalleryType);

  return (
    <div className="mx-auto py-6">
      <Toaster position="top-center" />
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Galeri</h1>
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

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full mb-8"
      >
        <TabsList className="grid w-full grid-cols-2 ">
          <TabsTrigger value="gallery" className="cursor-pointer">
            Galeri
          </TabsTrigger>
          <TabsTrigger value="types" className="cursor-pointer">
            Tipe Galeri
          </TabsTrigger>
        </TabsList>

        {/* halaman dan form galeri */}
        <TabsContent value="gallery" className="space-y-8">
          <Card className="w-full shadow-md">
            <CardHeader className="bg-gray-50">
              <CardTitle>Tambah Galeri Baru</CardTitle>
              <CardDescription>
                Masukkan detail galeri baru di bawah ini
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleGaleriSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1">
                  <Label htmlFor="type_galeri_id">
                    Tipe Galeri <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={galeriFormData.type_galeri_id}
                    onValueChange={handleSelectType}
                  >
                    <SelectTrigger
                      id="type_galeri_id"
                      className={
                        galeriErrors.type_galeri_id ? "border-red-500" : ""
                      }
                    >
                      <SelectValue placeholder="Pilih tipe galeri" />
                    </SelectTrigger>
                    <SelectContent>
                      {typeGaleriData.map((type) => (
                        <SelectItem key={type.id} value={type.id.toString()}>
                          {type.type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {galeriErrors.type_galeri_id && (
                    <p className="text-sm text-red-500">
                      {galeriErrors.type_galeri_id}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="title_image">
                    Judul Gambar <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title_image"
                    name="title_image"
                    placeholder="Masukkan judul gambar"
                    value={galeriFormData.title_image}
                    onChange={handleGaleriChange}
                    className={galeriErrors.title_image ? "border-red-500" : ""}
                  />
                  {galeriErrors.title_image && (
                    <p className="text-sm text-red-500">
                      {galeriErrors.title_image}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">
                    Gambar <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="image"
                      name="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className={galeriErrors.image ? "border-red-500" : ""}
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
                  {galeriErrors.image && (
                    <p className="text-sm text-red-500">{galeriErrors.image}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 border-t pt-6 bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetGaleriForm}
                  disabled={isLoadingGaleri}
                  className="w-1/2 md:w-44 cursor-pointer"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isLoadingGaleri}
                  className="w-1/2 md:w-44 cursor-pointer"
                >
                  {isLoadingGaleri ? (
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

          {/* galeri halaman nich */}
          <Card className="w-full shadow-md">
            <CardHeader className="bg-gray-50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <CardTitle>Data Galeri</CardTitle>
                  <CardDescription>
                    Daftar semua galeri yang tersimpan dalam sistem
                  </CardDescription>
                </div>

                <Select
                  value={selectedGalleryType}
                  onValueChange={setSelectedGalleryType}
                >
                  <SelectTrigger className="w-[180px] cursor-pointer">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" className="cursor-pointer">
                      Semua Tipe
                    </SelectItem>
                    {typeGaleriData.map((type) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={type.id}
                        value={type.type}
                      >
                        {type.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
                        Tipe
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">
                        Judul
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
                    {filteredGaleri.length > 0 ? (
                      filteredGaleri.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">{item.title_image}</td>
                          <td className="py-3 px-4">
                            <div className="h-10 w-10 rounded-md overflow-hidden border">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.title_image}
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
                                className="h-8 w-8 cursor-pointer text-red-500"
                                title="Hapus"
                                onClick={() => handleDeleteGaleri(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500"
                        >
                          {selectedGalleryType === "all"
                            ? "Belum ada data galeri"
                            : `Belum ada data galeri untuk tipe "${selectedGalleryType}"`}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t py-4 bg-gray-50">
              <div className="text-sm text-gray-500">
                Menampilkan {filteredGaleri.length} data
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="types" className="space-y-8">
          <Card className="w-full shadow-md">
            <CardHeader className="bg-gray-50">
              <CardTitle>Tambah Tipe Galeri Baru</CardTitle>
              <CardDescription>
                Masukkan detail tipe galeri baru di bawah ini
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleTypeSubmit}>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-1">
                  <Label htmlFor="user_id">
                    User <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={typeFormData.user_id}
                    onValueChange={handleSelectUser}
                  >
                    <SelectTrigger
                      id="user_id"
                      className={typeErrors.user_id ? "border-red-500" : ""}
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
                  {typeErrors.user_id && (
                    <p className="text-sm text-red-500">{typeErrors.user_id}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="type">
                    Tipe Galeri <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="type"
                    name="type"
                    placeholder="Masukkan tipe galeri (misalnya: kknt, perangkat, dll)"
                    value={typeFormData.type}
                    onChange={handleTypeChange}
                    className={typeErrors.type ? "border-red-500" : ""}
                  />
                  {typeErrors.type && (
                    <p className="text-sm text-red-500">{typeErrors.type}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex justify-end gap-2 border-t pt-6 bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetTypeForm}
                  disabled={isLoadingType}
                  className="w-1/2 md:w-44 cursor-pointer"
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={isLoadingType}
                  className="w-1/2 md:w-44 cursor-pointer"
                >
                  {isLoadingType ? (
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
              <CardTitle>Data Tipe Galeri</CardTitle>
              <CardDescription>
                Daftar semua tipe galeri yang tersimpan dalam sistem
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
                        Tipe
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">
                        User
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">
                        Jumlah Galeri
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">
                        Tanggal Dibuat
                      </th>
                      <th className="py-3 px-4 text-left font-medium text-gray-500">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {typeGaleriData.length > 0 ? (
                      typeGaleriData.map((item, index) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="py-3 px-4">{index + 1}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3 px-4">{item.user_name}</td>
                          <td className="py-3 px-4">
                            {
                              galeriData.filter(
                                (galeri) => galeri.type_galeri_id === item.id
                              ).length
                            }
                          </td>
                          <td className="py-3 px-4">{item.created_at}</td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
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
                                className="h-8 w-8 cursor-pointer text-red-500"
                                title="Hapus"
                                onClick={() => handleDeleteType(item.id)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="py-6 text-center text-gray-500"
                        >
                          Belum ada data tipe galeri
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t py-4 bg-gray-50">
              <div className="text-sm text-gray-500">
                Menampilkan {typeGaleriData.length} data
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
