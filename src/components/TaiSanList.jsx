import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TaiSanList = ({ taiSanData, onDelete, onAction, toggleChonTaiSan }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    console.log("📌 Danh sách tài sản cập nhật:", taiSanData);
    setCurrentPage(1);
  }, [taiSanData, itemsPerPage]);

  // Tính toán danh sách tài sản hiển thị trên trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = taiSanData?.length ? taiSanData.slice(startIndex, startIndex + itemsPerPage) : [];

  // Tổng số trang
  const totalPages = Math.ceil(taiSanData.length / itemsPerPage);
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [taiSanData, totalPages]);

  // Chuyển trang
  const goToPage = (page) => setCurrentPage(page);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset về trang đầu tiên
  };
  useEffect(() => {
    console.log("🛠 Dữ liệu trang hiện tại (currentItems):", currentItems);
  }, [currentItems]);
  console.log("Dữ liệu nhận được trong TaiSanList:", taiSanData);
  console.log("Dữ liệu hiện tại được render trên trang:", currentItems);
  return (
    <div>
      <div className="w-full flex justify-start px-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded mb-4" onClick={() => onAction(1, null)}>
          Thêm Mới Tài Sản
        </button>
      </div>
      <div className="w-full px-4">
        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
          <thead className="bg-gray-200 text-center align-middle">
            <tr>
              <th className="border px-4 py-2">STT</th>
              <th className="border px-4 py-2">Chọn</th>
              <th className="border px-4 py-2">Mã tài sản</th>
              <th className="border px-4 py-2">Tên tài sản</th>
              <th className="border px-4 py-2">Đơn vị tính</th>
              <th className="border px-4 py-2">Nhóm tài sản</th>
              <th className="border px-4 py-2">Loại tài sản</th>
              <th className="border px-4 py-2">Thương hiệu</th>
              <th className="border px-4 py-2">Ngày đưa vào sử dụng</th>
              <th className="border px-4 py-2">Mã người nhập</th>
              <th className="border px-4 py-2">Tên người nhập</th>
              <th className="border px-4 py-2">Thao tác</th>
            </tr>
          </thead>
          <tbody>
          {currentItems.length === 0 ? (
            <tr>
              <td colSpan="12" className="text-center py-4 text-red-500">Không có dữ liệu hiển thị</td>
            </tr>
          ) : (
            currentItems.map((item, i) => (
              <tr key={item.id} className="border">
                <td className="border px-4 py-2">{startIndex + i + 1}</td>
                <td className="border px-4 py-2 text-center">
                  <input type="checkbox" checked={item.DT_QLTS_TS_Chon || false} onChange={() => toggleChonTaiSan(item.id)} />
                </td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_MaTaiSan}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_TenTaiSan}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_DonViTinh}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_NhomTaiSan}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_LoaiTaiSan}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_ThuongHieu}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_NgaySuDung}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_MaNguoiNhap}</td>
                <td className="border px-4 py-2">{item.DT_QLTS_TS_TenNguoiNhap}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onClick={() => onAction(2, item)}>
                    Sửa
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => onDelete(item.id)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}

          </tbody>
        </table>
      </div>

            {/* Dropdown chọn số lượng tài sản hiển thị */}
            <div className="flex justify-end items-center w-full mt-4">
        <label className="mr-2">Số tài sản trên một trang:</label>
        <select 
          value={itemsPerPage} 
          onChange={handleItemsPerPageChange} 
          className="border px-2 py-1 pr-0 w-14 text-center"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>

      </div>




      {/* Điều hướng phân trang */}
      <div className="mt-4 flex justify-center space-x-2">
        <button disabled={currentPage === 1} onClick={() => goToPage(currentPage - 1)} className="bg-gray-300 px-3 py-1 rounded">
          « Trước
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1} 
            onClick={() => goToPage(i + 1)} 
            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          >
            {i + 1}
          </button>
        ))}


        <button disabled={currentPage === totalPages} onClick={() => goToPage(currentPage + 1)} className="bg-gray-300 px-3 py-1 rounded">
          Sau »
        </button>
      </div>
    </div>
  );
};

TaiSanList.propTypes = {
  taiSanData: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  toggleChonTaiSan: PropTypes.func.isRequired,
};


export default TaiSanList;
