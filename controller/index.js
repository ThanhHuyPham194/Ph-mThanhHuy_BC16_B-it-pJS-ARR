var kiemTra = new Validation();
var mangNhanVien = [];
function renderTablesNhanVien(arrNV) {
  //input
  var stringHTML = "";
  for (var i = 0; i < arrNV.length; i++) {
    //Mỗi lần duyệt lấy ra 1 nhân viên từ trong mangNhanVien
    var nv = arrNV[i];
    var textXepLoai = "";
    if (nv.soGioLamTrongThang >= 120) {
      textXepLoai = "Nhân Viên Xuất Sắc";
    } else if (nv.soGioLamTrongThang >= 100 && nv.soGioLamTrongThang < 120) {
      textXepLoai = "Nhân Viên Giỏi";
    } else if (nv.soGioLamTrongThang >= 80 && nv.soGioLamTrongThang < 100) {
      textXepLoai = "Nhân Viên Khá";
    } else {
      textXepLoai = "Nhân Viên Trung Bình";
    }
    // Duyệt qua 1 đối tượng nhân viên thì tạo ra 1 thẻ tr tương ứng + dồn vào stringHTML
    stringHTML += `
        <tr>
            <td>${nv.maNhanVien}</td>
            <td>${nv.tenNhanVien}</td>
            <td>${nv.chucVu}</td>
            <td>${nv.luongCoBan}</td>
            <td>${nv.luongCoBan * nv.heSoChucVu}</td>
            <td>${nv.soGioLamTrongThang}</td>
            <td>${textXepLoai}</td>
            <td>
                <button class="btn btn-outline-danger" onclick="xoaNV('${
                  nv.maNhanVien
                }')">Xóa</button>
                <button class="btn btn-outline-primary" onclick="chinhSua('${
                  nv.maNhanVien
                }')">Chỉnh Sửa</button>

            </td>
        </tr>
        `;
  }
  //Dom đến thẻ tbody viết lại phần innerHTML của thẻ
  document.querySelector("tbody").innerHTML = stringHTML;
}

function getAPINhanVien() {
  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
    method: "GET",
  });

  promise.then(function (result) {
    console.log("Kết Quả", result.data);
    renderTablesNhanVien(result.data);
  });

  promise.catch(function (result) {
    console.log("Kết Quả", error);
  });
}
getAPINhanVien();

// --------------------------------POST: Thêm dữ liệu về phía server để server lưu trữ-----------------

document.querySelector("#btn-submit").onclick = function () {
  //Tạo ra format data như back end yêu cầu để chứa dữ liệu người dùng nhập vào
  var nv = new NhanVien();
  nv.maNhanVien = document.querySelector("#maNhanVien").value;
  nv.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nv.luongCoBan = document.querySelector("#luongCoBan").value;
  nv.soGioLamTrongThang = document.querySelector("#soGioLam").value;
  nv.heSoChucVu = document.querySelector("#chucVu").value;
  var slchucVu = document.querySelector("#chucVu");
  var index = slchucVu.selectedIndex;
  nv.chucVu = slchucVu.options[index].innerHTML;

  //Kiểm tra dữ liệu người dùng nhập có hợp lệ hay không
  var valid = true;
  //Check mã NV
  valid =
    valid &&
    kiemTra.kiemTraRong(
      nv.maNhanVien,
      "#error_required_maNhanVien",
      "Mã Nhân Viên Không Được Bỏ Trống"
    ) &&
    kiemTra.kiemTraDoDaiKiTu(
      nv.maNhanVien,
      "#error_required_maNhanVien",
      4,
      6
    ) &&
    kiemTra.kiemTraTrungMaNV(
      nv.maNhanVien,
      "#error_required_maNhanVien",
      mangNhanVien
    ) &&
    kiemTra.kiemTraSo(nv.maNhanVien, "#error_required_maNhanVien");
  //Check tên NV
  valid &=
    kiemTra.kiemTraRong(
      nv.tenNhanVien,
      "#error_required_tenNhanVien",
      "Tên Nhân Viên Không Được Bỏ Trống"
    ) &&
    kiemTra.kiemTraDoDaiKiTu(
      nv.tenNhanVien,
      "#error_required_tenNhanVien",
      6,
      15
    ) &&
    kiemTra.kiemTraChuoiKiTu(nv.tenNhanVien, "#error_required_tenNhanVien");
  // Check LƯƠNG
  valid &=
    kiemTra.kiemTraRong(
      nv.luongCoBan,
      "#error_required_luongCoBan",
      "Lương Không Được Bỏ Trống"
    ) &&
    kiemTra.kiemTraSo(nv.luongCoBan, "#error_required_luongCoBan") &&
    kiemTra.kiemTraLuong(nv.luongCoBan, "#error_required_luongCoBan") &&
    kiemTra.kiemTraSo(nv.luongCoBan, "#error_required_luongCoBan");
  // Check SỐ GIỜ LÀM
  valid &=
    kiemTra.kiemTraRong(
      nv.soGioLamTrongThang,
      "#error_required_soGioLam",
      "Số Giờ Làm Không Được Bỏ Trống"
    ) &&
    kiemTra.kiemTraGioLam(nv.soGioLamTrongThang, "#error_required_soGioLam") &&
    kiemTra.kiemTraSo(nv.soGioLamTrongThang, "#error_required_soGioLam");

  if (!valid) {
    return; //Dừng không chạy tiếp
  }

  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien", // back end cung cấp
    method: "POST", // back end cung cấp
    data: nv, // format đúng yêu cầu back end
  });

  promise.then(function (result) {
    console.log("result", result.data);
    document.querySelector("#maNhanVien").disabled = false;
    //gọi api getNhanVien sau khi thêm thành công
    getAPINhanVien();
    ResetForm();
   
  });

  promise.catch(function (error) {
    console.log(error);
  });
};

