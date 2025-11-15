// src/pages/ProfilePage.jsx
import { useState } from 'react';
import { User, BookOpen, Users, Camera, Mail, MapPin } from 'lucide-react';

export default function ProfilePage() {
    const [profileImage, setProfileImage] = useState(null);

    // ⚠️ GANTI DATA INI DENGAN DATA ANDA!
    const profileData = {
        name: "Farrell Farros Fausto",        // ⚠️ WAJIB GANTI
        nim: "21120123120002",                   // ⚠️ WAJIB GANTI
        kelompok: "42",   // ⚠️ WAJIB GANTI
        prodi: "Teknik Komputer",
        university: "Universitas Diponegoro",
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 pb-20 md:pb-8">
            <div className="max-w-4xl mx-auto px-4 py-12">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                        Profil Mahasiswa
                    </h1>
                    <p className="text-orange-200 text-lg">
                        Workshop Tools Store - Praktikum PPB
                    </p>
                </div>

                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

                    {/* Cover Image */}
                    <div className="h-32 bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 relative">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWMGgtMnY0aC00djJoNHY0aDJWNmg0VjRoLTR6TTYgMzR2LTRINHY0SDB2Mmg0djRoMnYtNGg0di0ySDZ6TTYgNFYwSDR2NEgwdjJoNHY0aDJWNmg0VjRINnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                    </div>

                    {/* Profile Content */}
                    <div className="relative px-6 pb-8">
                        {/* Profile Photo */}
                        <div className="flex flex-col items-center -mt-16 mb-8">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-2xl">
                                    {profileImage ? (
                                        <img
                                            src={profileImage}
                                            alt="Profile"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                            <User className="w-16 h-16 text-white" />
                                        </div>
                                    )}
                                </div>

                                {/* Upload Button */}
                                <label className="absolute bottom-0 right-0 bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition-all transform hover:scale-110">
                                    <Camera className="w-5 h-5" />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                            </div>

                            <h2 className="text-3xl font-black text-slate-900 mt-4 mb-2">
                                {profileData.name}
                            </h2>
                            <p className="text-orange-600 font-bold text-lg">
                                {profileData.prodi}
                            </p>
                            <p className="text-slate-600 font-medium">
                                {profileData.university}
                            </p>
                        </div>

                        {/* Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                            {/* NIM Card */}
                            <div className="group bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 hover:border-orange-400 transition-all transform hover:scale-105 hover:shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-500 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-orange-700 mb-1">
                                            Nomor Induk Mahasiswa
                                        </p>
                                        <p className="text-2xl font-black text-slate-900">
                                            {profileData.nim}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Kelompok Card */}
                            <div className="group bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all transform hover:scale-105 hover:shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-500 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                                        <Users className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-blue-700 mb-1">
                                            Kelompok Praktikum
                                        </p>
                                        <p className="text-2xl font-black text-slate-900">
                                            Kelompok {profileData.kelompok}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}