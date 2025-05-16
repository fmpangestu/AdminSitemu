"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Image as ImageIcon, FileText, Award } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulasi loading data
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  // Data dummy untuk statistik
  const stats = [
    {
      title: "Total Organisasi",
      value: "24",
      icon: <Users className="h-8 w-8" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Berita",
      value: "156",
      icon: <FileText className="h-8 w-8" />,
      color: "bg-green-500",
    },
    {
      title: "Total Prestasi",
      value: "53",
      icon: <Award className="h-8 w-8" />,
      color: "bg-orange-500",
    },
    {
      title: "Total Galeri",
      value: "342",
      icon: <ImageIcon className="h-8 w-8" />,
      color: "bg-purple-500",
    },
  ];

  // Data dummy untuk aktivitas terbaru
  const recentActivities = [
    {
      id: 1,
      type: "Berita",
      title: "Launching Program Baru Kampus",
      date: "Hari ini, 10:45",
    },
    {
      id: 2,
      type: "Galeri",
      title: "Upload 5 foto kegiatan KKNT",
      date: "Kemarin, 14:30",
    },
    {
      id: 3,
      type: "Prestasi",
      title: "Juara 1 Kompetisi Coding",
      date: "2 hari yang lalu",
    },
    {
      id: 4,
      type: "Organisasi",
      title: "Penambahan divisi baru",
      date: "3 hari yang lalu",
    },
  ];

  // Data dummy untuk quick links
  const quickLinks = [
    {
      title: "Tambah Berita",
      href: "/dashboard/berita",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Tambah Galeri",
      href: "/dashboard/galeri",
      icon: <ImageIcon className="h-5 w-5" />,
    },
    {
      title: "Tambah Organisasi",
      href: "/dashboard/organisasi",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Tambah Prestasi",
      href: "/dashboard/prestasi",
      icon: <Award className="h-5 w-5" />,
    },
  ];

  return (
    <div className="md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Selamat datang, Admin |{" "}
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>
      </div>

      {/* Statistik Overview */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-2 md:p-6">
              <div className="flex relative  items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <h3 className="text-sm md:text-3xl font-bold mt-1">
                    {stat.value}
                  </h3>
                </div>
                <div
                  className={`${stat.color}  h-10 w-10 md:h-12 md:w-12 rounded-lg flex items-center justify-center text-white`}
                >
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grafik Aktivitas */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Aktivitas Bulanan
            </CardTitle>
            <CardDescription>
              Jumlah konten yang ditambahkan per bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md border">
              {isLoading ? (
                <div className="text-sm text-gray-500">Loading chart...</div>
              ) : (
                <div className="w-full h-full p-4">
                  <div className="flex items-end justify-between h-56 w-full">
                    {/* Dummy chart bars */}
                    <div className="w-1/12 bg-blue-500 h-20 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-28 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-16 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-36 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-24 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-40 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-48 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-32 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-44 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-52 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-36 rounded-t"></div>
                    <div className="w-1/12 bg-blue-500 h-28 rounded-t"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 pt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Mei</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Ags</span>
                    <span>Sep</span>
                    <span>Okt</span>
                    <span>Nov</span>
                    <span>Des</span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Distribusi Konten */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Distribusi Konten
            </CardTitle>
            <CardDescription>Persentase jenis konten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              {isLoading ? (
                <div className="text-sm text-gray-500">Loading chart...</div>
              ) : (
                <div className="relative w-48 h-48">
                  {/* Simple pie chart representation */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#3b82f6"
                      strokeWidth="20"
                      strokeDasharray="40 60"
                      strokeDashoffset="0"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#10b981"
                      strokeWidth="20"
                      strokeDasharray="30 70"
                      strokeDashoffset="40"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#f97316"
                      strokeWidth="20"
                      strokeDasharray="20 80"
                      strokeDashoffset="70"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke="#8b5cf6"
                      strokeWidth="20"
                      strokeDasharray="10 90"
                      strokeDashoffset="90"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg font-medium">Total: 575</span>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Organisasi (25%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Berita (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Prestasi (15%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Galeri (30%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Aktivitas Terbaru */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>
              Update terbaru dari seluruh kategori
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Judul</TableHead>
                  <TableHead>Waktu</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        {activity.type}
                      </span>
                    </TableCell>
                    <TableCell>{activity.title}</TableCell>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        Lihat
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-4">
            <Button variant="outline" size="sm" className="w-full">
              Lihat Semua Aktivitas
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Links & Calendar */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Pintasan</CardTitle>
              <CardDescription>Akses cepat ke fungsi utama</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-2">
              {quickLinks.map((link, index) => (
                <Link href={link.href} key={index}>
                  <Button
                    variant="outline"
                    className="w-full h-auto py-4 flex flex-col cursor-pointer items-center justify-center gap-1"
                  >
                    <div className="text-blue-500 ">{link.icon}</div>
                    <span className="text-xs">{link.title}</span>
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Kalender</CardTitle>
              <CardDescription>Mei 2029</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center text-xs">
                <div className="font-medium text-gray-500">Min</div>
                <div className="font-medium text-gray-500">Sen</div>
                <div className="font-medium text-gray-500">Sel</div>
                <div className="font-medium text-gray-500">Rab</div>
                <div className="font-medium text-gray-500">Kam</div>
                <div className="font-medium text-gray-500">Jum</div>
                <div className="font-medium text-gray-500">Sab</div>

                <div className="text-gray-300">30</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
                <div>10</div>
                <div>11</div>
                <div>12</div>
                <div>13</div>
                <div>14</div>
                <div>15</div>
                <div>16</div>
                <div className="rounded-full bg-blue-100 text-blue-700">17</div>
                <div>18</div>
                <div>19</div>
                <div>20</div>
                <div>21</div>
                <div>22</div>
                <div>23</div>
                <div>24</div>
                <div>25</div>
                <div>26</div>
                <div>27</div>
                <div>28</div>
                <div>29</div>
                <div>30</div>
                <div>31</div>
                <div className="text-gray-300">1</div>
                <div className="text-gray-300">2</div>
                <div className="text-gray-300">3</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
