import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TaiSanModal = ({ isOpen, onClose, action, onSave, initialData }) => {
  const [taiSan, setTaiSan] = useState({
    pbql: "",
    nhomTaiSan: "",
    loaiTaiSan: "",
    phongHienTai: "",
    tenPhongHienTai: "",
    maTaiSan: "",
    tenTaiSan: "",
    maNhomThietBiDiKem: "",
    nguonGoc: "",
    tinhTrang: "",
    moTa: "",
    model: "",
    thuongHieu: "",
    namSanXuat: "",
    ngayDuaVaoSuDung: "",
    xuatXu: "",
    serialNumber: "",
    kichThuocDai: 0,
    kichThuocRong: 0,
    kichThuocCao: 0,
    giayToKemTheoTenFile: "",
    giayToKemTheoDataFile: "",
    ghiChu: "",
    maNhanSu: "",
    soKho: "",
    tenKho: "",
    donViTinh: "",
  });

  // Cập nhật dữ liệu khi chỉnh sửa
  useEffect(() => {
    if (isOpen) {
      setTaiSan(
        action === 2 && initialData 
          ? initialData 
          : { // Giá trị mặc định khi thêm mới
              pbql: "", nhomTaiSan: "", loaiTaiSan: "", phongHienTai: "",
              tenPhongHienTai: "", maTaiSan: "", tenTaiSan: "", maNhomThietBiDiKem: "",
              nguonGoc: "", tinhTrang: "", moTa: "", model: "", thuongHieu: "",
              namSanXuat: "", ngayDuaVaoSuDung: "", xuatXu: "", serialNumber: "",
              kichThuocDai: 0, kichThuocRong: 0, kichThuocCao: 0, giayToKemTheoTenFile: "",
              giayToKemTheoDataFile: "", ghiChu: "", maNhanSu: "", soKho: "",
              tenKho: "", donViTinh: "",
            }
      );
    }
  }, [isOpen]);  // ❗️ Chỉ chạy khi modal mở
  

  // Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setTaiSan((prev) => ({
      ...prev,
      [name]: type === "number" ? Math.max(0, Number(value)) : value,
    }));
  };

  // Xử lý khi nhấn "Lưu"
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(action === 2 ? "Cập nhật tài sản" : "Thêm mới tài sản", taiSan);
    await onSave(taiSan);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white w-3/5 max-h-[80vh] p-6 rounded-lg shadow-lg overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{action === 1 ? "Thêm Mới Tài Sản" : "Cập Nhật Tài Sản"}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        {Object.entries(taiSan)
          .filter(([key]) => key !== "id") // Bỏ qua trường "id"
          .map(([key, value]) => (
            <div key={key} className="mb-4">
              <label htmlFor={key} className="block capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </label>

              {key === "DT_QLTS_TS_Chon" ? (
                <div className="flex justify-center items-center w-full"> 
                  <input
                    type="checkbox"
                    id={key}
                    name={key}
                    checked={Boolean(value)}
                    onChange={(e) => setTaiSan((prev) => ({ ...prev, [key]: e.target.checked }))}
                    className="w-5 h-5"
                  />
                </div>
              ) : (
                <input
                  type={
                    key.includes("moTa") || key.includes("ghiChu") || key.includes("giayToKemTheoDataFile") ? "textarea"
                    : key.includes("kichThuoc") || key.includes("namSanXuat") || key.includes("nguonGoc") || key.includes("soKho") ? "number"
                    : key.includes("ngayDuaVaoSuDung") ? "date"
                    : "text"
                  }
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  className="border px-4 py-2 w-full"
                  required={!["maNhomThietBiDiKem", "giayToKemTheoTenFile", "model", "moTa", "giayToKemTheoDataFile", "ghiChu"].includes(key)}
                />
              )}
            </div>
        ))}

          <div className="col-span-2 flex justify-end gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {action === 1 ? "Thêm Mới" : "Cập Nhật"}
            </button>
            <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
              Đóng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

TaiSanModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  action: PropTypes.number.isRequired,
  initialData: PropTypes.object,
  onSave: PropTypes.func.isRequired,
};

export default TaiSanModal;
