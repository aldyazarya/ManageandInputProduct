import React, {Component} from 'react';
import axios from 'axios' ;
import {connect} from 'react-redux' ;


class ManageProduct extends Component {

    state = {
        products: [],
        formInputProduct: {
            nama: "",
            desc: "",
            price: "",
            src: "",
            id: 1
        },
        isUpdate: false
        
    }

    componentDidMount(){
        this.getProduct()
    }


    getProduct = () => {
        // penambahan "?_sort=id&_order=desc" untuk mengurutkan agar data yang baru kita input berada paling atas
        axios.get("http://localhost:2008/products?_sort=id&_order=desc")
        .then(response =>{
            this.setState ({products: response.data})
        })
    }

    // addProduct = (namanya, descnya, pricenya, pictnya) => {
    //     axios.post("http://localhost:2008/products", {
    //         nama: namanya, 
    //         desc: descnya,
    //         price: pricenya,
    //         src: pictnya
    //     }).then (response => {
    //         this.getProduct ()
        
    //     })
    // }

    // onAddProductClick = () => {
    //     const namanya = this.nama.value
    //     const descnya = this.desc.value
    //     const pricenya = this.price.value
    //     const pictnya = this.pict.value
    //     this.addProduct (namanya, descnya, pricenya, pictnya)
    // }

    //untuk mengambil value dari form
    handleFormChange = (event) => {
        let formInputProductNew = {...this.state.formInputProduct} ;
        //penggunaan time stamp agar idnya bisa berubah dan tidak sama
        let timestamp = new Date().getTime();
        
        // ketika fungsi ini berjalan, maka idnya juga akan terupdate
        //penggunaan kondisional if ini adalah agar idnya tidak berubah pada saat kita edit
        if (!this.state.isUpdate) {
            formInputProductNew["id"] = timestamp ;
        }
        formInputProductNew[event.target.name] = event.target.value ;
        this.setState({
            formInputProduct: formInputProductNew
        }) 
    }

    postProductToAPI = () => {
        axios.post("http://localhost:2008/products",
        this.state.formInputProduct)
        .then((res) => {
            console.log(res);       
        }, (err) => {
            console.log("error:", err);
            
        }).then (response => {
            this.getProduct()
        }).then (backtoblankform => {
            this.setState({
                formInputProduct: {
                    nama: "",
                    desc: "",
                    price: "",
                    src: "",
                    id: 1
                }
            })
        })
    }

    putProductToAPI = () => {
        axios.put (`http://localhost:2008/products/${this.state.formInputProduct.id}`, this.state.formInputProduct)
        .then (res => {
            console.log(res);  
        })
        .then (response => {
            this.getProduct()
        }).then (changebacktopost => {
            //kan pada saat selesai kita edit data, sisa tulisan yang ada diform itu masih ada
            // untuk mengembalikan fungsinya form menjadi edit lagi kita gunakan seperti di bawah
            this.setState({
                isUpdate: false,
                formInputProduct: {
                    nama: "",
                    desc: "",
                    price: "",
                    src: "",
                    id: 1
                }
            })
        })

    }

    AddButton = () => {
        if(this.state.isUpdate){
            this.putProductToAPI()
        }else {
            this.postProductToAPI();
        }
    }

    deleteProduct = (i) => {
        axios.delete (`http://localhost:2008/products/${i}`)
        .then (response => {
            this.getProduct()
        })
    }

    editProduct = (i) => {
        console.log(i);
        this.setState({
            formInputProduct: i,
            isUpdate: true
        }) 
        
    }

    

    renderList = () => {
        return this.state.products.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.nama}</td>
                    <td>{item.desc}</td>
                    <td>{item.price}</td>
                    <td><img className="list" src={item.src} alt={item.desc}></img></td>
                    <td>
                        <button onClick={() => {this.editProduct(item)}} className="btn btn-primary mr-2">Edit</button>
                        <button onClick={()=> {this.deleteProduct(item.id)}} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        })
    }

    render () {
        return (
            <div className="container">
                <h1 className="display-4 text-center">Manage Product</h1>
                <table className="table table-hover mb-5">
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                    <h1 className="display-4 text-center">input Product</h1>
                    <table className="table text-center">
                        <thead>
                            <tr>
                                <th scope="col">NAME</th>
                                <th scope="col">DESC</th>
                                <th scope="col">PRICE</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {/* penambahan value agar ketika kita klik edit maka isi dari product
                                yang akan kita edit akan muncul di formnya */}
                                <th scope="col"><input value={this.state.formInputProduct.nama} name="nama" ref={input => this.nama = input} className="form-control" type="text" onChange={this.handleFormChange}/></th>
                                <th scope="col"><input value={this.state.formInputProduct.desc} name="desc" ref={input => this.desc = input} className="form-control" type="text" onChange={this.handleFormChange}/></th>
                                <th scope="col"><input value={this.state.formInputProduct.price} name="price" ref={input => this.price = input} className="form-control" type="text" onChange={this.handleFormChange}/></th>
                                <th scope="col"><input value={this.state.formInputProduct.src} name="src" ref={input => this.pict = input} className="form-control" type="text" onChange={this.handleFormChange}/></th>
                                <th scope="col"><button onClick={this.AddButton} className="btn btn-outline-warning"  >Add/Update</button></th>
                            </tr>
                        </tbody>
                </table>
                <hr/>
                <h6 className="note">*Note: jika ingin mengedit product, maka klik terlebih dahulu button edit pada product yang ingin diedit*</h6>
                
            </div>
        )
    }
}

export default  connect()(ManageProduct) ;

//this.renderlist berarti itu function yang ada di file yg sama
//this.props.renderlist berarti itu adalah class yang dibuat di action