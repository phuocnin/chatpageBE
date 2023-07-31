create_open_convarsation: 

route -> controller -> service -> DB{
    Phương thức create:create dùng để tạo một hoặc nhiều document mới và lưu chúng trực tiếp vào cơ sở dữ liệu.Không cần tạo instance riêng bằng new, phương thức create tự động tạo và lưu document vào cơ sở dữ liệu.

    Phương thức new:new dùng để tạo một instance (đối tượng) của một model Mongoose, không ghi dữ liệu vào cơ sở dữ liệu.
    Đầu tiên, bạn cần định nghĩa một schema Mongoose, mô tả cấu trúc của các document trong collection.
    Sau đó, dùng new để tạo một instance mới của model đó, dựa trên schema.
    Có thể thêm, sửa, xóa các thuộc tính của instance trước khi lưu nó vào cơ sở dữ liệu.
    Dùng save() để lưu instance vào cơ sở dữ liệu.

    Phương thức populate() cho phép chúng ta lấy thông tin từ bảng liên kết dựa trên các trường tham chiếu, sau đó nạp thông tin này vào các tập dữ liệu hiện tại.
    cú pháp: 
            Model.populate(doc, options, function(error, result) {
            // Xử lý kết quả sau khi nạp thông tin thành công
            });

}