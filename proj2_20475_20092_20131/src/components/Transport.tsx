import React, { useState } from 'react';
import { MapPin, Truck, Package } from 'react-feather'; // ไอคอนสวยๆ

// สร้าง Type สำหรับ State ของที่อยู่
type AddressState = {
  fullName: string;
  phone: string;
  line1: string;
  province: string;
  district: string;
  subDistrict: string;
  postalCode: string;
};

// สร้าง Type สำหรับ State ของการจัดส่ง
type ShippingMethod = 'standard' | 'express';

const Transport: React.FC = () => {
  // State สำหรับจัดการข้อมูลในฟอร์มที่อยู่
  const [address, setAddress] = useState<AddressState>({
    fullName: '',
    phone: '',
    line1: '',
    province: '',
    district: '',
    subDistrict: '',
    postalCode: '',
  });

  // State สำหรับจัดการช่องทางการจัดส่งที่ถูกเลือก
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard');

  // ฟังก์ชันสำหรับอัปเดต State ของที่อยู่ เมื่อผู้ใช้พิมพ์
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันเมื่อกดปุ่ม "ดำเนินการต่อ"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    
    // ที่จุดนี้, คุณจะส่งข้อมูล address และ shippingMethod
    // ไปยัง state จัดการกลาง (เช่น Context, Redux) หรือ API
    console.log('Shipping Address:', address);
    console.log('Shipping Method:', shippingMethod);

    // ตัวอย่าง: แจ้งเตือน และ (ในอนาคต) ไปยังหน้าถัดไป (เช่น /checkout/review)
    alert('บันทึกที่อยู่และดำเนินการต่อ!'); 
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      {/* การ์ดหลัก */}
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 w-full max-w-2xl">
        
        {/* ส่วนหัว */}
        <div className="flex items-center mb-6 border-b pb-4">
          <Package size={28} className="text-brand-green" />
          <h1 className="text-2xl font-bold text-gray-800 ml-3">
            ที่อยู่ & การจัดส่ง (Shipping & Delivery)
          </h1>
        </div>

        {/* ฟอร์มหลัก */}
        <form onSubmit={handleSubmit}>
          
          {/* === 1. ส่วนของที่อยู่ === */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
              <MapPin size={20} className="text-gray-500 mr-2" />
              ที่อยู่สำหรับจัดส่ง
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ชื่อ-นามสกุล */}
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-600 mb-1">ชื่อ-นามสกุล (Full Name)</label>
                <input
                  type="text" name="fullName" id="fullName"
                  value={address.fullName} onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                  placeholder="สมชาย ใจดี" required
                />
              </div>

              {/* เบอร์โทรศัพท์ */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-1">เบอร์โทรศัพท์ (Phone)</label>
                <input
                  type="tel" name="phone" id="phone"
                  value={address.phone} onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                  placeholder="081-234-5678" required
                />
              </div>

              {/* รหัสไปรษณีย์ */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-600 mb-1">รหัสไปรษณีย์ (Postal Code)</label>
                <input
                  type="text" name="postalCode" id="postalCode"
                  value={address.postalCode} onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                  placeholder="10110" required
                />
              </div>

              {/* ที่อยู่ (บ้านเลขที่, ถนน) */}
              <div className="md:col-span-2">
                <label htmlFor="line1" className="block text-sm font-medium text-gray-600 mb-1">ที่อยู่ (Address)</label>
                <input
                  type="text" name="line1" id="line1"
                  value={address.line1} onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
                  placeholder="123/45 ซอยสุขุมวิท 55 (ทองหล่อ)" required
                />
              </div>
              
              {/* ตำบล/แขวง */}
              <div>
                <label htmlFor="subDistrict" className="block text-sm font-medium text-gray-600 mb-1">ตำบล/แขวง (Sub-district)</label>
                <input type="text" name="subDistrict" id="subDistrict" value={address.subDistrict} onChange={handleAddressChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" placeholder="คลองตันเหนือ" required />
              </div>

              {/* อำเภอ/เขต */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-600 mb-1">อำเภอ/เขต (District)</label>
                <input type="text" name="district" id="district" value={address.district} onChange={handleAddressChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" placeholder="วัฒนา" required />
              </div>

              {/* จังหวัด */}
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-600 mb-1">จังหวัด (Province)</label>
                <input type="text" name="province" id="province" value={address.province} onChange={handleAddressChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" placeholder="กรุงเทพมหานคร" required />
              </div>
            </div>
          </section>

          {/* === 2. ส่วนของช่องทางการจัดส่ง === */}
          <section>
            <h2 className="text-xl font-semibold text-gray-700 flex items-center mb-4">
              <Truck size={20} className="text-gray-500 mr-2" />
              ช่องทางการจัดส่ง
            </h2>
            
            <div className="space-y-4">
              {/* ตัวเลือกที่ 1: ส่งธรรมดา (Cheap) */}
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  shippingMethod === 'standard' ? 'border-brand-green ring-2 ring-green-100' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio" name="shippingMethod" value="standard"
                  checked={shippingMethod === 'standard'}
                  onChange={() => setShippingMethod('standard')}
                  className="form-radio h-5 w-5 text-brand-green focus:ring-green-400"
                />
                <div className="ml-4 flex-grow">
                  <span className="block text-md font-medium text-gray-800">Standard Delivery (ส่งธรรมดา)</span>
                  <span className="block text-sm text-gray-500">ประมาณ 3-5 วันทำการ</span>
                </div>
                <span className="text-md font-semibold text-gray-800">฿30.00</span>
              </label>
              
              {/* ตัวเลือกที่ 2: ส่งด่วน (Fast) */}
              <label
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                  shippingMethod === 'express' ? 'border-brand-green ring-2 ring-green-100' : 'border-gray-300'
                }`}
              >
                <input
                  type="radio" name="shippingMethod" value="express"
                  checked={shippingMethod === 'express'}
                  onChange={() => setShippingMethod('express')}
                  className="form-radio h-5 w-5 text-brand-green focus:ring-green-400"
                />
                <div className="ml-4 flex-grow">
                  <span className="block text-md font-medium text-gray-800">Express Delivery (ส่งด่วน)</span>
                  <span className="block text-sm text-gray-500">ประมาณ 1-2 วันทำการ</span>
                </div>
                <span className="text-md font-semibold text-gray-800">฿60.00</span>
              </label>
            </div>
          </section>

          {/* === 3. ปุ่มดำเนินการต่อ === */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full text-white font-bold py-3 px-4 rounded-lg text-lg
                         bg-gradient-to-r from-brand-green to-brand-pink 
                         hover:from-green-600 hover:to-pink-600
                         focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                         transition-all duration-300 ease-in-out shadow-md"
            >
              ดำเนินการต่อ (Continue)
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Transport;