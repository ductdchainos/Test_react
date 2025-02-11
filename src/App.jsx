import { useEffect, useState } from "react";
import TaiSanList from "./components/TaiSanList";
import TaiSanModal from "./components/TaiSanModal";
import { fetchDSTaiSan, addTaiSan, editTaiSan, deleteTaiSan } from "./services/services";

const App = () => {
  const [taiSanData, setTaiSanData] = useState([]);
  const [selectedTaiSan, setSelectedTaiSan] = useState(null);
  const [modalAction, setModalAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load dữ liệu tài sản khi ứng dụng chạy
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDSTaiSan();
        setTaiSanData(data);
        console.log("Danh sách tài sản sau khi cập nhật:", data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tài sản:", error);
      }
    };
    
    fetchData();
  }, [taiSanData.length]); // ✅ Tự động cập nhật khi danh sách thay đổi
  

  // Mở modal với hành động tương ứng
  const openModal = (action = 1, taiSan = null) => {
    setModalAction(action);
    setSelectedTaiSan(taiSan);
    setIsModalOpen(true); // ✅ Sửa lỗi
  };

  // Đóng modal
  const closeModal = () => {
    setIsModalOpen(false); // ✅ Sửa lỗi
    setSelectedTaiSan(null);
  };

  // Xử lý thêm hoặc cập nhật tài sản
  const handleSaveTaiSan = async (taiSan) => {
    console.log("Gọi hàm addTaiSan với:", taiSan); 
    try {
      if (modalAction === 1) {
        await addTaiSan(taiSan);
      } else {
        await editTaiSan(selectedTaiSan.id, taiSan);
      }
  
      // 🛠️ Khai báo `updatedData` đúng cách
      const updatedData = await fetchDSTaiSan(); // Fetch lại dữ liệu mới nhất từ API
      console.log("🚀 Dữ liệu mới sau khi thêm:", updatedData);
      setTaiSanData(updatedData);
    } catch (error) {
      console.error("Lỗi khi lưu tài sản:", error);
    } finally {
      closeModal();
    }
  };
  

  // Xử lý xóa tài sản
  const handleDeleteTaiSan = async (taiSanId) => {
    try {
      await deleteTaiSan(taiSanId); // Xóa tài sản trên server
  
      // 🛠️ Cập nhật danh sách tài sản sau khi xóa
      const updatedData = await fetchDSTaiSan(); 
      setTaiSanData(updatedData);
      
    } catch (error) {
      console.error("Lỗi khi xóa tài sản:", error);
    }
  };
  

  // Xử lý chọn tài sản
  const toggleChonTaiSan = (id) => {
    setTaiSanData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, DT_QLTS_TS_Chon: !item.DT_QLTS_TS_Chon } : item
      )
    );
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen w-screen">
      <h1 className="text-4xl font-bold mt-10 mb-10">Quản Lý Tài Sản</h1>
      <TaiSanList
        taiSanData={taiSanData || []}
        onDelete={handleDeleteTaiSan}
        onAction={openModal} // ✅ Đổi `handleAction` thành `openModal`
        toggleChonTaiSan={toggleChonTaiSan}
      />
      <TaiSanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        action={Number(modalAction) || 1}
        onSave={handleSaveTaiSan}
        initialData={selectedTaiSan}
      />
    </div>
  );
};

export default App;
