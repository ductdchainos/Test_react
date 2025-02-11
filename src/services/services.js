const API_URL = "http://localhost:3000/DSTaiSan";

export const fetchDSTaiSan = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Lỗi khi tải danh sách tài sản");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi tải danh sách tài sản:", error);
    return [];
  }
};

export const kiemTraTrungMaTaiSan = async (maTaiSan, serialNumber) => {
  try {
    const DSTaiSan = await fetchDSTaiSan();

    const isMaTaiSanTrung = DSTaiSan.some(item => item.DT_QLTS_TS_MaTaiSan === maTaiSan);
    const isSerialNumberTrung = DSTaiSan.some(item => item.DT_QLTS_TS_SerialNumber === serialNumber);

    if (isMaTaiSanTrung) {
      return { success: false, message: "Mã tài sản này đã tồn tại!" };
    }

    if (isSerialNumberTrung) {
      return { success: false, message: "Serial Number này đã tồn tại!" };
    }

    return { success: true };
  } catch (error) {
    console.error("Lỗi khi kiểm tra mã tài sản hoặc serial number:", error);
    return { success: false, message: "Lỗi khi kiểm tra mã tài sản hoặc serial number" };
  }
};

export const addTaiSan = async (taiSanMoi) => {
  try {
    console.log("Gọi API addTaiSan với:", taiSanMoi);
    const isValid = await kiemTraTrungMaTaiSan(taiSanMoi.DT_QLTS_TS_MaTaiSan, taiSanMoi.DT_QLTS_TS_SerialNumber);
    if (!isValid.success) {
      return isValid;
    }

    const DSTaiSan = await fetchDSTaiSan();
    const lastItem = DSTaiSan[DSTaiSan.length - 1];
    const lastID = lastItem ? lastItem.id : 20459;
    const newID = (parseInt(lastID) + 1).toString();
    
    const newTaiSan = { ...taiSanMoi, id: newID, DT_QLTS_TS_Chon: false };
    
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTaiSan),
    });
    console.log("Phản hồi từ API:", response);

    if (!response.ok) {
      throw new Error("Lỗi khi thêm tài sản.");
    }
    const data = await response.json();
    console.log("Phản hồi từ API sau khi thêm:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Lỗi khi thêm tài sản:", error);
    return [];
  }
};

export const editTaiSan = async (id, taiSanCapNhat) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taiSanCapNhat),
    });

    if (!response.ok) {
      throw new Error("Lỗi khi cập nhật tài sản.");
    }

  } catch (error) {
    console.error("Lỗi khi cập nhật tài sản:", error);
    return [];
  }
};

export const deleteTaiSan = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Lỗi khi xóa tài sản.");
      }

    } catch (error) {
      console.error("Lỗi khi xóa tài sản:", error);
      return [];
    }
  }
};