// --------------------------------DELETE: Xóa dữ liệu api-----------------

function xoaNV(maNV) {
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=" +
      maNV,
    method: "DELETE",
  });

  promise.then(function (result) {
    console.log(result.data);
    //Nếu xóa thành công thì gọi lại api lấy dữ liệu sinh viên từ trên server về lại
    getAPINhanVien();
  });

  promise.catch(function (error) {
    console.log(error.data);
  });
}

//----------------------CHỈNH SỬA DƯ LIỆU API--------------------------
function chinhSua(maNhanVien) {
  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=" +
      maNhanVien,
    method: "GET",
  });

  promise.then(function (result) {
    //Lấy dữ liệu load trên input
    console.log(result.data);
    var nhanVien = result.data;
    //Đưa dữ liệu lên form
    document.getElementById("maNhanVien").value = nhanVien.maNhanVien;
    document.getElementById("tenNhanVien").value = nhanVien.tenNhanVien;
    document.getElementById("luongCoBan").value = nhanVien.luongCoBan;
    document.getElementById("soGioLam").value = nhanVien.soGioLamTrongThang;
    document.getElementById("chucVu").value = nhanVien.heSoChucVu;
    var slChucVu = document.querySelector("#chucVu");
    var index = slChucVu.selectedIndex;
    slChucVu.options[index] = nhanVien.chucVu;
    document.querySelector("#maNhanVien").disabled = true;
  });

  promise.catch(function (error) {
    console.log(error);
  });
}

document.querySelector("#btnCapNhat").onclick = function () {
  //Lấy thông tin từ người dùng gán vào format data back end quy định
  var nv = new NhanVien();
  nv.maNhanVien = document.getElementById("maNhanVien").value;
  nv.tenNhanVien = document.getElementById("tenNhanVien").value;
  nv.luongCoBan = document.getElementById("luongCoBan").value;
  nv.soGioLamTrongThang = document.getElementById("soGioLam").value;
  nv.heSoChucVu = document.getElementById("chucVu").value;
  var slchucVu = document.getElementById("chucVu");
  var index = slchucVu.selectedIndex;
  nv.chucVu = slchucVu.options[index].innerHTML;

  var promise = axios({
    url:
      "http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=" +
      nv.maNhanVien, // Tham số trên url
    method: "PUT",
    data: nv, // Data đúng format backend yêu cầu
  });

  promise.then(function (result) {
    console.log("result", result.data);
    //Thành công thì sẽ tạo lại table
    getAPINhanVien();
    ResetForm();
  });

  promise.catch(function (error) {
    console.log(error);
  });
};
function ResetForm() {
  var arrInput = document.querySelectorAll("#formNhanVien input");
  for (i = 0; i < arrInput.length; i++) {
    var input = arrInput[i];
    input.value = "";
  }
}

