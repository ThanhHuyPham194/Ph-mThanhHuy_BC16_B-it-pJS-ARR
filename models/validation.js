function Validation (){
    this.kiemTraRong = function (value, selectorError, mess){
        if(value.trim() === ''){
            document.querySelector(selectorError).innerHTML = mess;
            return false;
        }
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }
    this.kiemTraDoDaiKiTu = function(value,selectorError,min,max){
        // 4-10
        if(value.trim().length >= min && value.trim().length <= max){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = `Vui Lòng Nhập Từ ${min} Đến ${max} Ký Tự `;
        return false;
    }
    this.kiemTraChuoiKiTu = function(value,selectorError){
        var letters = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if(value.match(letters)){
            //hợp lệ
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Vui Lòng Nhập Vào Chuỗi Ký Tự';
        return false;
    }
    this.kiemTraSo = function(value, selectorError){
        var numbers = /^[0-9]+$/; 
        if (value.match(numbers)) {
            //hợp lệ
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Vui Lòng Nhập Vào Số';
        return false;

    }
    this.kiemTraGioLam = function(value,selectorError){
        // 4-10
        if(value >= 50 && value <= 150){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Vui Lòng Nhập Từ 50 Đến 150 ';
        return false;
    }
    this.kiemTraLuong = function(value,selectorError){
        // 4-10
        if(value >= 1000000 && value <= 20000000){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Vui Lòng Nhập Từ 1000000 Đến 20000000 ';
        return false;
    }

    this.kiemTraTrungMaNV = function(value, selectorError, arrNV){
        var status = true;
        for(i = 0; i < arrNV.length; i++){
            if(value === arrNV[i].maNhanVien){
                document.querySelector(selectorError).innerHTML = 'Mã Nhân Viên Đã Tồn Tại';
                status = false;
                break;
            }
        }
        if(status){
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }
        document.querySelector(selectorError).innerHTML = 'Mã Nhân Viên Đã Tồn Tại';
        return false;

        
    }

}