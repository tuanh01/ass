import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
function Header() {
    const formDataInt = {
        id: '',
        ten_san_pham: '',
        gia_san_pham: '',
        anh_san_pham: '',

    }
    const limit = 10;
    // const urlParams = "https://601229a55fffd80017089412.mockapi.io/products?limit=" +
    //   limit + "&page=" + page;
    const urlParams = new URLSearchParams(window.location.search);
    let pageInit = urlParams.get('page') != null ? parseInt(urlParams.get('page')) : 1;
    const [page, setPage] = useState(pageInit);



    const url = 'https://601229a55fffd80017089412.mockapi.io/products';

    const [listSanPham, setListSanPham] = useState([]);

    const [formData, setFormData] = useState(formDataInt)
    const [clickRow, setClickRow] = useState(-1)

    useEffect(function () {
        axios.get(`${url}?page=${page}&limit=10`)
            .then(function (response) {
                //destructuring - ES6
                const { data } = response;
                // setListSanPham
                setListSanPham(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [
        page,
    ]);

    // hàm xử lý sự kiện xóa sản phẩm
    const btnDelectonClick = function (event, value, index) {
        axios.delete(url + value.id)
            .then(function (response) {
                const list = listSanPham.filter(function (val, idx) {
                    return idx == index ? false : true;

                })
                setListSanPham(list);

            })
            .catch(function (error) {

            });

    }
    const formInputOnChange = function (event) {

        const { name, value } = event.target;
        setFormData({
            //spread Operator -es6
            ...formData, [name]: value,
        });
    }
    //hàm thêm mới sản phẩm
    const onCreate = function () {
        axios.post(url, formData)
            .then(function (response) {

                const { data } = response;
                setListSanPham([
                    ...listSanPham, data,
                ]);
                setFormData(formDataInt);//sau khi thêm mới thì xóa trắng ô text
            })
            .catch(function (error) {
                console.log('error');
                console.log(error);


            })
    }
    //xử lý sự kiện onupdate
    const onUpdate = function () {
        const urlUpdate = url + formData.id;
        axios.put(urlUpdate, formData)
            .then(function (response) {
                const { data } = response;//lấy data mới trên text để hiển lên form
                const list = listSanPham.map(function (val, idx) {
                    if (idx == clickRow) {
                        return data;
                    } else {
                        return val;
                    }
                })
                setListSanPham(list);
                setClickRow(-1);
                setFormData(formDataInt);
            })
            .catch(function (error) {

            })
    }
    //xử lý không load lại form
    const onSubmitHandler = function (event) {
        event.preventDefault();
        //thêm sản phẩm mới
        if (clickRow == -1) {
            onCreate();
        } else {
            onUpdate();
        }



    }
    //thi ý hỏi là cái thanh search kia ở chỗ nào
    //câp nhập
    const btnUpdateOnclick = function (event, value, index) {
        setFormData(value);
        setClickRow(index)//chỉ mục dòng đang được đánh dấu
    }
    //làm mới from
    const btnXoaFormOnClick = function (event) {
        event.preventDefault();
        setFormData(formDataInt);
        setClickRow(-1);
    }

    const nextPage = function () {
        setPage(page + 1);
        console.log('page:', page)
    }

    const previosPage = function () {
        if (page == 1) {
            return;
        }

        setPage(page - 1);
    }
    return (
        <div className="App ">
            {/* gồm form sản phẩm */}
            <div className='mt-5 d-flex justify-content-center'>
                <form
                    onSubmit={onSubmitHandler}

                    className='col-6'>
                    <div className='form-group row'>
                        <label className='col-2 col-form-label'>ID</label>
                        <div className='col-10'>
                            <input
                                onChange={formInputOnChange}
                                value={formData.id}
                                type='text'
                                name='id'
                                disabled
                                className='form-control' />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className='col-2 col-form-label'>Tên Sản Phẩm</label>
                        <div className='col-10'>
                            <input
                                onChange={formInputOnChange}
                                value={formData.ten_san_pham}
                                type='text'
                                name='ten_san_pham'
                                className='form-control' />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className='col-2 col-form-label'>Giá Sản Phẩm</label>
                        <div className='col-10'>
                            <input
                                onChange={formInputOnChange}
                                value={formData.gia_san_pham}
                                type='number'
                                name='gia_san_pham'
                                className='form-control' />
                        </div>
                    </div>
                    <div className='form-group row'>
                        <label className='col-2 col-form-label'>Ảnh</label>
                        <div className='col-10'>
                            <input
                                onChange={formInputOnChange}
                                value={formData.anh_san_pham}
                                type='alt'
                                name='anh_san_pham'
                                className='form-control' />
                        </div>
                    </div>
                    <div>
                        <button
                            className='btn btn-primary col-2'>Lưu</button>
                        <button
                            type='reset'
                            onClick={btnXoaFormOnClick}
                            className='btn btn-danger ml-4'>làm mới
                            </button>
                    </div>

                </form>

            </div>

            {/* với list sản phẩm */}
            <div className=" mt-5 d-flex justify-content-center">
                <table className="table table-striped col-8">
                    <thead className="table-dark">
                        <tr>
                            <td>ID</td>
                            <td>Tên Sản Phẩm</td>
                            <td>Giá Sản Phẩm</td>
                            <td>Ảnh</td>
                            <td>Thao tác</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            //code javascrip
                            listSanPham.map(function (value, index) {

                                return (
                                    <tr key={index}>
                                        <td>{value.id}</td>
                                        <td>{value.ten_san_pham}</td>
                                        <td>{value.gia_san_pham}</td>
                                        <td>{value.anh_san_pham}</td>
                                        <td>
                                            <button
                                                onClick={function (event) {
                                                    btnUpdateOnclick(event, value, index);

                                                }}
                                                className="btn btn-primary">
                                                Update
                                                </button>
                                            <button
                                                onClick={function (event) {
                                                    btnDelectonClick(event, value, index);

                                                }}
                                                className="btn btn-danger ml-4">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })

                        }
                    </tbody>

                </table>
                <ul className="pagination mt-4">
                    <li
                        onClick={previosPage}
                        className="page-item">
                        <a className="page-link">Trang trước</a>
                    </li>
                    <li className="page-item"><a className="page-link">{page}</a></li>
                    <li
                        onClick={nextPage}
                        className="page-item">
                        <a className="page-link">Trang sau</a>
                    </li>
                </ul>
            </div>


        </div>
    );
}
export default Header;